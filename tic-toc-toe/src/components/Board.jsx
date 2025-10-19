import Cell from './Cell';

export default function Board({ board, onCellClick, winningLine, disabled }) {
  const isWinningCell = (index) => {
    return winningLine?.includes(index) ?? false;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-10 gap-0.5 bg-gray-300 p-1 rounded-lg shadow-xl">
        {board.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            onClick={() => onCellClick(index)}
            isWinning={isWinningCell(index)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
