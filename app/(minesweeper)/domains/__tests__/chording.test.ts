import { describe, expect, test } from '@/libs/test';

import { DefaultBoard } from '../board/default-board';
import { GridCell } from '../cell/grid-cell';
import { GridCellCollection } from '../cell-collection/grid-cell-collection';
import { GridCellPosition } from '../cell-position/grid-cell-position';
import { CellState } from '../cell-state/cell-state.enum';
import { EmptyCellType } from '../cell-type/empty-cell-type';
import { MineCellType } from '../cell-type/mine-cell-type';
import { NumberCellType } from '../cell-type/number-cell-type';
import { GameLevel } from '../game-level/game-level.enum';

describe('지뢰찾기 코드(Chording) 규칙', () => {
  test('이미 열린 숫자 셀을 클릭하고 주변 깃발 수가 지뢰 수와 같으면, 주변 닫힌 셀들이 모두 열립니다.', () => {
    // given: 1이 적힌 셀 주변에 깃발이 하나 꽂혀 있고, 다른 셀들은 닫혀 있는 상황
    const gameLevel = GameLevel.VERY_EASY;
    const board = DefaultBoard.of(
      gameLevel,
      GridCellCollection.of(gameLevel, [
        [
          GridCell.of(CellState.OPENED, NumberCellType.of(1), GridCellPosition.of(0, 0)),
          GridCell.of(CellState.FLAGGED, MineCellType.of(), GridCellPosition.of(0, 1)),
          GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(0, 2)),
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
          GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(3, 1)),
          GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(3, 2)),
          GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(3, 3)),
        ],
      ]),
    );

    // when: (0, 0) 위치의 이미 열린 숫자 셀을 다시 클릭하면 (chording)
    const newBoard = board.openCell(GridCellPosition.of(0, 0));

    // then: 주변 셀인 (0, 1)은 깃발이므로 그대로, (1, 0)과 (1, 1)은 열려야 함
    expect(newBoard.findCellByPosition(GridCellPosition.of(0, 1)).isFlagged()).toBeTruthy();
    expect(newBoard.findCellByPosition(GridCellPosition.of(1, 0)).isOpened()).toBeTruthy();
    expect(newBoard.findCellByPosition(GridCellPosition.of(1, 1)).isOpened()).toBeTruthy();
  });

  test('코드(Chording) 실행 시 주변에 깃발이 잘못 꽂혀 있어 지뢰를 열게 되면 게임 오버가 됩니다.', () => {
    // given: 1이 적힌 셀 주변에 깃발이 하나 꽂혀 있지만, 실제 지뢰는 다른 곳에 있고 깃발 위치가 지뢰가 아닌 상황
    const gameLevel = GameLevel.VERY_EASY;
    const board = DefaultBoard.of(
      gameLevel,
      GridCellCollection.of(gameLevel, [
        [
          GridCell.of(CellState.OPENED, NumberCellType.of(1), GridCellPosition.of(0, 0)),
          GridCell.of(CellState.FLAGGED, EmptyCellType.of(), GridCellPosition.of(0, 1)), // 잘못된 깃발
          GridCell.of(CellState.CLOSED, MineCellType.of(), GridCellPosition.of(0, 2)),
          GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(0, 3)),
        ],
        [
          GridCell.of(CellState.CLOSED, MineCellType.of(), GridCellPosition.of(1, 0)), // 실제 지뢰
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
          GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(3, 1)),
          GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(3, 2)),
          GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(3, 3)),
        ],
      ]),
    );

    // when: (0, 0) 위치에서 코드 실행
    const newBoard = board.openCell(GridCellPosition.of(0, 0));

    // then: (1, 0) 위치의 지뢰가 열리면서 게임 오버가 되어야 함
    expect(newBoard.isGameOver()).toBeTruthy();
    expect(newBoard.findCellByPosition(GridCellPosition.of(1, 0)).isOpened()).toBeTruthy();
  });
});
