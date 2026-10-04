import { useEffect } from "react";
import { clearToken } from "../auth/token";

const ACTIVITY_EVENTS = ["mousemove", "keydown", "click"];

/** Signs the user out after `timeout` ms without mouse or keyboard activity (default 60 minutes). */
const useIdleTimeout = (setUser, timeout = 60 * 60 * 1000) => {
  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        alert("Session expired due to inactivity. Please log in again.");
        clearToken();
        setUser(null);
      }, timeout);
    };

    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [setUser, timeout]);
};

export default useIdleTimeout;
