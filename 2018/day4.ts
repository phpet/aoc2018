import fs = require('fs');

class Event {
  public date: Date;
  public dateAsleep: Date;
  public event: string;
  public timeAsleep: number;
  public minutesAsleep: number[];

  constructor(line: string) {
    const [dateString, eventString] = line.split('] ');
    this.date = new Date(dateString.substring(1, dateString.length));
    this.event = eventString;
    this.timeAsleep = 0;
    this.minutesAsleep = new Array(60);
    this.minutesAsleep.fill(0);
  }

  public fallAsleep(d: Date) {
    this.dateAsleep = d;
  }

  public wakeUp(d: Date) {
    this.timeAsleep += d.getMinutes() - this.dateAsleep.getMinutes();

    for (let i = this.dateAsleep.getMinutes(); i < d.getMinutes(); i++) {
      this.minutesAsleep[i]++;
    }
  }
}

function addEventToMap(e: Event) {
  if (e.event.endsWith('begins shift')) {
    // guard begins shift
    guardID = Number(e.event.match(/\d+/));
    if (! myMap.has(guardID)) {
      myMap.set(guardID, e);
    }

  } else if (e.event.endsWith('wakes up')) {
    // guard woke up
    let event: Event = myMap.get(guardID);
    event.wakeUp(e.date);

  } else if (e.event.endsWith('falls asleep')) {
    // guard fell asleep
    let event = myMap.get(guardID);
    event.fallAsleep(e.date);
  }
}

const print = console.log.bind(console);

function readLines(): Event[] {
  return fs.readFileSync('./day4.input', 'utf8').split(/[\r\n]+/).map((line) => new Event(line));
}

let input = readLines();

input.sort((a, b) => (a.date.getTime() - b.date.getTime()));

// print(input);

let guardID: number;
let myMap = new Map();

input.map((event) => addEventToMap(event));

let maxTime = 0;
let maxGuardID = 0;

// Find the guard that has the most minutes asleep
myMap.forEach(function(event: Event, guardID: number) {
  if (event.timeAsleep > maxTime) {
    maxTime = event.timeAsleep;
    maxGuardID = guardID;
  }
});

print("Guard ID: " + maxGuardID);

let guard: Event = myMap.get(maxGuardID);

let maxMinute = 0;
let actualMinute = 0;

// Find the minute that guard spent asleep the most
for (let i = 0; i < guard.minutesAsleep.length; i++) {
  if (guard.minutesAsleep[i] > maxMinute) {
    maxMinute = guard.minutesAsleep[i];
    actualMinute = i;
  }
}

print("Minute: " + actualMinute);

print("Answer: " + maxGuardID * actualMinute);

maxMinute = 0;
actualMinute = 0;
maxGuardID = 0;

// Part 2

// Find the guard which is most frequently asleep on the same minute
myMap.forEach(function(guard: Event, guardID: number) {
  for (let i = 0; i < guard.minutesAsleep.length; i++) {
    if (guard.minutesAsleep[i] > maxMinute) {
      maxMinute = guard.minutesAsleep[i];
      actualMinute = i;
      maxGuardID = guardID;
    }
  }
});

print("\nPart 2\n");
print("Guard ID: " + maxGuardID);
print("Minute: " + actualMinute);
print("Answer: " + maxGuardID * actualMinute);
