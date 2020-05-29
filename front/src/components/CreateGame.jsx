import React, { useState, useRef, useEffect } from "react";
import Game from "./Game";

const framework = {
  create: "create",
  createprivate: "createprivate",
  games: "games",
  startgame: "startgame",
  startprivategame: "startprivategame",
  move: "move",
  turn: "turn",
  winner: "winner",
  username: "username",
};

export default function CreateGame() {
  const [games, setGames] = useState([]);
  const [gameID, setGameID] = useState(null);
  const webSocket = useRef(null);
  const webSocketGames = useRef(null);

  const sendBySocket = (type, data) => {
    let msg = {
      type,
      data,
    };
    webSocket.current.send(JSON.stringify(msg));
  };

  const sendBySocketGames = (type, data) => {
    let msg = {
      type,
      data,
    };
    webSocketGames.current.send(JSON.stringify(msg));
  };

  const createGame = (privateGame = false) => {
    //webSocket.current = new WebSocket("wss://cuatroenfila.herokuapp.com/");
    webSocket.current = new WebSocket("ws://localhost:3001/");
    webSocket.current.onopen = () => {
      sendBySocket(framework.create, "");
      webSocket.current.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.type) {
          case framework.create:
            setGameID(msg.data);
            webSocket.current.close();
            break;
          default:
            break;
        }
      };
    };
  };

  const setUpWSGames = () => {
    webSocketGames.current.onopen = () => {
      sendBySocketGames(framework.games, "");
      webSocketGames.current.onmessage = (event) => {
        let msg = JSON.parse(event.data);

        switch (msg.type) {
          case framework.games:
            setGames(msg.data);
            break;
          default:
            break;
        }
      };
    };
  };

  useEffect(() => {
    //webSocketGames.current = new WebSocket("wss://cuatroenfila.herokuapp.com/");
    webSocketGames.current = new WebSocket("ws://localhost:3001/");
    setUpWSGames();
    return () => {
      webSocketGames.current.close();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {gameID ? (
        <Game gameID={gameID} />
      ) : (
        <div className="text-center">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => createGame()}
          >
            Create game
          </button>
          <br />
          <button
            className="btn btn-secondary btn-lg mt-2"
            onClick={() => createGame(true)}
          >
            <span role="img" aria-label="silence-emoji">
              🤫
            </span>
            Create private game
          </button>
          <br />
          <br />
          <h2>Available games:</h2>
          <br />
          {games.map((item, index) => (
            <button
              key={index}
              type="button"
              className="btn btn-outline-secondary btn-lg m-2"
              onClick={() => setGameID(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
