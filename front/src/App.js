import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

// Components
import Navigation from "./components/Navigation";
import Game from "./components/Game";
import Home from "./components/Home";
import Login from "./components/Login";

// Context
export const SessionContext = React.createContext();

function App() {
  const [_id, set_id] = useState(null);
  const [username, setUsername] = useState(null);
  const [victories, setVictories] = useState(null);
  const [defeats, setDefeats] = useState(null);
  const [tie, setTie] = useState(null);

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
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/login" component={Login} />
        </div>
      </SessionContext.Provider>
    </Router>
  );
}

export default App;
