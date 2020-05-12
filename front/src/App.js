import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

// Components
import Navigation from "./components/Navigation";
import Game from "./components/Game";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Top10 from "./components/Top10";

// Context
export const SessionContext = React.createContext();

function App() {
  const [_id, set_id] = useState(null);
  const [username, setUsername] = useState(null);
  const [victories, setVictories] = useState(null);
  const [defeats, setDefeats] = useState(null);
  const [tie, setTie] = useState(null);

  useEffect(() => {
    fetch([`/getUser`])
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          set_id(json._id);
          setUsername(json.username);
          setVictories(json.victories);
          setDefeats(json.defeats);
          setTie(json.tie);
        }
      });
  }, []);

  return (
    <Router>
      <SessionContext.Provider
        value={{
          _id,
          username,
          victories,
          defeats,
          tie,
          set_id,
          setUsername,
          setVictories,
          setDefeats,
          setTie,
        }}
      >
        <Navigation />
        <div className="container p-4">
          <Route path="/" exact component={Home} />
          <Route path="/top10" component={Top10} />
          <Route path="/game">
            <Game />
          </Route>
          {username ? (
            <Route path="/profile" component={Profile} />
          ) : (
            <Route path="/login" component={Login} />
          )}
        </div>
      </SessionContext.Provider>
    </Router>
  );
}

export default App;
