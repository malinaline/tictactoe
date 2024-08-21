import React from "react";
import "./Square.css";

type SquareProps = {
  value: string;
  onClick: () => void;
};

// Function to determine the class name based on the value
const getClassName = (value: string): string => {
  let className = "square";
  if (value === "X") {
    className += " square-x";
  } else if (value === "O") {
    className += " square-o";
  }
  return className;
};

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button className={getClassName(value)} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
