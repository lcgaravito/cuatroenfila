import React, { useState } from "react";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsNotEquals, setPasswordsNotEquals] = useState(false);
  const [logIn, setLogIn] = useState(true);

  const sendForm = (ev) => {
    ev.preventDefault();
    if (!logIn && password !== confirmPassword) {
      setPasswordsNotEquals(true);
      return;
    }
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        user,
        password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setUser("");
        setPassword("");
        setConfirmPassword("");
        console.log(json);
      });
  };

  return (
    <div className="login col-md-6 offset-md-3">
      <h2 className="text-center">{logIn ? "Log in" : "Create Account"}</h2>
      <form onSubmit={(ev) => sendForm(ev)}>
        <div className="form-group">
          <label htmlFor="user">User</label>
          <input
            type="text"
            className="form-control"
            id="user"
            placeholder="Username"
            value={user}
            onChange={(ev) => setUser(ev.target.value)}
            required="required"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required="required"
          />
        </div>
        {!logIn && (
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-group">
              <input
                type="password"
                className="form-control"
                id="confirm-password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
                required="required"
              />
              <div className="input-group-append">
                {password === confirmPassword ? (
                  <span
                    className="input-group-text"
                    role="img"
                    aria-label="checked"
                  >
                    ✅
                  </span>
                ) : (
                  <span
                    className="input-group-text"
                    role="img"
                    aria-label="incorrect"
                  >
                    ❗️
                  </span>
                )}
              </div>
            </div>
            {passwordsNotEquals && (
              <p className="text-center mt-2 text-wrong">
                Passwords do not match.
              </p>
            )}
          </div>
        )}
        <input
          className="btn btn-primary btn-block mt-4 mb-4"
          type="submit"
          value={logIn ? "Log in" : "Create Account"}
        />
      </form>
      <div className="text-center">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => {
            setLogIn(!logIn);
            setConfirmPassword("");
          }}
        >
          {logIn ? "Create an account" : "Login to your account"}
        </button>
      </div>
    </div>
  );
}
