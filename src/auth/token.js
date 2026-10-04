const TOKEN_KEY = "token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/**
 * Decodes a JWT's payload without verifying it (the API verifies). JWTs are base64url encoded,
 * which plain atob() rejects whenever the payload contains '-' or '_'.
 */
export const decodeTokenPayload = (token) => {
  const segment = token?.split(".")[1];
  if (!segment) {
    throw new Error("Malformed token.");
  }

  const base64 = segment.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(segment.length / 4) * 4, "=");
  const json = new TextDecoder().decode(Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)));
  return JSON.parse(json);
};

export const isTokenExpired = (token, now = Date.now()) => {
  const { exp } = decodeTokenPayload(token);
  return typeof exp !== "number" || exp * 1000 < now;
};

/**
 * Authorization header for an admin request. When there is no usable token it alerts the user,
 * clears the stored token and throws, so the request is never sent.
 */
export const getAuthHeader = () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    if (isTokenExpired(token)) {
      throw new Error("Your session has expired. Please log in again.");
    }

    return { Authorization: `Bearer ${token}` };
  } catch (error) {
    console.error(error.message);
    alert("Your session has expired or is invalid. Please log in again.");
    clearToken();
    throw error;
  }
};
