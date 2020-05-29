import React, { useState, useEffect, useRef, useContext } from "react";
import "./Game.css";
import { SessionContext } from "../App";

const framework = {
  create: "create",
  games: "games",
  startgame: "startgame",
  move: "move",
  turn: "turn",
  winner: "winner",
};

//Seria bueno no utilizar var

var grid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

export default function Game({ gameID }) {
  const userContext = useContext(SessionContext);
  const [board, setBoard] = useState(grid);
  const [status, setStatus] = useState("waiting turn");
  const [oponent, setOponent] = useState("waiting oponent");
  const [myTurn, setMyTurn] = useState(false);
  const webSocket = useRef(null);
  const webSocketUser = useRef(null);

  const sendMotion = (i, j) => {
    for (let index = board.length - 1; index >= 0; index--) {
      const element = board[index][j];
      if (element === 0) {
        const boardCopy = [...board];
        boardCopy[index][j] = 1;
        setBoard(boardCopy);
        sendBySocket(framework.move, j, userContext.username);
        hasWon(index, j, (response) => {
          if (response) {
            setMyTurn(false);
            setStatus("Congratulations, You win! 🎉");
            sendBySocket(framework.winner, "", userContext.username);
            recordResult(1, 0, 0);
          } else {
            if (myTurn) {
              setStatus("it's your opponent's turn");
            } else {
              setStatus("Your turn");
            }
            setMyTurn(!myTurn);
          }
        });
        return;
      }
    }
  };

  const hasWon = (i, j, callback) => {
    let board_data = "";
    // eslint-disable-next-line
    board.map((row) => {
      row.map((box) => (board_data += box));
    });
    fetch([`/api/hasWon`], {
      method: "POST",
      body: JSON.stringify({
        board_data,
        i,
        j,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        callback(response);
      });
  };

  const recordResult = (win, lose, tie) => {
    fetch([`/api/update`], {
      method: "PUT",
      body: JSON.stringify({
        _id: userContext.id,
        username: userContext.username,
        victories: userContext.victories + win,
        defeats: userContext.defeats + lose,
        tie: userContext.tie + tie,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    userContext.victories = userContext.victories + win;
    userContext.defeats = userContext.defeats + lose;
    userContext.tie = userContext.tie + tie;
  };

  const sendBySocket = (type, data, user) => {
    let msg = {
      type,
      data,
      user,
    };
    webSocket.current.send(JSON.stringify(msg));
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

  const setUpWS = () => {
    webSocket.current.onopen = () => {
      sendBySocket(framework.startgame, gameID);
      webSocket.current.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        setOponent(msg.user);
        switch (msg.type) {
          case framework.move:
            receiveMotion(msg.data);
            if (!myTurn) {
              setStatus("Your turn");
            } else {
              setStatus("it's your opponent's turn");
            }
            setMyTurn(!myTurn);
            break;
          case framework.turn:
            setMyTurn(msg.data);
            if (msg.data) {
              setStatus("Your turn");
            } else {
              setStatus("it's your opponent's turn");
            }
            break;
          case framework.winner:
            setMyTurn(false);
            setStatus("You lost. 😕 Luck for the next.");
            recordResult(0, 1, 0);
            break;
          default:
            break;
        }
      };
    };
  };

  useEffect(() => {
    //webSocket.current = new WebSocket("wss://cuatroenfila.herokuapp.com/");
    webSocket.current = new WebSocket("ws://localhost:3001/");
    setUpWS();
    return () => {
      webSocket.current.close();
      const gridEmpty = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      grid = gridEmpty;
      setBoard(gridEmpty);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className="row">
      <div className="col-md-8">
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
                      (e.currentTarget.src = myTurn
                        ? "token-green250.png"
                        : "token-red-locked250.png")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.src = "token-empty250.png")
                    }
                    onClick={(e) => {
                      if (myTurn) {
                        sendMotion(i, j);
                      }
                    }}
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
        <h2 className="text-center">Game ID: #{gameID}</h2>
        <h6 id="oponent">Oponent: {oponent}</h6>
        <h6 id="status">Status: {status}</h6>
        <hr className="my-4"></hr>
        <h5 id="you">You</h5>
        <img src="token-green250.png" alt="Token green" width="80"></img>
        <hr className="my-4"></hr>
        <h5 id="opponent">Opponent</h5>
        <img src="token-blue250.png" alt="Token blue" width="80"></img>
      </div>
    </div>
  );
}
