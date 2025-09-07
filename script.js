function knightMoves(start, end) {
  if (!inputIsValid(start, end)) throw new Error("Invalid input, exiting...");
  if (start[0] === end[0] && start[1] === end[1]) {
    console.log("No movement");
    return;
  }
  const q = [new Square(...start)];
  const record = {};
  let found;
  let count = 0;
  while (!found) {
    const current = q[count];
    const recKey = `${current.x}${current.y}`;
    if (current.x === end[0] && current.y === end[1]) {
      found = true;
      return getOutputFromTarget(current);
    } else if (!record[recKey]) {
      q.push(...findAdj(current));
      record[recKey] = true;
    }
    count++;
  }
}
function inputIsValid(start, end) {
  return [...start, ...end].every((v) => v >= 0 && v < 8);
}
function getOutputFromTarget(square) {
  let temp = square;
  const arr = [];
  while (temp) {
    arr.unshift([temp.x, temp.y]);
    temp = temp.parent;
  }
  console.log(`You made it in ${arr.length - 1} moves!  Here's your path:`);
  for (let i = 0; i < arr.length; i++) console.log(arr[i]);
  return arr;
}
function findAdj(parent) {
  const { x, y } = parent;
  const temp = [];
  temp.push([x - 1, y + 2]);
  temp.push([x + 1, y - 2]);
  temp.push([x - 2, y + 1]);
  temp.push([x + 2, y - 1]);

  temp.push([x - 2, y - 1]);
  temp.push([x + 2, y + 1]);
  temp.push([x + 1, y + 2]);
  temp.push([x - 1, y - 2]);
  let result = [];
  temp.forEach((v) => {
    if (v[0] >= 0 && v[1] >= 0 && v[0] < 8 && v[1] < 8)
      result.push(new Square(v[0], v[1], parent));
  });
  return result;
}
class Square {
  constructor(x, y, parent = null) {
    this.x = x;
    this.y = y;
    this.parent = parent;
  }
}
