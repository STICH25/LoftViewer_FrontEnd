export const getAuthHeader = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    console.log(`This is the active token: ${token}`);

    // Decode the token (JWT format: header.payload.signature)
    let tokenPayload;
    try {
      tokenPayload = JSON.parse(atob(token.split(".")[1])); // Base64-decode the payload
    } catch (e) {
      throw new Error("Failed to decode the token. Please log in again.");
    }

    console.log("Decoded token payload:", tokenPayload);

    // Check token expiration
    const isTokenExpired = tokenPayload.exp * 1000 < Date.now();
    // console.log("Token check:", {
    //   token,
    //   tokenPayload,
    //   expirationTime: tokenPayload.exp * 1000,
    //   currentTime: Date.now(),
    //   isExpired: isTokenExpired,
    // });

    if (isTokenExpired) {
      throw new Error("Your session has expired. Please log in again.");
    }

    // Return the Authorization header
    return {
      Authorization: `Bearer ${token}`,
    };
  } catch (error) {
    console.error(error.message);
    alert("Your session has expired or is invalid. Please log in again."); 
    localStorage.removeItem("token");
    throw error;
  }
};