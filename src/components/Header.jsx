import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import LogOut from "../components/LogOut";
import "../assets/css/headerCss.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Header = ({ isLoggedIn, userName, onLogout }) => {
  console.log("Header props: isLoggedIn =", isLoggedIn, ", userName =", userName);

  return (
    <header className="header">
      <div className="menu-container">
        <button className="menu-icon">
          <Menu size={24} />
          <span className="menu-label">Menu</span>
        </button>
        <nav className="nav-menu">
          <ul>
            <li className="menu-text">
              <Link to="/" className="menu-cursor-pointer">Home</Link>
            </li>
            <li className="menu-text">
              <Link to="/list" className="menu-cursor-pointer">Pigeon List</Link>
            </li>
            <li className="menu-text">
              <Link to="/birds" className="menu-cursor-pointer">Add Pigeon</Link>
            </li>
            <li className="menu-text">
              <Link to="/update" className="menu-cursor-pointer">Update/Remove</Link>
            </li>
            <li className="menu-text">
              {!isLoggedIn ? (
                <Link to="/login" className="menu-cursor-pointer">Sign In</Link>
              ) : (
                <LogOut onLogout={onLogout} />
              )}
            </li>
            <li className="menu-text">
              <Link to="/other" className="menu-cursor-pointer">Contact Info</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="user-info">
        {isLoggedIn ? (
          <span className="font-semibold">{userName ?? "User"}</span>
        ) : (
          <Link to="/login" className="sign-in-button">Sign In</Link>
        )}
        <span style={{ marginRight: 5 }}></span>
        <span className="header-image-container">
          <i className="fa fa-user" />
        </span>
      </div>
    </header>
  );
};

export default Header;
