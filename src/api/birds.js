import { apiClient } from "./client";
import { getAuthHeader } from "../auth/token";

/** All birds (without images). Returns an empty list when the request fails. */
export const getBirds = async () => {
  try {
    const { data } = await apiClient.get("/api/birds");
    return data;
  } catch (error) {
    console.error("Error fetching birds:", error.message);
    return [];
  }
};

/** Creates a bird from multipart form data (fields + optional "image" file). Admin only. */
export const addBird = async (formData) => {
  try {
    // KNOWN BUG (see CLAUDE.md): path is missing the /api/birds prefix.
    return await apiClient.post("/addBird", formData, { headers: getAuthHeader() });
  } catch (error) {
    console.error("Error adding bird:", error.response?.data ?? error.message);
    throw error;
  }
};

/** Updates a bird from multipart form data. Admin only. */
export const updateBird = async (id, formData) => {
  try {
    // KNOWN BUG (see CLAUDE.md): path is missing the /api/birds prefix.
    const { data } = await apiClient.put(`/${id}`, formData, { headers: getAuthHeader() });
    return data;
  } catch (error) {
    console.error("Error updating bird:", error.response?.data ?? error.message);
    throw error;
  }
};

/** Deletes a bird. Admin only. */
export const deleteBird = async (id) => {
  try {
    // KNOWN BUG (see CLAUDE.md): path is missing the /api/birds prefix.
    await apiClient.delete(`/${id}`, { headers: getAuthHeader() });
  } catch (error) {
    console.error("Error deleting bird:", error.response?.data ?? error.message);
    throw error;
  }
};

/**
 * Fetches a bird's photo and returns an object URL for it, or null on failure.
 * The caller owns the URL and must release it with URL.revokeObjectURL.
 */
export const getBirdImage = async (id) => {
  try {
    const { data } = await apiClient.get(`/api/birds/${id}/image`, { responseType: "blob" });
    return data ? URL.createObjectURL(data) : null;
  } catch (error) {
    console.error(`Error fetching image for bird ${id}:`, error.message);
    return null;
  }
};
