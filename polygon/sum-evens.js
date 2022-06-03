const process = require('process');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
const inputList = [];
rl.on('line', function (line) {
  inputList.push(parseInt(line));
  if (inputList.length === inputList[0] + 1) {
    rl.close();
  }
});
rl.on('close', function () {
  const numList = inputList.slice(1);
  const sum = numList.reduce((acc, curr) => (curr % 2 === 0 ? acc + curr : acc), 0);
  console.log(sum);
});
