import fs = require('fs');

const input: number[] = [];
let sum: number = 0;

fs.readFileSync('./day1.input').toString().split('\n').forEach(function f(line) {
  input.push(Number(line));
});

for (const freq of input) {
  sum += freq;
}

console.log('Resulting frequency = ' + sum);

sum = 0;
const frequencies: number[] = [];
frequencies.push(0); // add initial frequency

function FindRepeatingFrequency(): number {
  while (true) {
    for (const freq of input) {
      sum += freq;

      // look for sum in the list of frequencies
      for (const f of frequencies) {
        if (sum === f) {
          return sum;
        }
      }

      frequencies.push(sum);
    }
  }
}

console.log('First repeating frequency = ' + FindRepeatingFrequency());
