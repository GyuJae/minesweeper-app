import { render, test } from '@/libs/test';

import { MinesweeperGameConfigProvider } from '../context/minesweeper-game-config.provider';
import Minesweeper from '../page';

test('<Minesweeper />', () => {
  render(
    <MinesweeperGameConfigProvider>
      <Minesweeper />
    </MinesweeperGameConfigProvider>,
  );
});
