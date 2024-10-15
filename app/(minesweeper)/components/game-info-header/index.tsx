import React from 'react';

import GameConfigDropdown from './game-config-dropdown';
import GameStatusInfo from './game-status-info';
import GameTutorialDialog from './game-tutorial-dialog';

const GameInfoHeader = () => {
  return (
    <header className='flex w-full flex-col gap-4 py-4'>
      <article className='flex justify-between'>
        <GameConfigDropdown />
        <GameTutorialDialog />
      </article>
      <GameStatusInfo />
    </header>
  );
};

export default GameInfoHeader;
