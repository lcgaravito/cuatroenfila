import React, { useState, useEffect, useRef } from "react";
import "./Game.css";

const grid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

export default function Game() {
  const [board, setBoard] = useState(grid);
  const webSocket = useRef(null);

  const sendMotion = (i, j) => {
    for (let index = board.length - 1; index >= 0; index--) {
      const element = board[index][j];
      if (element === 0) {
        const boardCopy = [...board];
        boardCopy[index][j] = 1;
        setBoard(boardCopy);
        webSocket.current.send(j);
        return;
      }
    }
  };

  const receiveMotion = (j) => {
    for (let index = board.length - 1; index >= 0; index--) {
      const element = board[index][j];
      if (element === 0) {
        const boardCopy = [...board];
        boardCopy[index][j] = 2;
        setBoard(boardCopy);
        return;
      }
    }
  };

  useEffect(() => {
    webSocket.current = new WebSocket("wss://cuatroenfila.herokuapp.com/");
    webSocket.current.onopen = () => {
      console.log("WS client connected");
      webSocket.current.onmessage = (msg) => {
        console.log("WS got message: ", msg.data);
        receiveMotion(msg.data);
      };
    };
    return () => webSocket.current.close();
  }, []);
  return (
    <div className="row">
      <div className="col-md-8">
        <h2 className="text-center">Game Board</h2>
        <div className="game-board">
          <div className="row">
            {board.map((row, i) =>
              row.map((value, j) =>
                value === 0 ? (
                  <img
                    className="image-token-empty"
                    key={`${i},${j}`}
                    src="token-empty250.png"
                    alt="Token empty"
                    onMouseOver={(e) =>
                      (e.currentTarget.src = "token-green250.png")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.src = "token-empty250.png")
                    }
                    onClick={(e) => sendMotion(i, j)}
                    width={`${100 / row.length}%`}
                  ></img>
                ) : value === 1 ? (
                  <img
                    className="image-token-green"
                    key={`${i},${j}`}
                    src="token-green250.png"
                    alt="Token green"
                    width={`${100 / row.length}%`}
                  ></img>
                ) : (
                  <img
                    className="image-token-blue"
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
      <div className="col-md-4 game-info">
        <h5 id="you">You</h5>
        <img src="token-green250.png" alt="Token green" width="80"></img>
        <hr className="my-4"></hr>
        <h5 id="opponent">Opponent</h5>
        <img src="token-blue250.png" alt="Token blue" width="80"></img>
      </div>
    </div>
  );
}
