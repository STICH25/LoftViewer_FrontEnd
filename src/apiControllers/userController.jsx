import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
    
    // ✅ Store the token in localStorage
    localStorage.setItem("token", response.data.token);
    console.log("Login successful:");
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);
    throw new Error("Login failed. Please check your username and password.");
  }
};

// ✅ Function to retrieve token
export const getToken = () => localStorage.getItem("token");

// ✅ Function to include token in headers
export const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});
