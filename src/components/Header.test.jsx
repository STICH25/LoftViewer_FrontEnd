import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

const renderHeader = (props = {}) =>
  render(
    <MemoryRouter>
      <Header isLoggedIn={false} onLogout={() => {}} {...props} />
    </MemoryRouter>,
  );

const menuButton = () => screen.getByRole("button", { name: "Menu" });
const menu = () => document.getElementById("site-menu");

describe("Header menu (touch devices have no hover)", () => {
  it("starts closed and exposes its state to assistive technology", () => {
    renderHeader();

    expect(menuButton()).toHaveAttribute("aria-expanded", "false");
    expect(menuButton()).toHaveAttribute("aria-controls", "site-menu");
    expect(menu()).not.toHaveClass("is-open");
  });

  it("opens and closes when the Menu button is pressed", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(menuButton());
    expect(menuButton()).toHaveAttribute("aria-expanded", "true");
    expect(menu()).toHaveClass("is-open");

    await user.click(menuButton());
    expect(menuButton()).toHaveAttribute("aria-expanded", "false");
    expect(menu()).not.toHaveClass("is-open");
  });

  it("closes after a link inside it is chosen", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(menuButton());
    await user.click(screen.getByRole("link", { name: "Pigeon List" }));

    expect(menu()).not.toHaveClass("is-open");
  });

  it("closes on Escape and on a press outside the menu", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(menuButton());
    await user.keyboard("{Escape}");
    expect(menu()).not.toHaveClass("is-open");

    await user.click(menuButton());
    await user.click(document.body);
    expect(menu()).not.toHaveClass("is-open");
  });

  it("shows the signed-in user's name, and Log out instead of Sign In", () => {
    renderHeader({ isLoggedIn: true, userName: "ahernandez25" });

    expect(screen.getByText("ahernandez25")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Log out" })).toBeInTheDocument();
  });
});
