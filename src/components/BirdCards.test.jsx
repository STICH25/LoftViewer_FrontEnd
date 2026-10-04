import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import BirdCards from "./BirdCards";

describe("BirdCards", () => {
  it("renders one card per bird with its details and photo", () => {
    const birds = [
      { id: "a1", birdName: "Blue Bar", birdNumber: "RL-1", birdMother: "Mom", birdFather: "Dad", birdColor: "Blue", champion: "Champion Bird" },
      { id: "b2", birdName: "Red Check", birdNumber: "RL-2", birdMother: "N/A", birdFather: "N/A", birdColor: "Red", champion: "N/A" },
    ];

    render(<BirdCards birds={birds} birdImages={{ a1: "blob:photo-a1" }} />);

    expect(screen.getByRole("heading", { name: "Blue Bar" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Red Check" })).toBeInTheDocument();
    expect(screen.getByText("Number: RL-1")).toBeInTheDocument();
    expect(screen.getAllByAltText("Bird Image")[0]).toHaveAttribute("src", "blob:photo-a1");
  });
});
