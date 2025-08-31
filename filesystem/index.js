const fs = require("fs");

fs.writeFileSync(
  "./notes.txt",
  "Some node package-lock.json and data about the package values that are there."
);

fs.appendFileSync("./notes.txt", "The appended data !!!!!!!!");

const data = fs.readFileSync("./notes.txt", "utf-8");

fs.mkdirSync("./games/played/abcd", {recursive: true});

fs.rmSync("./games", {recursive: true});



console.log("changed", data);
