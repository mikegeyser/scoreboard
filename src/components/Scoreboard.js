import React, { Component } from "react";
import { initialState, getGameScore, setScore } from "../scoreboard";

class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    // If we need to implement 'match tracking' then getGameScore will likely need to
    // move to handlePlayerScore, so that we can change the match state when the game 
    // is won.
    const { scoreCall } = getGameScore(this.state.gamePoints);

    return (
      <div>
        <h1>Tennis Scoreboard</h1>
        <h2 id="score">Score: {scoreCall}</h2>
        <button
          className="player1-scores"
          type="button"
          onClick={() => this.handlePlayerScore(1)}
        >
          Player 1 scores
        </button>
        <button
          className="player2-scores"
          type="button"
          onClick={() => this.handlePlayerScore(2)}
        >
          Player 2 scores
        </button>
      </div>
    );
  }

  handlePlayerScore(player) {
    const update = setScore(player, this.state);
    this.setState(update);
  }
}

export default Scoreboard;
