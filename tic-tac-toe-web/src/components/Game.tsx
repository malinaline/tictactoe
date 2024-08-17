// src/components/Game.tsx
import React, { useState, useEffect } from "react";
import Board from "./Board";
import { calculateWinner, findBestMove } from "../utils/ai";
import "./Game.css";

const Game: React.FC = () => {
  const [history, setHistory] = useState<string[][]>([Array(9).fill("")]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

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

  useEffect(() => {
    if (!xIsNext && !winner) {
      const timer = setTimeout(() => {
        const currentCopy = [...current];
        const bestMove = findBestMove(currentCopy);
        if (bestMove !== -1) {
          currentCopy[bestMove] = "O";
          setHistory([...history, currentCopy]);
          setStepNumber(history.length);
          setXIsNext(true);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [xIsNext, winner, current, history]);

  const jumpToStart = () => {
    setStepNumber(0);
    setHistory([Array(9).fill("")]);
    setXIsNext(true);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>
          {/* Om spelet precis har börjat (inga drag har gjorts) */}
          {stepNumber === 0 && !winner
            ? "Du är X och du börjar!"
            : winner
            ? winner === "Draw"
              ? "😁 Hoppsan, det blev visst oavgjort!"
              : `🏆 Och vinnaren är : ${winner}`
            : `Nästa spelare: ${xIsNext ? "X" : "O"}`}
        </div>
        {/* Visar knappen endast om spelet är slut (vinst eller oavgjort) */}
        {winner && <button onClick={jumpToStart}>Spela igen</button>}
      </div>
    </div>
  );
};

export default Game;
