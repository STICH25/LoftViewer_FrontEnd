import { useNavigate } from "react-router-dom";
import "../assets/css/headerCss.css";
import { clearToken } from "../auth/token";

const LogOut = ({ onLogout }) => {
  const navigate = useNavigate();

  const logoutUser = (event) => {
    event.preventDefault(); 
    clearToken();
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