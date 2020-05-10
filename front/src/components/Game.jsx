import React, { useState } from "react";
import "./Game.css";

const grid = [
  [0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0],
  [1, 1, 2, 1, 1, 0, 0],
];

export default function Game() {
  const [board, setBoard] = useState(grid);
  return (
    <div className="row">
      <div className="col-md-9">
        <h2 className="text-center">Game Board</h2>
        <div className="game-board">
          <div className="row">
            {board.map((row, i) =>
              row.map((value, j) =>
                value === 0 ? (
                  <img
                    key={`${i},${j}`}
                    src="token-empty250.png"
                    alt="Token empty"
                    width={`${100 / row.length}%`}
                  ></img>
                ) : value === 1 ? (
                  <img
                    key={`${i},${j}`}
                    src="token-green250.png"
                    alt="Token green"
                    width={`${100 / row.length}%`}
                  ></img>
                ) : (
                  <img
                    key={`${i},${j}`}
                    src="token-blue250.png"
                    alt="Token blue"
                    width={`${100 / row.length}%`}
                  ></img>
                )
              )
            )}
          </div>
        </div>
      </div>
      <div className="col-md-3 game-info">
        <h5 id="you">You</h5>
        <img src="token-green250.png" alt="Token green" width="80"></img>
        <hr class="my-4"></hr>
        <h5 id="opponent">Opponent</h5>
        <img src="token-blue250.png" alt="Token blue" width="80"></img>
      </div>
    </div>
  );
}
