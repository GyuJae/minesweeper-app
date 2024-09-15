'use client';

import Board from './components/board';
import { useMinesweeperGameConfig } from './context/minesweeper-game-config.provider';
import { DefaultBoard } from './models/board/default-board';

export default function Minesweeper() {
  const gameConfigContext = useMinesweeperGameConfig();

  return (
    <div className='flex h-screen items-center justify-center'>
      <Board defaultBoard={DefaultBoard.of(gameConfigContext.gameLevel)} />
    </div>
  );
}
