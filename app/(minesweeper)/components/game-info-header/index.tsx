import React from 'react';

import { useMinesweeperBoard } from '../../context/minesweeper-board.provider';
import { useMinesweeperGameConfig } from '../../context/minesweeper-game-config.provider';
import GameConfigDropdown from './game-config-dropdown';
import GameTutorialDialog from './game-tutorial-dialog';

const GameInfoHeader = () => {
  const gameConfigContext = useMinesweeperGameConfig();
  const boardContext = useMinesweeperBoard();

  return (
    <header className='flex w-full flex-col gap-4 py-4'>
      <article className='flex justify-between'>
        <GameConfigDropdown />
        <GameTutorialDialog />
      </article>
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
    </header>
  );
};

export default GameInfoHeader;
