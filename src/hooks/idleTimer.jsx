import { useEffect } from "react";

const useIdleTimeout = (setUser, timeout = 60 * 60 * 1000) => { // 60 min
  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        alert("Session expired due to inactivity. Please log in again.");
        localStorage.removeItem("token");
        setUser(null);
      }, timeout);
    };

    // Reset timer on user interactions
    const events = ["mousemove", "keydown", "click"];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // Initialize timer

    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [setUser, timeout]);
};

export default useIdleTimeout;
