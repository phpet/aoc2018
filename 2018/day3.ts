import fs = require('fs');
class Entry {
  public id: number;
  public left: number;
  public top: number;
  public width: number;
  public height: number;

  constructor(line: string) {
    let [split1, split2] = line.split(": ");
    let [c1, c2] = split1.split(" @ ");
    this.id = Number(c1.substring(1, c1.length));
    
    let [leftS, rightS] = c2.split(",");
    this.left = Number(leftS);
    this.top = Number(rightS);
  
    [leftS, rightS] = split2.split("x");
    this.width = Number(leftS);
    this.height = Number(rightS);
  }
}

let matrix: Array<Array<number>> = new Array(1000);

function computeSquareInches(entry: Entry[]): number {
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(1000);
    matrix[i].fill(0);
  }

  entry.map(e => {
    for (let i = 0; i < e.height; i++) {
      for (let j = 0; j < e.width; j++) {
        matrix[e.top + i][e.left + j]++;
      }
    }
  })

  return matrix.reduce((acc, row) => row.reduce((acc2, col) => acc2 + +(col > 1), acc), 0)
}

function isOverlap(e: Entry): boolean {
  for (let i = 0; i < e.height; i++) {
    for (let j = 0; j < e.width; j++) {
      if (matrix[e.top + i][e.left + j] > 1){
        return false;
      }
    }
  }

  return true;
}

function findNonOverlapping(entry: Entry[]): number {
  return entry.find(isOverlap).id;
}

function readLines(): Entry[] {
  return fs.readFileSync('./day3.input','utf8').split(/[\r\n]+/).map((line) => new Entry(line));
}

const print = console.log.bind(console);

let input = readLines();

print("Square inches: " + computeSquareInches(input));

print("Non overlapping ID: " + findNonOverlapping(input));
