const EventEmitter = require("events");
// this is responsible for adding the evnets or importing the events module

const eventEmitter = new EventEmitter();

// new is used to initializes the objects from constructor ,function, or classes by automatically creating and writing the object.

// defined an event and attached the listener
// listener
eventEmitter.on("greet", (data) => {
  console.log("The is the function that runs on the listener of greet.", data);
});

eventEmitter.on("greet", (data) => {
  console.log("This is some different way of handeling the events.", data);
});


// emitter
eventEmitter.once("pushnotify", () => {
  console.log("This event will only run once.");
});

// eventEmitter.emit("greet", "Abhishek");
// eventEmitter.emit("greet", "Dhairya");

// eventEmitter.emit("pushnotify");
// eventEmitter.emit("greet", "Nandu");
// eventEmitter.emit("pushnotify");

const myListener = () => {
  console.log("I am a test listener.");
};

eventEmitter.on("test", myListener);
eventEmitter.emit("test");
console.log(eventEmitter.listeners("test"));
eventEmitter.removeListener("test", myListener);
eventEmitter.emit("test");

