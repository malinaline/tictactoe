// import { render, fireEvent, screen } from "@testing-library/react";
// import Game from "./Game";

// test("computer makes its move immediately after the user's first move", () => {
//   // Render the Game component
//   render(<Game />);

//   // User makes their first move by clicking the first button
//   fireEvent.click(screen.getAllByRole("button")[0]);

//   // Get all the buttons (squares) after the user's move
//   const squares = screen.getAllByRole("button");

//   // Check the content of the user's move
//   const userMoveContent = squares[0].textContent;

//   // Count the number of squares with the computer's move ("O")
//   const computerMoveCount = squares.filter(
//     (square) => square.textContent === "O"
//   ).length;

//   // Assert that the user's move is "X"
//   expect(userMoveContent).toBe("X");

//   // Assert that the computer has made exactly one move
//   expect(computerMoveCount).toBe(1);
// });


import { render, screen, fireEvent } from "@testing-library/react";
import Game from "./Game";

test("renders the game board", () => {
  render(<Game />);
  const gameBoard = screen.getByTestId("game-board");
  expect(gameBoard).toBeInTheDocument();
});

test("changes difficulty when a new option is selected", () => {
  render(<Game />);
  const selectElement = screen.getByTestId(
    "difficulty-select"
  ) as HTMLSelectElement;
  fireEvent.change(selectElement, { target: { value: "hard" } });
  expect(selectElement.value).toBe("hard");
});
