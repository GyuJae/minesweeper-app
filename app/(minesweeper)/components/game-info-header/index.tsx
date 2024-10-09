import React from 'react';

import GameConfigDropdown from './game-config-dropdown';
import GameStatus from './game-status';
import GameTutorialDialog from './game-tutorial-dialog';

const GameInfoHeader = () => {
  return (
    <header className='flex w-full flex-col gap-4 py-4'>
      <article className='flex justify-between'>
        <GameConfigDropdown />
        <GameTutorialDialog />
      </article>
      <GameStatus />
    </header>
  );
};

export default GameInfoHeader;
