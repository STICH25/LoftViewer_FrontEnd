import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation  } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Birds from "./pages/BirdsPage";
import BirdsList from "./pages/BirdsListPage";
import RemoveDeleteBird from "./pages/UpdateRemovePage";
import LogInPage from "./pages/LoginPage";
import ProtectedRoute from "../src/utils/ProtectedRoute";
import useIdleTimeout from "./hooks/idleTimer";
import Header from "./components/Header";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); 

  useIdleTimeout(setUser);

  // Check localStorage for user data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);  

  // Handle login success
  const handleLoginSuccess = (userName) => {
    console.log("Login successful, setting user:", userName);
    const token = localStorage.getItem("token");
    const userData = { username: userName, token };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    navigate("/");
  };

  return (
    <>
      {location.pathname !== "/login" && <Header isLoggedIn={!!user} userName={user?.name} onLogout={() => setUser(null)} />}
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
