import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css"

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username: username,
        password: password,
        email: email,
      });

      console.log("Server Response:", response);

      if (response.data.success) {
        setUsername("");
        setPassword("");
        setEmail("");
        onLogin();
        navigate("/all-Languages");

      } else {
        console.error("Login Failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error Logging in:", error);
    }
  };
  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/signup", {
        username: username,
        password: password,
        email: email,
      });

      console.log("Server Response:", response);

      if (response.data.success) {
        setUsername("");
        setPassword("");
        setEmail("");
        onLogin();
        navigate("/all-Languages");
      } else {
        console.error("Signup Failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error in Signing Up:", error);
    }
  };

  return (
    <div>
      <h2>Login/Signup Page</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Login;