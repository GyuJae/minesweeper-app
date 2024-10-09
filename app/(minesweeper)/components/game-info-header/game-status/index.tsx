import React from 'react';

import { useMinesweeperBoard } from '@/app/(minesweeper)/context/minesweeper-board.provider';
import { useMinesweeperGameConfig } from '@/app/(minesweeper)/context/minesweeper-game-config.provider';

const GameStatus = () => {
  const gameConfigContext = useMinesweeperGameConfig();
  const boardContext = useMinesweeperBoard();

  return (
    <article className='flex items-center justify-between'>
      <section className='w-20 text-lg'>
        <p>⏰ {gameConfigContext.overSeconds}</p>
      </section>
      <section>
        <p className='text-4xl'>{gameConfigContext.gameStatus.getEmoji()}</p>
      </section>
      <section className='w-20 text-right text-lg'>
        <p>🚩 {boardContext.board.getRemainingFlagCount()}</p>
      </section>
    </article>
  );
};

export default GameStatus;
