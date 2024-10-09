import { describe, expect, test } from 'vitest';

import { GridCellCollection } from '../cell-collection/grid-cell-collection';
import { GridCellPosition } from '../cell-position/grid-cell-position';
import { CellState } from '../cell-state/cell-state.enum';
import { EmptyCellType } from '../cell-type/empty-cell-type';
import { MineCellType } from '../cell-type/mine-cell-type';
import { GameLevel } from '../game-level/game-level.enum';
import { GridCell } from './grid-cell';

describe('GridCell', () => {
  test('주변 지뢰 갯수를 알 수 있습니다.', () => {
    // given
    const cells = GridCellCollection.of(GameLevel.VERY_EASY, [
      [
        GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(0, 0)),
        GridCell.of(CellState.CLOSED, MineCellType.of(), GridCellPosition.of(0, 1)),
        GridCell.of(CellState.CLOSED, MineCellType.of(), GridCellPosition.of(0, 2)),
        GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(0, 3)),
      ],
      [
        GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(1, 0)),
        GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(1, 1)),
        GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(1, 2)),
        GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(1, 3)),
      ],
      [
        GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(2, 0)),
        GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(2, 1)),
        GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(2, 2)),
        GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(2, 3)),
      ],
      [
        GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(3, 0)),
        GridCell.of(CellState.CLOSED, MineCellType.of(), GridCellPosition.of(3, 1)),
        GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(3, 2)),
        GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(3, 3)),
      ],
    ]);

    // when then
    expect(cells.findCellByPosition(GridCellPosition.of(0, 0)).getAdjacentMineCount(cells, GameLevel.VERY_EASY)).toBe(
      1,
    );
    expect(cells.findCellByPosition(GridCellPosition.of(0, 1)).getAdjacentMineCount(cells, GameLevel.VERY_EASY)).toBe(
      1,
    );
    expect(cells.findCellByPosition(GridCellPosition.of(0, 2)).getAdjacentMineCount(cells, GameLevel.VERY_EASY)).toBe(
      1,
    );
    expect(cells.findCellByPosition(GridCellPosition.of(0, 3)).getAdjacentMineCount(cells, GameLevel.VERY_EASY)).toBe(
      1,
    );
    expect(cells.findCellByPosition(GridCellPosition.of(1, 0)).getAdjacentMineCount(cells, GameLevel.VERY_EASY)).toBe(
      1,
    );
    expect(cells.findCellByPosition(GridCellPosition.of(1, 1)).getAdjacentMineCount(cells, GameLevel.VERY_EASY)).toBe(
      2,
    );
    expect(cells.findCellByPosition(GridCellPosition.of(1, 2)).getAdjacentMineCount(cells, GameLevel.VERY_EASY)).toBe(
      2,
    );
    expect(cells.findCellByPosition(GridCellPosition.of(1, 3)).getAdjacentMineCount(cells, GameLevel.VERY_EASY)).toBe(
      1,
    );
    expect(cells.findCellByPosition(GridCellPosition.of(2, 0)).getAdjacentMineCount(cells, GameLevel.VERY_EASY)).toBe(
      1,
    );
    expect(cells.findCellByPosition(GridCellPosition.of(2, 1)).getAdjacentMineCount(cells, GameLevel.VERY_EASY)).toBe(
      1,
    );
    expect(cells.findCellByPosition(GridCellPosition.of(2, 2)).getAdjacentMineCount(cells, GameLevel.VERY_EASY)).toBe(
      1,
    );
    expect(cells.findCellByPosition(GridCellPosition.of(2, 3)).getAdjacentMineCount(cells, GameLevel.VERY_EASY)).toBe(
      0,
    );
    expect(cells.findCellByPosition(GridCellPosition.of(3, 0)).getAdjacentMineCount(cells, GameLevel.VERY_EASY)).toBe(
      1,
    );
    expect(cells.findCellByPosition(GridCellPosition.of(3, 1)).getAdjacentMineCount(cells, GameLevel.VERY_EASY)).toBe(
      0,
    );
    expect(cells.findCellByPosition(GridCellPosition.of(3, 2)).getAdjacentMineCount(cells, GameLevel.VERY_EASY)).toBe(
      1,
    );
    expect(cells.findCellByPosition(GridCellPosition.of(3, 3)).getAdjacentMineCount(cells, GameLevel.VERY_EASY)).toBe(
      0,
    );
  });
});
