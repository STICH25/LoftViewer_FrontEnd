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
import { decodeTokenPayload, getToken } from "./auth/token";

const USER_KEY = "user";

/** The signed-in user's name from the token's `name` claim, or null if there is no readable token. */
const nameFromToken = (token) => {
  try {
    return token ? decodeTokenPayload(token).name ?? null : null;
  } catch {
    return null;
  }
};

const readStoredUser = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(USER_KEY) ?? "null");
    if (!stored) {
      return null;
    }

    // The token's name comes from the server. Earlier builds stored a placeholder ("User1") here,
    // so prefer the token so those sessions show the right name without signing in again.
    return { ...stored, username: nameFromToken(stored.token) ?? stored.username };
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
    const token = getToken();
    const userData = { username: userName ?? nameFromToken(token), token };
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
    navigate("/", { replace: true });
  };

  return (
    <>
      {location.pathname !== "/login" && (
        <Header isLoggedIn={!!user} userName={user?.username} onLogout={() => setUser(null)} />
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
