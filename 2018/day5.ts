import fs = require("fs");

function readInput(): string[] {
  return fs.readFileSync("./2018/input/day5.input", "utf8").split("");
}

function reactPolymer(poly: string[]) {
  let i = 0;
  while (i < poly.length - 1) {
    i++;

    const current = poly[i];
    const prev = poly[i - 1];

    if ((current !== prev) && (current.toLowerCase() === prev.toLowerCase())) {
      poly.splice(i - 1, 2);

      if (i > 2) {
        i = i - 2;
      } else {
        i = 0;
      }
    }
  }

  return poly.length;
}

function filterPoly(s: string) {
  const result = input.filter((c) => (c !== s) && (c !== s.toUpperCase()));
  sizes.push(reactPolymer(result));
}

// Part 1
console.time("part1 took");

const print = console.log.bind(console);

let input: string[] = readInput();

print("Reacted polymer size: " + reactPolymer(input));

console.timeEnd("part1 took");

// Part 2
console.time("part2 took");

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const sizes: number[] = [];

alphabet.forEach((s) => filterPoly(s));

let min = 50000;

// Find the minimum polymer size
for (const i of sizes) {
  if (i < min) {
    min = i;
  }
}

print("Minimum size: " + min);

console.timeEnd("part2 took");
