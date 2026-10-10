import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import LogOut from "../components/LogOut";
import "../assets/css/headerCss.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Header = ({ isLoggedIn, userName, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Touch devices have no hover, so the menu opens on tap. Close it on an outside tap or Escape.
  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const closeOnOutsidePress = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="menu-container" ref={menuRef}>
        <button
          type="button"
          className="menu-icon"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Menu size={24} aria-hidden="true" />
          <span className="menu-label">Menu</span>
        </button>
        {/* Any link inside closes the menu, so it does not stay open over the next page. */}
        <nav
          id="site-menu"
          className={`nav-menu${menuOpen ? " is-open" : ""}`}
          aria-label="Main"
          onClick={() => setMenuOpen(false)}
        >
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
          <i className="fa fa-user" aria-hidden="true" />
        </span>
      </div>
    </header>
  );
};

export default Header;
