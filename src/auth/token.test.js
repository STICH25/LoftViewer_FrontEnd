import { afterEach, describe, expect, it, vi } from "vitest";
import { clearToken, decodeTokenPayload, getAuthHeader, isTokenExpired, setToken } from "./token";

const base64Url = (value) =>
  btoa(JSON.stringify(value)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const makeToken = (payload) => `${base64Url({ alg: "HS256" })}.${base64Url(payload)}.signature`;

afterEach(() => {
  clearToken();
  vi.restoreAllMocks();
});

describe("decodeTokenPayload", () => {
  it("decodes base64url payloads that plain atob would reject", () => {
    // "??>" encodes to "Pz8-" in base64url: the '-' breaks a naive atob().
    const token = makeToken({ name: "??>", role: "Admin" });
    expect(decodeTokenPayload(token)).toEqual({ name: "??>", role: "Admin" });
  });

  it("throws on a malformed token", () => {
    expect(() => decodeTokenPayload("not-a-jwt")).toThrow();
  });
});

describe("isTokenExpired", () => {
  it("compares exp (seconds) with now (milliseconds)", () => {
    const token = makeToken({ exp: 1_000 });
    expect(isTokenExpired(token, 999_000)).toBe(false);
    expect(isTokenExpired(token, 1_001_000)).toBe(true);
  });

  it("treats a token without exp as expired", () => {
    expect(isTokenExpired(makeToken({}))).toBe(true);
  });
});

describe("getAuthHeader", () => {
  it("returns a bearer header for a valid token", () => {
    const token = makeToken({ exp: Math.floor(Date.now() / 1000) + 3600 });
    setToken(token);
    expect(getAuthHeader()).toEqual({ Authorization: `Bearer ${token}` });
  });

  it("clears an expired token and throws", () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    setToken(makeToken({ exp: 1 }));

    expect(() => getAuthHeader()).toThrow(/expired/);
    expect(localStorage.getItem("token")).toBeNull();
  });
});
