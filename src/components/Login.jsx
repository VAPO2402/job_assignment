import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send login request to the server
    axios
      .post("https://api.escuelajs.co/api/v1/auth/login", {
        email,
        password,
      })
      .then((response) => {
        // Save token to localStorage
        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token);

        // Redirect to home page
        navigate("/home");
      })
      .catch((error) => {
        setError("Invalid credentials, please try again.");
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="loginPage">
      <h2>Login</h2>
      {error && <p className="errorMessage">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submitButton">Submit</button>
      </form>
    </div>
  );
};

export default Login;