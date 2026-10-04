import axios from "axios";

/** Base URL of the LoftViewer API, from VITE_API_URL (see .env.development / .env.production). */
export const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error("VITE_API_URL is not set; API calls will fail. See .env.example.");
}

/** Shared axios instance. All API modules go through this so base URL and timeouts live in one place. */
export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30_000,
});
