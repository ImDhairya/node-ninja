const EventEmitter = require("events");

class ChatRoom extends EventEmitter {
  constructor() {
    super();
    this.users = new Set();
  }

  join(user) {
    this.users.add(user);
    this.emit("join", user);
  }

  sendMessage(user, msg) {
    if (this.users.has(user)) {
      this.emit("message", user, msg);
    } else {
      throw new Error(`The user ${user} is not present `, user);
    }
  }

  leave(user) {
    if (this.users.has(user)) {
      this.users.delete(user);
      this.emit("leave", user);
    } else {
      throw new Error(`The user ${user} is not present `, user);
    }
  }
}

module.exports = ChatRoom;
