const ChatRoom = require("./chatroom.js");

const chat = new ChatRoom();

chat.on("join", (user) => {
  console.log(`The user #${user} has joined the chat.`);
});

chat.on("message", (user, msg) => {
  console.log(`The user #${user} sent the message ${msg}.`);
});

chat.on("leave", (user) => {
  console.log(`The user #${user} has left.`);
});

chat.join("Alice");
chat.join("Bob");

chat.sendMessage("Alice", "Hello Bob I am your friend");
chat.sendMessage("Bob", "Thats my man");

// chat.leave('Bobby')
// chat.sendMessage('Bobby', "Hii")