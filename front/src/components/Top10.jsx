import React, { useState, useEffect } from "react";

export default function Top10() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/top10")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        const newUsers = [];
        myJson.map((user) => newUsers.push(user));
        setUsers(newUsers);
      });
  }, []);
  console.log(users);
  return (
    <div className="container text-center">
      <h2>Top 10 players</h2>
      <div className="mt-4">
        <img src="top-10-green250.png" alt="Token green" width="200" />
      </div>
      <table className="table table-dark mt-4">
        <thead>
          <tr>
            <th>Username</th>
            <th>Wins</th>
            <th>defeats</th>
            <th>draws</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th>{user.username}</th>
              <td>{user.victories}</td>
              <td>{user.defeats}</td>
              <td>{user.tie}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
