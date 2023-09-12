import * as React from "react";
import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (email) => {
    setEmail(email);
  };

  const handlePassword = (password) => {
    setPassword(password);
  };

  const checkLogin = async (event) => {
    event.preventDefault();

    const userLogin = { email, password };
    try {
      const res = await axios.post(
        "http://localhost:4000/admin/login",
        userLogin
      );
      const userName = res.data.email;
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("adminEmail", userName);
      navigate("/Customers");
    } catch (error) {
      console.log("error al iniciar sesion");
    }
  };

  return (
    <div className="generalDiv">
      <h1 className="logo">
        OSCAR'S GYM <i className="fa-solid fa-dumbbell"></i>
      </h1>
      <div className="login-box">
        <div className="form">
          <form className="login-form">
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => handleEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => handlePassword(e.target.value)}
            />
            <button onClick={checkLogin}>login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
