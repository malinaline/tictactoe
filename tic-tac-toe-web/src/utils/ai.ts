// src/utils/ai.ts

export const calculateWinner = (squares: string[]): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const element of lines) {
    const [a, b, c] = element;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // Check for a draw
  if (squares.every((square) => square !== "")) {
    return "Draw";
  }
  return null;
};

const minimax = (
  squares: string[],
  depth: number,
  isMaximizing: boolean
): number => {
  const winner = calculateWinner(squares);
  if (winner === "X") return -10 + depth;
  if (winner === "O") return 10 - depth;
  if (squares.every((square) => square !== "")) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === "") {
        squares[i] = "O";
        best = Math.max(best, minimax(squares, depth + 1, false));
        squares[i] = "";
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === "") {
        squares[i] = "X";
        best = Math.min(best, minimax(squares, depth + 1, true));
        squares[i] = "";
      }
    }
    return best;
  }
};

export const findBestMove = (squares: string[]): number => {
  let bestVal = -Infinity;
  let bestMove = -1;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === "") {
      squares[i] = "O";
      const moveVal = minimax(squares, 0, false);
      squares[i] = "";
      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }
  return bestMove;
};
