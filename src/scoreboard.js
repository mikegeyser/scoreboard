export const initialState = {
  gamePoints: {
    player1: 0,
    player2: 0
  }
};

export function setScore(playerNumber, previousState) {
  const player = `player${playerNumber}`;

  let gamePoints = Object.assign({}, previousState.gamePoints, {
    [player]: previousState.gamePoints[player] + 1
  });

  // Todo: This is clunky, but any attempt to shorten it made the result far 
  // less legible, obscuring meaning.
  const isDoubleDeuce = gamePoints.player1 === 4 && gamePoints.player2 === 4;

  if (isDoubleDeuce) {
    gamePoints = {
      player1: 3,
      player2: 3
    };
  }

  return {
    gamePoints
  };
}

export function getGameScore(gamePoints) {
  const { player1, player2 } = gamePoints;

  const pointsAreEqual = player1 === player2;
  const isDeuce = pointsAreEqual && player1 === 3;

  if (isDeuce) {
    return { scoreCall: "Deuce" };
  }

  if (pointsAreEqual) {
    return { scoreCall: `${getCall(player1)}-all` };
  }

  const leadingPlayer = player1 > player2 ? "player1" : "player2";

  if (gamePoints[leadingPlayer] > 3) {
    return {
      scoreCall: `Game, ${leadingPlayer}`,
      winningPlayer: leadingPlayer
    };
  }

  return {
    scoreCall: `${getCall(player1)}-${getCall(player2)}`,
    winningPlayer: null
  };
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