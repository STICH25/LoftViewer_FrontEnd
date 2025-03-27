import { useEffect } from "react";
import LogIn from "../components/Login.jsx";
import LogOut from "../components/LogOut.jsx";

const LogInPage = ({ onLoginSuccess, onLogout, isLoggedIn, userName }) => {
  useEffect(() => {
    console.log("LogInPage updated: isLoggedIn =", isLoggedIn, ", userName =", userName);
  }, [isLoggedIn, userName]);

  return (
    <div className="body">
      {!isLoggedIn ? (
        <LogIn onLoginSuccess={onLoginSuccess} />
      ) : (
        <div>
          <p>Welcome, {userName}!</p>
          <LogOut onLogout={onLogout} />
        </div>
      )}
    </div>
  );
};

export default LogInPage;
