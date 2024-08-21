import React from "react";
import Square from "../Square/Square";
import "./Board.css";

type BoardProps = {
  squares: string[];
  onClick: (i: number) => void;
};

// Defining the Board component as a functional component
const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
  // Function to render a single square with a unique key
  const renderSquare = (i: number) => (
    <Square key={i} value={squares[i]} onClick={() => onClick(i)} />
  );

  // Rendering the board with three rows, each containing three squares
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

// Exporting the Board component as the default export
export default Board;

// // src/components/Board.tsx
// import React from "react";
// import Square from "./Square";
// import "./Board.css";

// type BoardProps = {
//   squares: string[];
//   onClick: (i: number) => void;
// };

// const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
//   const renderSquare = (i: number) => (
//     <Square value={squares[i]} onClick={() => onClick(i)} />
//   );

//   return (
//     <div>
//       <div className="board-row">
//         {renderSquare(0)}
//         {renderSquare(1)}
//         {renderSquare(2)}
//       </div>
//       <div className="board-row">
//         {renderSquare(3)}
//         {renderSquare(4)}
//         {renderSquare(5)}
//       </div>
//       <div className="board-row">
//         {renderSquare(6)}
//         {renderSquare(7)}
//         {renderSquare(8)}
//       </div>
//     </div>
//   );
// };

// export default Board;
