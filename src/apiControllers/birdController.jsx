import axios from "axios";
import { getAuthHeader } from "../utils/auth";
import { data } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

// ✅ Fetch all birds from the database
export const getBirds = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/birds`);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching birds:", error);
    return [];
  }
};

// ✅ Add a new bird to the database
export const addBird = async (bird) => {
  try {
    const token = getAuthHeader();
    const response = await axios.post(`${API_URL}/addBird`, bird, {
      headers: { ...token, "Content-Type": "multipart/form-data", },
    });
    return response;
  } catch (error) {
    console.error(
      "Error adding bird:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// ✅ Update a bird's details by ID
export const UpdateBird = async (id, bird) => {
  try {
    const token = getAuthHeader();
    const response = await axios.put(`${API_URL}/${id}`, bird, {
      headers: {
        ...token,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Bird updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating bird:", error.response || error.message);
    throw error;
  }
};

// ✅ Delete a bird from the database by ID
export const deleteBird = async (id) => {
  try {
    const token = getAuthHeader();
    await axios.delete(`${API_URL}/${id}`, {
      headers: { ...token },
    });

    console.log("Bird deleted successfully");
  } catch (error) {
    console.error("Error deleting bird:", error.response || error.message);
    throw error;
  }
};

export const uploadImage = async (formData) => {
  formData = new FormData();
  try {
    const headers = getAuthHeader();
    const response = await axios.post(`${API_URL}/uploadImage`, formData, {
      headers: { ...headers },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error uploading the image:",
      error.response || error.message
    );
    throw error;
  }
};

// ✅ Get the image for each bird
export const getBirdImage = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/birds/${id}/image`, {
      responseType: "blob", // Ensure we get binary data
    });
    //console.log(response);
    if (response.data) {
      return URL.createObjectURL(response.data); // Convert to URL
    } else {
      console.warn(`No image available for the bird with id ${id}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching bird image for ID ${id}: ${error.message}`);
    return null;
  }
};
