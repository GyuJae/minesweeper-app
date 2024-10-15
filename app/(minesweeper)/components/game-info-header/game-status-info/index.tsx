import React from 'react';

import { useMinesweeperBoard } from '@/app/(minesweeper)/context/minesweeper-board.provider';
import { useMinesweeperGameConfig } from '@/app/(minesweeper)/context/minesweeper-game-config.provider';
import { GameStatus } from '@/app/(minesweeper)/models/game-status/game-status.enum';

const GameStatusInfo = () => {
  const gameConfigContext = useMinesweeperGameConfig();
  const boardContext = useMinesweeperBoard();

  const onResetGame = () => {
    boardContext.resetByGameLevel(gameConfigContext.gameLevel);
    gameConfigContext.setGameStatus(GameStatus.READY);
  };

  return (
    <article className='flex items-center justify-between'>
      <section className='w-20 text-lg'>
        <p>⏰ {gameConfigContext.overSeconds}</p>
      </section>
      <section>
        <button type='button' onClick={onResetGame}>
          <p className='text-4xl'>{gameConfigContext.gameStatus.getEmoji()}</p>
        </button>
      </section>
      <section className='w-20 text-right text-lg'>
        <p>🚩 {boardContext.board.getRemainingFlagCount()}</p>
      </section>
    </article>
  );
};

export default GameStatusInfo;
