const fs = require("fs");
console.log("Start of the script");

//[Sync] Blocking operation syncronousely read file and block the further execution of the code until this task is not completed.
const content = fs.readFileSync("notes.txt", "utf-8");

console.log("Contents of the data", content);

//[Async] Non-blocking code this will not block the code in the execution it will work in the background and without making the other code wait.

// non blocking will lead to Asyncronous data
fs.readFile("notes.txt", "utf-8", function (error, data) {
  if (error) console.log(error);

  console.log("Content got", data);
});

console.log("End of the scripts.");
