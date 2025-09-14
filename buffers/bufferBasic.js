const {Buffer} = require("buffer");

const buff = Buffer.alloc(4);

console.log(buff.toString(), "FEFE", buff.at(2));

const chaiBuff = Buffer.from("Hello Dhairya!!");
// console.log(chaiBuff, "chaibuf", chaiBuff.toString());

const buffTwo = Buffer.allocUnsafe(10);
// console.log(buffTwo, 'second buffer');

const bufThree = Buffer.alloc(10);
bufThree.write("Hello");
console.log(bufThree.toString());

const bufFour = Buffer.from("Las vagas");
// console.log(bufFour.toString("utf-8", 0, 2));

const buffFive = Buffer.from("Chai");
buffFive[0] = 0x4A
// console.log(buffFive)
