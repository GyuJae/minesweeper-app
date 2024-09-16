import { describe, expect, test } from 'vitest';

import { GridCell } from '../cell/grid-cell';
import { GridCellPosition } from '../cell-position/grid-cell-position';
import { ClosedCellSnapshot } from '../cell-snapshot/closed-cell-snapshot';
import { OpenedEmptyCellSnapshot } from '../cell-snapshot/opened-empty-cell-snapshot';
import { OpenedMineCellSnapshot } from '../cell-snapshot/opened-mine-cell-snapshot';
import { OpenedNumberCellSnapshot } from '../cell-snapshot/opened-number-cell-snapshot';
import { CellState } from '../cell-state/cell-state.enum';
import { EmptyCellType } from '../cell-type/empty-cell-type';
import { MineCellType } from '../cell-type/mine-cell-type';
import { NumberCellType } from '../cell-type/number-cell-type';

describe('Cell - CellSnapshot', () => {
  test('닫힌 셀은 닫힌 상태로 표시된다.', () => {
    // given
    const cell = GridCell.of(CellState.CLOSED, MineCellType.of(), GridCellPosition.of(0, 0));

    // when
    const snapshot = cell.getSnapshot();

    // then
    expect(snapshot).toBeInstanceOf(ClosedCellSnapshot);
  });

  test('지뢰가 있는 열린 셀은 지뢰를 표시한다.', () => {
    // given
    const cell = GridCell.of(CellState.OPENED, MineCellType.of(), GridCellPosition.of(0, 0));

    // when
    const snapshot = cell.getSnapshot();

    // then
    expect(snapshot).toBeInstanceOf(OpenedMineCellSnapshot);
  });

  test('열린 셀은 주변 지뢰 개수를 표시한다.', () => {
    // given
    const cell = GridCell.of(CellState.OPENED, NumberCellType.of(1), GridCellPosition.of(0, 0));

    // when
    const snapshot = cell.getSnapshot();

    // then
    expect(snapshot).toBeInstanceOf(OpenedNumberCellSnapshot);
  });

  test('주변에 지뢰가 없는 열린 셀은 비어 있는 상태로 표시된다.', () => {
    // given
    const cell = GridCell.of(CellState.OPENED, EmptyCellType.of(), GridCellPosition.of(0, 0));

    // when
    const snapshot = cell.getSnapshot();

    // then
    expect(snapshot).toBeInstanceOf(OpenedEmptyCellSnapshot);
  });
});
