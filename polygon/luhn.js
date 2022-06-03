const process = require('process');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
/**@type {string[]} */
let inputList = [];
rl.on('line', function (line) {
  inputList = [...line.replace(/\W/g, '')];
  rl.close();
});
rl.on('close', function () {
  if (inputList.length != 16) {
    console.log('not valid');
    return;
  }
  // 1. Reverse
  inputList.reverse();
  //   2 - 4
  const sum = inputList
    .map(Number)
    .map((x, i) => {
      const position = i + 1;
      if (position % 2 == 0) {
        return x * 2;
      } else return x;
    })
    .map((x) => (x > 9 ? x - 9 : x))
    .reduce((acc, curr) => acc + curr, 0);
  // 5.
  if (sum % 10 === 0) console.log('valid');
  else console.log('not valid');
});
