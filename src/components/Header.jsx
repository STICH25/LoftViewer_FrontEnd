import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import "../assets/css/headerCss.css";
import LogOut from "../components/LogOut";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Header = () => {
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
              <Link to="/" className="menu-cursor-pointer">
                Home
              </Link>
            </li>
            <li className="menu-text">
              <Link to="/list" className="menu-cursor-pointer">
                Pigeon List
              </Link>
            </li>
            <li className="menu-text">
              <Link to="/birds" className="menu-cursor-pointer">
                Add Pigeon
              </Link>
            </li>
            <li className="menu-text">
              <Link to="/update" className="menu-cursor-pointer">
                Update/Remove
              </Link>
            </li>
            <li className="menu-text">
              <Link to="/login" className="menu-cursor-pointer">
                Sign In
              </Link>
            </li>
            <li className="menu-text">
              <LogOut />
            </li>
            <li className="menu-text">
              <Link to="/other" className="menu-cursor-pointer">
                Contact Info
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="main">Current Weather: Placeholder</div>
      <div className="user-info">
        <span className="font-semibold">Ahmed Hernandez</span>
        <span style={{ marginRight: 5 }}></span>
        <span className="header-image-container">
          <i
            className="fa fa-user"
          />
        </span>
      </div>
    </header>
  );
};

export default Header;
