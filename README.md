# HCMUS Web Advanced - Tic Tac Toe

Weekly Assignment for the HCMUS Web Advanced course, implementing a Tic Tac Toe game with enhanced features using React and Vite.
Developed by Tran Gia Khang - 22127181

## Live Demo

**[Play the game here](https://hcmus-web-advance-tic-toc-toe.vercel.app/)**

## Features

- **Interactive Gameplay**: Classic Tic Tac Toe game with X and O players
- **Move History**: Track all moves made during the game
- **Current Move Display**: Shows current move number instead of a button
- **Dynamic Board**: Board generated using loops instead of hardcoded squares
- **Sort Toggle**: Sort move history in ascending or descending order
- **Win Highlighting**: Highlights the three squares that caused a win
- **Draw Detection**: Displays a message when the game ends in a draw
- **Move Location**: Shows the location (row, col) for each move in history

## Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **ESLint** - Code linting
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/HCMUS-WebAdvance-TicTocToe.git
cd HCMUS-WebAdvance-TicTocToe/tic-toc-toe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
tic-toc-toe/
├── public/          # Static assets
├── src/             # Source files
│   ├── App.jsx      # Main application component
│   └── ...
├── index.html       # HTML entry point
├── vite.config.js   # Vite configuration
└── package.json     # Project dependencies
```

## Requirements Implemented

- ✅ Current move display showing "You are at move #..."
- ✅ Board generated using loops
- ✅ Toggle button for sorting moves in ascending/descending order
- ✅ Win highlighting and draw detection
- ✅ Move location display in (row, col) format
- ✅ Deployed to public host (Vercel)

## License

This project is created for educational purposes as part of the HCMUS Web Advanced course.
