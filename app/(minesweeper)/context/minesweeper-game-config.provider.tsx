import React, { createContext, ReactNode, useContext, useState } from 'react';

import { GameLevel } from '../models/game-level/game-level.enum';
import { GameStatus } from '../models/game-status/game-phase.enum';

interface MinesweeperGameConfigValue {
  gameLevel: GameLevel;
  setGameLevel: (_gameLevel: GameLevel) => void;
  gameStatus: GameStatus;
  setGameStatus: (_gameStatus: GameStatus) => void;
}

const MinesweeperGameConfig = createContext<MinesweeperGameConfigValue | undefined>(undefined);

export const MinesweeperGameConfigProvider = ({ children }: { children: ReactNode }) => {
  const [gameLevel, setGameLevel] = useState<GameLevel>(GameLevel.NORMAL);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.READY);

  const value: MinesweeperGameConfigValue = {
    gameLevel,
    setGameLevel,
    gameStatus,
    setGameStatus,
  };

  return <MinesweeperGameConfig.Provider value={value}>{children}</MinesweeperGameConfig.Provider>;
};

export const useMinesweeperGameConfig = () => {
  const context = useContext(MinesweeperGameConfig);
  if (!context) {
    throw new Error('useMinesweeperConfig는 MinesweeperConfigProvider 내부에서 사용해야 합니다.');
  }
  return context;
};
