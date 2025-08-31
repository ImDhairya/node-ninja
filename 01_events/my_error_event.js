const EventEmiter = require("events");

const eventEmitter = new EventEmiter();

eventEmitter.on("error", (err) => {
  console.log(`Error occured ${err.message}`);
});

eventEmitter.emit("error", new Error("Something went wrong."));
