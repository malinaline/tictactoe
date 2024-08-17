// src/components/Square.tsx
import React from "react";
import "./Square.css"; // Importera CSS-filen

type SquareProps = {
  value: string;
  onClick: () => void;
};

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  let className = "square";
  if (value === "X") {
    className += " square-x";
  } else if (value === "O") {
    className += " square-o";
  }

  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
