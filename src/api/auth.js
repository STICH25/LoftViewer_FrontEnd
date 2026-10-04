import { apiClient } from "./client";
import { setToken } from "../auth/token";

/**
 * Logs in and stores the token. Resolves to the API response:
 * { token, userName, role, expiresAt }.
 */
export const loginUser = async (credentials) => {
  try {
    const { data } = await apiClient.post("/api/auth/login", credentials);
    setToken(data.token);
    return data;
  } catch (error) {
    console.error("Login error:", error.response?.status ?? error.message);
    throw new Error("Login failed. Please check your username and password.", { cause: error });
  }
};
