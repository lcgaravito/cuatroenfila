import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../App";
import "./Home.css";

export default function Home() {
  const userContext = useContext(SessionContext);
  return (
    <div className="container">
      {userContext.username ? (
        <div className="text-center">
          <h2>Welcome to Cuatro en Fila, {userContext.username}</h2>
          <img src="token-green250.png" alt="Token green" width="180" />
          <br />
          <br />
          <p className="text-home">
            With Cuatro en Fila you can play the famous Connect Four game with
            other online players.
          </p>
          <h5>Now, you can start a game or visit your profile.</h5>
          <div>
            <Link className="btn btn-primary btn-lg m-1" to="/game">
              Start Playing
            </Link>
          </div>
          <div>
            <Link className="btn btn-outline-success btn-lg m-1" to="/profile">
              See my Profile
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1>Cuatro en Fila</h1>
          <img src="token-green250.png" alt="Token green" width="180" />
          <br />
          <br />
          <p className="text-home">
            With Cuatro en Fila you can play the famous Connect Four game with
            other online players.
          </p>
          <h5>Please log in to start playing.</h5>
          <Link className="btn btn-primary btn-lg" to="/login">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
