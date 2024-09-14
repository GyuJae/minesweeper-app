'use client';

import Board from './components/board';
import { DefaultBoard } from './models/board/default-board';
import { GridCell } from './models/cell/grid-cell';
import { GridCellCollection } from './models/cell-collection/grid-cell-collection';
import { GridCellPosition } from './models/cell-position/grid-cell-position';
import { CellState } from './models/cell-state/cell-state.enum';
import { EmptyCellType } from './models/cell-type/empty-cell-type';
import { MineCellType } from './models/cell-type/mine-cell-type';
import { NumberCellType } from './models/cell-type/number-cell-type';
import { GameLevel } from './models/game-level/game-level.enum';

export default function Minesweeper() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Board
        defaultBoard={DefaultBoard.of(
          GameLevel.VERY_EASY,
          GridCellCollection.of(GameLevel.VERY_EASY, [
            [
              GridCell.of(CellState.OPENED, NumberCellType.of(1), GridCellPosition.of(0, 0)),
              GridCell.of(CellState.CLOSED, MineCellType.of(), GridCellPosition.of(0, 1)),
              GridCell.of(CellState.CLOSED, MineCellType.of(), GridCellPosition.of(0, 2)),
              GridCell.of(CellState.CLOSED, NumberCellType.of(1), GridCellPosition.of(0, 3)),
            ],
            [
              GridCell.of(CellState.CLOSED, NumberCellType.of(1), GridCellPosition.of(1, 0)),
              GridCell.of(CellState.CLOSED, NumberCellType.of(2), GridCellPosition.of(1, 1)),
              GridCell.of(CellState.CLOSED, NumberCellType.of(2), GridCellPosition.of(1, 2)),
              GridCell.of(CellState.CLOSED, NumberCellType.of(1), GridCellPosition.of(1, 3)),
            ],
            [
              GridCell.of(CellState.CLOSED, NumberCellType.of(1), GridCellPosition.of(2, 0)),
              GridCell.of(CellState.CLOSED, NumberCellType.of(1), GridCellPosition.of(2, 1)),
              GridCell.of(CellState.CLOSED, NumberCellType.of(1), GridCellPosition.of(2, 2)),
              GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(2, 3)),
            ],
            [
              GridCell.of(CellState.CLOSED, NumberCellType.of(1), GridCellPosition.of(3, 0)),
              GridCell.of(CellState.CLOSED, MineCellType.of(), GridCellPosition.of(3, 1)),
              GridCell.of(CellState.CLOSED, NumberCellType.of(1), GridCellPosition.of(3, 2)),
              GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(3, 3)),
            ],
          ]),
        )}
      />
    </div>
  );
}
