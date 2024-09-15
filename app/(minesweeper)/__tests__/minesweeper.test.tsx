import { render, test } from '@/libs/test';

import { MinesweeperBoardProvider } from '../context/minesweeper-board.provider';
import { MinesweeperGameConfigProvider } from '../context/minesweeper-game-config.provider';
import { GameLevel } from '../models/game-level/game-level.enum';
import Minesweeper from '../page';

test('<Minesweeper />', () => {
  render(
    <MinesweeperGameConfigProvider gameLevel={GameLevel.findDefaultLevel()}>
      <MinesweeperBoardProvider gameLevel={GameLevel.findDefaultLevel()}>
        <Minesweeper />
      </MinesweeperBoardProvider>
    </MinesweeperGameConfigProvider>,
  );
});
