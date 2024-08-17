// src/components/Game.test.tsx
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Game from "./Game";

test("datorn gör sitt drag direkt efter användarens första drag", () => {
  render(<Game />);

  // Användaren gör sitt första drag
  fireEvent.click(screen.getAllByRole("button")[0]);

  // Kontrollera att datorn har gjort sitt drag
  const squares = screen.getAllByRole("button");
  const userMove = squares[0].textContent;
  const computerMove = squares.filter(
    (square) => square.textContent === "O"
  ).length;

  expect(userMove).toBe("X");
  expect(computerMove).toBe(1);
});
