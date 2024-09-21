import React, { createContext, ReactNode, useContext, useState } from 'react';

import { Board } from '../models/board/board.abstract';
import { DefaultBoard } from '../models/board/default-board';
import { CellPosition } from '../models/cell-position/cell-position.abstract';
import { GameLevel } from '../models/game-level/game-level.enum';

interface MinesweeperBoardValue {
  board: Board;
  resetByGameLevel: (_gameLevel: GameLevel) => Board;
  openCell: (_position: CellPosition) => Board;
  toggleFlag: (_position: CellPosition) => Board;
  changeAllMineCellsToFlowers: () => Board;
}

const MinesweeperBoard = createContext<MinesweeperBoardValue | undefined>(undefined);

const MinesweeperBoardProvider = ({ children, gameLevel }: { children: ReactNode; gameLevel: GameLevel }) => {
  const [board, setBoard] = useState<Board>(DefaultBoard.of(gameLevel));

  const openCell = (position: CellPosition) => {
    const newBoard = board.openCell(position);
    setBoard(newBoard);
    return newBoard;
  };

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

  const changeAllMineCellsToFlowers = () => {
    const newBoard = board.changeAllMineCellsToFlowers();
    setBoard(newBoard);
    return newBoard;
  };

  const value: MinesweeperBoardValue = {
    board,
    openCell,
    resetByGameLevel,
    toggleFlag,
    changeAllMineCellsToFlowers,
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
