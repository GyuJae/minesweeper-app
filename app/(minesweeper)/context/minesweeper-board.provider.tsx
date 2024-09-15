import React, { createContext, ReactNode, useContext, useState } from 'react';

import { Board } from '../models/board/board.abstract';
import { DefaultBoard } from '../models/board/default-board';
import { CellPosition } from '../models/cell-position/cell-position.abstract';
import { GameLevel } from '../models/game-level/game-level.enum';

interface MinesweeperBoardValue {
  board: Board;
  resetByGameLevel: (_gameLevel: GameLevel) => void;
  openCell: (_position: CellPosition) => void;
}

const MinesweeperBoard = createContext<MinesweeperBoardValue | undefined>(undefined);

const MinesweeperBoardProvider = ({ children, gameLevel }: { children: ReactNode; gameLevel: GameLevel }) => {
  const [board, setBoard] = useState<Board>(DefaultBoard.of(gameLevel));

  const openCell = (position: CellPosition) => {
    const newBoard = board.openCell(position);
    setBoard(newBoard);
  };

  const resetByGameLevel = (level: GameLevel) => {
    setBoard(DefaultBoard.of(level));
  };

  const value: MinesweeperBoardValue = {
    board,
    openCell,
    resetByGameLevel,
  };

  return <MinesweeperBoard.Provider value={value}>{children}</MinesweeperBoard.Provider>;
};

const useMinesweeperBoard = () => {
  const context = useContext(MinesweeperBoard);
  if (!context) {
    throw new Error('useMinesweeperBoard는 MinesweeperBoardProvider 내부에서 사용해야 합니다.');
  }
  return context;
};

export { MinesweeperBoardProvider, useMinesweeperBoard };
