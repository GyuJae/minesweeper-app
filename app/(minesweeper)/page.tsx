'use client';

import Board from './components/board';
import { DefaultBoard } from './models/board/default-board';
import { GridCellCollection } from './models/cell-collection/grid-cell-collection';
import { GameLevel } from './models/game-level/game-level.enum';

export default function Minesweeper() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Board defaultBoard={DefaultBoard.of(GameLevel.VERY_EASY, GridCellCollection.of(GameLevel.VERY_EASY))} />
    </div>
  );
}
