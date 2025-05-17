import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useTimer } from '@/hooks/use-timer';

import { GameLevel } from '../domains/game-level/game-level.enum';
import { GameStatus } from '../domains/game-status/game-status.enum';

interface MinesweeperGameConfigValue {
  gameLevel: GameLevel;
  setGameLevel: (_gameLevel: GameLevel) => void;
  gameStatus: GameStatus;
  setGameStatus: (_gameStatus: GameStatus) => void;
  overSeconds: number;
}

const MinesweeperGameConfig = createContext<MinesweeperGameConfigValue | undefined>(undefined);

export const MinesweeperGameConfigProvider = ({
  children,
  gameLevel: defaultGameLevel,
}: {
  children: ReactNode;
  gameLevel?: GameLevel;
}) => {
  const [gameLevel, setGameLevel] = useState<GameLevel>(defaultGameLevel ?? GameLevel.NORMAL);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.READY);
  const timer = useTimer();

  useEffect(() => {
    gameStatus.timerExecute(timer);
  }, [gameStatus, timer]);

  const value: MinesweeperGameConfigValue = {
    gameLevel,
    setGameLevel,
    gameStatus,
    setGameStatus,
    overSeconds: timer.seconds,
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
