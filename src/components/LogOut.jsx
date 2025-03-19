import { useNavigate, Link } from "react-router-dom";
import "../assets/css/headerCss.css"

const LogOut = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Link to="/" className="menu-cursor-pointer" onClick={logoutUser}>
      Log out
    </Link>
  );
};

export default LogOut;
