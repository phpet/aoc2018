import fs = require('fs');

const input: string[] = [];

fs.readFileSync('./day2.input').toString().split('\n').forEach(function f(line) {
  input.push(line);
});

let twoTimes: number = 0;
let threeTimes: number = 0;

const myMap: Map<string, number> = new Map<string, number>();

function getChecksum(inputArray: string[]) {
  // for each string in the input
  for (const id of input) {
    myMap.clear();

    // add each character to the map as key increasing its value every time is found
    for (const myChar of id) {
      if (!myMap.has(myChar)) {
        myMap.set(myChar, 1);
      } else {
        const myValue = myMap.get(myChar);
        myMap.set(myChar, myValue + 1);
      }
    }

    let found2: boolean = false;
    let found3: boolean = false;
    const iterator1 = myMap[Symbol.iterator]();

    // look in the map for elements that have value 2 and 3
    for (const item of iterator1) {
      if ((item[1] === 2) && !found2)  {
        twoTimes++;
        found2 = true;
      }

      if ((item[1] === 3) && !found3)  {
        threeTimes++;
        found3 = true;
      }

      if (found2 && found3) {
        break;
      }
    }
  }

  return (twoTimes * threeTimes);
}

console.log('Checksum = ' + getChecksum(input));

// Part 2
let count: number;
let finalID: string;
const idSize: number = input[0].length;

function getCommonLetters(inputArray: string[]) {
  // compare each string in the input array
  for (const id1 of inputArray) {
    for (const id2 of inputArray) {
      count = 0;
      finalID = '';

      // skip identical strings
      if (id1 === id2) {
        continue;
      }

      // count the number of identical characters
      for (let i = 0; i < idSize; i++) {
        if (id1[i] === id2[i]) {
          finalID = finalID + id1[i];
          count++;
        }
      }

      // return if the difference is 1
      if (idSize - count === 1) {
        return(finalID);
      }
    }
  }
}

console.log('Common letters: ' + getCommonLetters(input));
