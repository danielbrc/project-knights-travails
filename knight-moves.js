
const visited = new Map();

class Knight {
  constructor(position = null) {
    this.position = position;
    this.moves = possibleMoves(position);
  }
}

function knightMoves(initialPos, finalPos) {
  trackVisit(initialPos);
  const queue = [initialPos];

  while (queue.length > 0) {
    const current = new Knight(queue.shift());
    const check = checkDestination(current.position, finalPos);

    for (const next of current.moves) {
      if (!hasVisited(next)) {
        trackVisit(next, current.position);
        queue.push(next);
      }
    }

    if (check) {
      return displayShortestPath(finalPos);
    }
  }
}

function knightMovesRecursive(initialPos, finalPos) {
  trackVisit(initialPos);

  const current = new Knight(initialPos);
  const check = checkDestination(current.position, finalPos);

  for(const next of current.moves) {
    if (!hasVisited(next)) {
      trackVisit(next, current.position);
    }
  }

  for(const next of current.moves) {
    knightMovesRecursive(next, finalPos);
  }

  if (check) {
    // console.log(visited);
    return displayShortestPath(finalPos);
  }
}

// register the vertice
function trackVisit([x, y], parent = null) {
  if(hasVisited([x, y])) return;
  visited.set(`${x}${y}`, parent);
}

// return vertice is registered
function hasVisited([x, y]) {
  return visited.get(`${x}${y}`) !== undefined;
}

function getVisited([x, y]) {
  return visited.get(`${x}${y}`);
}

// return all the moves from the position
function possibleMoves([x, y]) {
  const moveSet = [[1,2], [2,1], [-1,-2], [-2,-1], [1,-2], [-2,1], [2,-1], [-1,2]];

  const newMoves = moveSet.map(item => {
    const newX = x+item[0];
    const newY = y+item[1];
    const newPos = [newX, newY];

    if(newX <= 7 && newX >= 0 && newY <= 7 && newY >= 0 && !hasVisited(newPos)) {
      return newPos;
    }
  })

  return newMoves.filter(item => item);
}

// check if it got the final destination
function checkDestination([newX, newY], [endX, endY]) {
  return (newX == endX && newY == endY);
}

function displayShortestPath(finalPos) {
  let final = finalPos;
  const result = [];

  while (final !== null) {
    const previous = getVisited(final);
    result.unshift(final);
    final = previous;
  }

  console.log(`You made it in ${result.length -1} moves! Here's your path:`);
  result.forEach(elem => {
    console.log(elem);
  });
}

export { knightMoves, knightMovesRecursive };