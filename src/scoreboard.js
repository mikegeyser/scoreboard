export const initialState = {
  gamePoints: {
    player1: 0,
    player2: 0
  }
};

const doubleDeuceState = {
  gamePoints: {
    player1: 3,
    player2: 3
  }
};

export function setScore(playerNumber, previousState) {
  const player = `player${playerNumber}`;

  const gamePoints = Object.assign({}, previousState.gamePoints, {
    [player]: previousState.gamePoints[player] + 1
  });

  const isDoubleDeuce = areTiedAt(4, gamePoints.player1, gamePoints.player2);
  if (isDoubleDeuce) {
    return doubleDeuceState;
  }

  return {
    gamePoints
  };
}

export function getGameScore(gamePoints) {
  const { player1, player2 } = gamePoints;

  const isDeuce = areTiedAt(3, player1, player2);
  if (isDeuce) {
    return { scoreCall: "Deuce" };
  }

  const areTied = player1 === player2;
  if (areTied) {
    return { scoreCall: `${getCall(player1)}-all` };
  }

  const [leadingPlayer, score, difference] = (player1 > player2)
      ? ["player1", player1, player1 - player2]
      : ["player2", player2, player2 - player1];

  if (score > 3) {
    // Potential victory.
    if (difference > 1) {
      return {
        scoreCall: `Game, ${leadingPlayer}`,
        winningPlayer: leadingPlayer
      };
    } else {
      // Tie breaker.
      return {
        scoreCall: `${getCall(score)}, ${leadingPlayer}`
      };
    }
  }
  
  return {
    scoreCall: `${getCall(player1)}-${getCall(player2)}`,
    winningPlayer: null
  };
}

function areTiedAt(point, ...players) {
  return players.every(p => p === point);
}

function getCall(points) {
  switch (points) {
    case 0:
      return "love";
    case 1:
      return "15";
    case 2:
      return "30";
    case 3:
      return "40";
    case 4:
      return "Advantage";
    default:
      throw Error("Invalid score.");
  }
}
