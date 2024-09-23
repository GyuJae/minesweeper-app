import React, { createContext, ReactNode, useContext, useState } from 'react';

import { Board } from '../models/board/board.abstract';
import { DefaultBoard } from '../models/board/default-board';
import { CellPosition } from '../models/cell-position/cell-position.abstract';
import { GameLevel } from '../models/game-level/game-level.enum';

interface MinesweeperBoardValue {
  board: Board;
  setBoard: (_board: Board) => void;
  resetByGameLevel: (_gameLevel: GameLevel) => Board;
  toggleFlag: (_position: CellPosition) => Board;
}

const MinesweeperBoard = createContext<MinesweeperBoardValue | undefined>(undefined);

interface ProviderProperties {
  children: ReactNode;
  gameLevel: GameLevel;
  defaultBoard?: Board;
}

const MinesweeperBoardProvider = ({ children, gameLevel, defaultBoard }: ProviderProperties) => {
  const [board, setBoard] = useState<Board>(defaultBoard ?? DefaultBoard.of(gameLevel));

  const resetByGameLevel = (level: GameLevel): Board => {
    const newBoard = DefaultBoard.of(level);
    setBoard(newBoard);
    return newBoard;
  };

  const toggleFlag = (position: CellPosition) => {
    const newBoard = board.toggleFlag(position);
    setBoard(newBoard);
    return newBoard;
  };

  const value: MinesweeperBoardValue = {
    board,
    setBoard,
    resetByGameLevel,
    toggleFlag,
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
