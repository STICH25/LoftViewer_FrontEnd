import LogIn from "../components/Login.jsx";
import LogOut from "../components/LogOut.jsx";

const LogInPage = ({ onLoginSuccess, onLogout, isLoggedIn, userName }) => (
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

export default LogInPage;
