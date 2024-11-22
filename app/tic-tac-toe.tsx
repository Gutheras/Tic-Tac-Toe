'use client'

import React, { useState } from 'react'

type Player = 'X' | 'O' | null
type BoardState = Player[]

const calculateWinner = (squares: BoardState): Player => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

interface SquareProps {
  value: Player
  onClick: () => void
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => (
  <button
    className="w-20 h-20 border border-gray-400 text-4xl font-bold bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
    onClick={onClick}
  >
    {value}
  </button>
)

interface BoardProps {
  squares: BoardState
  onClick: (i: number) => void
}

const Board: React.FC<BoardProps> = ({ squares, onClick }) => (
  <div className="grid grid-cols-3 gap-1">
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
)

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState<boolean>(true)
  const winner = calculateWinner(board)

  const handleClick = (i: number) => {
    if (calculateWinner(board) || board[i]) {
      return
    }
    const newBoard = board.slice()
    newBoard[i] = xIsNext ? 'X' : 'O'
    setBoard(newBoard)
    setXIsNext(!xIsNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
  }

  const status = winner
    ? `Winner: ${winner}`
    : board.every(Boolean)
    ? "It's a draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-black">Tic-Tac-Toe</h1>
      <div className="mb-4 text-xl font-semibold text-black">{status}</div>
      <Board squares={board} onClick={handleClick} />
      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  )
}

export default TicTacToe