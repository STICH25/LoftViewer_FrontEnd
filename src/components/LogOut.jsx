import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/headerCss.css";

const LogOut = ({ onLogout }) => {
  const navigate = useNavigate();

  const logoutUser = (event) => {
    event.preventDefault(); 
    localStorage.removeItem("token");
    onLogout(); 
    navigate("/"); 
  };

  return (
    <a href="/" className="menu-cursor-pointer" onClick={logoutUser}>
      Log out
    </a>
  );
};

export default LogOut;