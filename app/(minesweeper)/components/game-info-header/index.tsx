import { QuestionMarkIcon } from '@radix-ui/react-icons';
import React from 'react';

import { Button } from '@/components/ui/button';

import { useMinesweeperBoard } from '../../context/minesweeper-board.provider';
import { useMinesweeperGameConfig } from '../../context/minesweeper-game-config.provider';
import GameConfigDropdown from './game-config-dropdown';

const GameInfoHeader = () => {
  const gameConfigContext = useMinesweeperGameConfig();
  const boardContext = useMinesweeperBoard();

  return (
    <header className='flex w-full flex-col gap-4 py-4'>
      <article className='flex justify-between'>
        <GameConfigDropdown />
        <Button variant='outline' size='icon' className='size-10 rounded-full'>
          <QuestionMarkIcon className='size-4' />
        </Button>
      </article>
      <article className='flex items-center justify-between'>
        <section className='w-16 text-lg'>
          <p>⏰ {gameConfigContext.overSeconds}</p>
        </section>
        <section>
          <p className='text-4xl'>{gameConfigContext.gameStatus.getEmoji()}</p>
        </section>
        <section className='w-16 text-right text-lg'>
          <p>🚩 {boardContext.board.getRemainingFlagCount()}</p>
        </section>
      </article>
    </header>
  );
};

export default GameInfoHeader;
