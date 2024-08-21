import React, { useState, useEffect } from "react";
import Board from "../Board/Board";
import {
  calculateWinner,
  findBestMove,
  findRandomMove,
  findMediumMove,
} from "../../utils/ai";
import "./Game.css";

const Game: React.FC = () => {
  const [history, setHistory] = useState<string[][]>([Array(9).fill("")]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );

  const current = history[stepNumber];
  const winner = calculateWinner(current);

  const handleClick = (i: number) => {
    if (!xIsNext || winner || current[i]) return;

    const historyCopy = history.slice(0, stepNumber + 1);
    const currentCopy = [...historyCopy[historyCopy.length - 1]];

    currentCopy[i] = "X";
    setHistory([...historyCopy, currentCopy]);
    setStepNumber(historyCopy.length);
    setXIsNext(false);
  };

  const getBestMove = (board: string[]): number => {
    switch (difficulty) {
      case "easy":
        return findRandomMove(board);
      case "medium":
        return findMediumMove(board);
      case "hard":
        return findBestMove(board);
      default:
        return -1;
    }
  };

  useEffect(() => {
    if (!xIsNext && !winner) {
      const timer = setTimeout(() => {
        const currentCopy = [...current];
        const bestMove = getBestMove(currentCopy);

        if (bestMove !== -1) {
          currentCopy[bestMove] = "O";
          setHistory([...history, currentCopy]);
          setStepNumber(history.length);
          setXIsNext(true);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [xIsNext, winner, current, history, difficulty]);

  const jumpToStart = () => {
    setStepNumber(0);
    setHistory([Array(9).fill("")]);
    setXIsNext(true);
  };

  const renderStatusMessage = () => {
    if (stepNumber === 0 && !winner) {
      return "Du är X och du börjar!";
    }
    if (winner) {
      return winner === "Draw"
        ? "Hoppsan, det blev visst oavgjort!"
        : `Och vinnaren är 🥁: ${winner}`;
    }
    return `Nästa spelare: ${xIsNext ? "X" : "O"}`;
  };

  return (
    <div className="game" data-testid="game">
      <div className="game-board" data-testid="game-board">
        <Board squares={current} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info" data-testid="game-info">
        <div>{renderStatusMessage()}</div>
        {winner && (
          <button data-testid="reset-button" onClick={jumpToStart}>
            Spela igen
          </button>
        )}
        <div>
          <label className="dropdown-label" htmlFor="difficulty">Svårighetsgrad: </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value as "easy" | "medium" | "hard")
            }
            data-testid="difficulty-select"
          >
            <option value="easy">Enkel</option>
            <option value="medium">Medel</option>
            <option value="hard">Svår</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Game;
