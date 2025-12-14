const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

main()
  .then(() => {
    console.log("connection is successfull");
  })
  .catch((err) => {
    console.log(err);
  });

// let chat1 = new Chat({
//   from: "shreya",
//   to: "priya",
//   msg: "send me your exam sheets",
//   created_at: new Date(),
// });

// chat1
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//wrapAsync function
function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

// Index Route
app.get(
  "/chats",
  wrapAsync(async (req, res) => {
    let chats = await Chat.find({});
    res.render("index.ejs", { chats });
  })
);

//New Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//Create Route
app.post(
  "/chats",
  wrapAsync(async (req, res, next) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
      from: from,
      to: to,
      msg: msg,
    });
    await newChat.save();
    res.redirect("/chats");
  })
);

//NEW - Show Route
app.get(
  "/chats/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
      next(new ExpressError(404, "Chat not found."));
    }
    res.render("edit.ejs", { chat });
  })
);

//Edit Route
app.get(
  "/chats/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
  })
);

//Update Route
app.put(
  "/chats/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
      id,
      { msg: newMsg },
      { runValidators: true, new: true }
    );
    console.log(updatedChat);
    res.redirect("/chats");
  })
);

//Destroy Route
app.delete(
  "/chats/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
  })
);

app.get("/", (req, res) => {
  res.send("root is working");
});

const handleValidationErr = (err) => {
  console.log("This was a Validation error. Please follow rules");
  console.dir(err.message);
  return err;
};

app.use((err, req, res, next) => {
  console.log(err.name);
  if ((err.name = "ValidationError")) {
    err = handleValidationErr(err);
  }
  next(err);
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occurred" } = err;
  res.status(status).send(message);
});

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
