import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Birds from "./pages/BirdsPage";
import BirdsList from "./pages/BirdsListPage";
import RemoveDeleteBird from "./pages/UpdateRemovePage";
import LogInPage from "./pages/LoginPage";
import ProtectedRoute from "../src/utils/ProtectedRoute";
import useIdleTimeout from "./hooks/idleTimer";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useIdleTimeout(setUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const handleLoginSuccess = (userData, from) => {
    localStorage.setItem("token", userData.token); // Persist token
    setUser(userData);
    navigate(from ?? "/"); // Navigate after login
  };

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LogInPage onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/list" element={<BirdsList />} />

      <Route
        path="/birds"
        element={
          <ProtectedRoute user={user}>
            <Birds />
          </ProtectedRoute>
        }
      />
      <Route
        path="/update"
        element={
          <ProtectedRoute user={user}>
            <RemoveDeleteBird />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
