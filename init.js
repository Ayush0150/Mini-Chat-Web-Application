const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

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

const allChats = [
  { from: "shreya", to: "priya", msg: "send me your exam sheets" },
  { from: "ayush", to: "fatima", msg: "Assignment ho gaya?" },
  { from: "rohan", to: "kriti", msg: "Kal class kitne baje hai?" },
  { from: "neha", to: "arman", msg: "I will call you later" },
  { from: "aarav", to: "meera", msg: "Send me the link" },
  { from: "riya", to: "yash", msg: "Where are you now?" },
  { from: "tina", to: "dev", msg: "Lunch kab karna hai?" },
  { from: "raj", to: "sofia", msg: "See you tomorrow" },
  { from: "sid", to: "kiran", msg: "Project done?" },
  { from: "kunal", to: "aisha", msg: "Let's meet at 5pm" },
];

Chat.insertMany(allChats)
  .then(() => {
    console.log("chats inserted");
    mongoose.connection.close(); // ADD THIS
  })
  .catch((err) => console.log(err));
