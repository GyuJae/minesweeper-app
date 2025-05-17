'use client';

import { ReactNode } from 'react';

import { MinesweeperBoardProvider } from './context/minesweeper-board.provider';
import { MinesweeperGameConfigProvider } from './context/minesweeper-game-config.provider';
import { GameLevel } from './domains/game-level/game-level.enum';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MinesweeperGameConfigProvider gameLevel={GameLevel.findDefaultLevel()}>
      <MinesweeperBoardProvider gameLevel={GameLevel.findDefaultLevel()}>{children}</MinesweeperBoardProvider>
    </MinesweeperGameConfigProvider>
  );
}
