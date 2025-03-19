import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../apiControllers/userController.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/css/loginPage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const LogInPage = ({ onLoginSuccess }) => {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      localStorage.setItem("token", response.token);
      if (onLoginSuccess) {
        onLoginSuccess(response.user, from);
      }
      reset();
      const redirectPath = location.state?.from?.pathname || "/";
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-container">      
      <div className="login-container">
      <span className="profile-icon">
        <i className="fa fa-user fa-3x" style={{color: "whitesmoke"}}></i>
      </span>
        <h2 style={{color: "whitesmoke"}}>Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>User Name</label>
            <div className="input-container">
              <i className="fas fa-user" aria-hidden="true"></i>
              <input
                {...register("username")}
                type="text"
                placeholder="User Name"
                className="adjust-text"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-container">
              <i className="fas fa-lock"></i>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="login-btn">
            <span className="login-btn-text">Sign In</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
