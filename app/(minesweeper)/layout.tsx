'use client';

import { ReactNode } from 'react';

import { MinesweeperGameConfigProvider } from './context/minesweeper-game-config.provider';

export default function Layout({ children }: { children: ReactNode }) {
  return <MinesweeperGameConfigProvider>{children}</MinesweeperGameConfigProvider>;
}
