import React, { useContext } from "react";
import { SessionContext } from "../App";

export default function Profile() {
  const userContext = useContext(SessionContext);
  const logOut = () => {
    fetch([`/logout`])
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) {
          userContext.set_id(null);
          userContext.setUsername(null);
          userContext.setVictories(null);
          userContext.setDefeats(null);
          userContext.setTie(null);
        }
      });
  };
  return (
    <div className="container text-center col-md-6 offset-md-3">
      <h2>Your Profile</h2>
      <div className="mt-4">
        <h3>{userContext.username}</h3>
        <div className="row">
          <div className="col">
            <img src="token-green250.png" alt="Token green" width="80" />
            <h4>{userContext.victories}</h4>
            <p>Wins</p>
          </div>
          <div className="col">
            <img src="token-blue250.png" alt="Token blue" width="80" />
            <h4>{userContext.defeats}</h4>
            <p style={{ color: "#38aecc" }}>defeats</p>
          </div>
          <div className="col">
            <img src="token-red250.png" alt="Token red" width="80" />
            <h4>{userContext.tie}</h4>
            <p style={{ color: "#f97068" }}>draws</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => logOut()}
          className="btn btn-outline-danger"
        >
          Log Out!
        </button>
      </div>
    </div>
  );
}
