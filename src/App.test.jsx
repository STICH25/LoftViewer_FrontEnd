import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { setToken } from "./auth/token";

const base64Url = (value) =>
  btoa(JSON.stringify(value)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const makeToken = (name) =>
  `${base64Url({ alg: "HS256" })}.${base64Url({ name, role: "Admin", exp: Math.floor(Date.now() / 1000) + 3600 })}.sig`;

const { loginUser } = vi.hoisted(() => ({ loginUser: vi.fn() }));
vi.mock("./api/auth", () => ({ loginUser }));

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

afterEach(() => {
  localStorage.clear();
  loginUser.mockReset();
});

describe("signed-in user name in the header", () => {
  it("shows the user name returned by the API after signing in", async () => {
    const token = makeToken("ahernandez25");
    loginUser.mockImplementation(async () => {
      setToken(token);
      return { token, userName: "ahernandez25", role: "Admin" };
    });
    const user = userEvent.setup();
    renderAt("/login");

    await user.type(screen.getByPlaceholderText("User Name"), "ahernandez25");
    await user.type(screen.getByPlaceholderText("Password"), "not-a-real-password");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(await screen.findByText("ahernandez25")).toBeInTheDocument();
    expect(screen.queryByText("User")).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("user")).username).toBe("ahernandez25");
  });

  it("replaces a stale placeholder name from an earlier build with the name in the token", () => {
    const token = makeToken("ahernandez25");
    setToken(token);
    localStorage.setItem("user", JSON.stringify({ username: "User1", token }));

    renderAt("/");

    expect(screen.getByText("ahernandez25")).toBeInTheDocument();
    expect(screen.queryByText("User1")).not.toBeInTheDocument();
  });
});
