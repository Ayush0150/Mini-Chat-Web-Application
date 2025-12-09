const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
  .then(() => {
    console.log("connection is successfull");
  })
  .catch((err) => {
    console.log(err);
  });

let allChats = [
  {
    from: "shreya",
    to: "priya",
    msg: "send me your exam sheets",
    created_at: new Date(),
  },
  {
    from: "ayush",
    to: "fatima",
    msg: "Assignment ho gaya?",
    created_at: new Date(),
  },
  {
    from: "rohan",
    to: "kriti",
    msg: "Kal class kitne baje hai?",
    created_at: new Date(),
  },
  {
    from: "neha",
    to: "arman",
    msg: "I will call you later",
    created_at: new Date(),
  },
  {
    from: "aarav",
    to: "meera",
    msg: "Send me the link",
    created_at: new Date(),
  },
  {
    from: "riya",
    to: "yash",
    msg: "Where are you now?",
    created_at: new Date(),
  },
  {
    from: "tina",
    to: "dev",
    msg: "Lunch kab karna hai?",
    created_at: new Date(),
  },
  {
    from: "raj",
    to: "sofia",
    msg: "See you tomorrow",
    created_at: new Date(),
  },
  {
    from: "sid",
    to: "kiran",
    msg: "Project done?",
    created_at: new Date(),
  },
  {
    from: "kunal",
    to: "aisha",
    msg: "Let’s meet at 5pm",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
