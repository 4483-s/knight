function knightMoves(start, end) {
  const startNode = new Squre(...start);
  const q = [];
  q.push(startNode);
  const record = [];
  let found;
  while (q.length && !found) {
    const current = q[0];
    const traversed = isVisited(current, record);
    console.log(traversed);
    if (current.x === end[0] && current.y === end[1]) {
      found = true;
      getOutputFromTarget(current);
    } else if (!traversed) {
      const adj = findAdj(current);
      q.push(...adj);
      record.push(...adj);
    }
    q.shift();
  }
}
function getOutputFromTarget(squre) {
  let temp = squre;
  const arr = [];
  while (temp) {
    arr.push([temp.x, temp.y]);
    temp = temp.parent;
  }
  console.log(`You made it in ${arr.length - 1} moves!  Here's your path:`);
  for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
  }
}
function isVisited(obj, arr) {
  for (const v of arr) {
    if (v.x === obj.x && v.y === obj.y) return true;
  }
  return false;
}
//

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
      result.push(new Squre(v[0], v[1], parent));
  });
  return result;
}
class Squre {
  constructor(x, y, parent = null) {
    this.x = x;
    this.y = y;
    this.parent = parent;
  }
}
