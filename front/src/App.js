import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

// Components
import Navigation from "./components/Navigation";
import Game from "./components/Game";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component={Home} />
        <Route path="/game" component={Game} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
