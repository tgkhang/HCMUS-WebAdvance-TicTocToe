export default function Cell({ value, onClick, isWinning, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={`
        w-12 h-12 font-bold text-lg border-2 rounded transition-all
        ${
          isWinning
            ? 'bg-blue-500 text-white animate-pulse scale-110 shadow-lg shadow-blue-500/50'
            : 'bg-white border-gray-300 text-gray-900 hover:bg-blue-50 hover:scale-105'
        }
        disabled:cursor-not-allowed
        ${value === 'X' ? 'text-red-600' : value === 'O' ? 'text-blue-600' : ''}
      `}
      aria-label={value ? `Cell with ${value}` : 'Empty cell'}
    >
      {value}
    </button>
  );
}
