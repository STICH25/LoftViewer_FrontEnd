import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Birds from "./pages/BirdsPage";
import BirdsList from "./pages/BirdsListPage";
import RemoveDeleteBird from "./pages/UpdateRemovePage";
import LogInPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import useIdleTimeout from "./hooks/useIdleTimeout";
import { getToken } from "./auth/token";

const USER_KEY = "user";

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) ?? "null");
  } catch {
    return null;
  }
};

const App = () => {
  const [user, setUser] = useState(readStoredUser);
  const navigate = useNavigate();
  const location = useLocation();

  useIdleTimeout(setUser);

  const handleLoginSuccess = (userName) => {
    const userData = { username: userName, token: getToken() };
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
    navigate("/");
  };

  return (
    <>
      {location.pathname !== "/login" && (
        <Header isLoggedIn={!!user} userName={user?.name} onLogout={() => setUser(null)} />
      )}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LogInPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/list" element={<BirdsList />} />
        <Route
          path="/birds"
          element={
            <ProtectedRoute user={user?.token}>
              <Birds />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update"
          element={
            <ProtectedRoute user={user?.token}>
              <RemoveDeleteBird />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
