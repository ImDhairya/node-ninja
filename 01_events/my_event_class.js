const eventEmitter = require("events");

// class Chat extends eventEmitter {
//   sendMessage(msg) {
//     console.log(`Message Sent ${msg}`);

//     // this class is emitting the message as soon as its listening to the message.
//     this.emit("messageReceived", msg);
//     // this on is emitting the message
//     this.emit("customMessage", msg);
//   }
// }

// const chatEmitter = new Chat();

// chatEmitter.on("messageReceived", (msg) => {
//   console.log("The message is received.", msg);
// });

// chatEmitter.on("customMessage", (msg) => {
//   console.log("The custommessage is logged here", msg);
// });

// chatEmitter.sendMessage("Hello world ");

class AnotherChat extends eventEmitter {
  someRandomMethod() {
    // console.log("The call me method is invoked here ");

    this.emit("calls", "Hello calls");
  }

  someListener() {
    // a listener that listens to the emited calls emit.
    this.on("calls", () => {
      console.log("the call listener.");
    });
  }
}

const callMe = new AnotherChat();

// first made a listener here
callMe.on("calls", (data) => {
  console.log("Hey melody", data);
});


// again called some listener
callMe.someListener();
// added the emitter here.
callMe.someRandomMethod();
