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
    // then
    expect(cell.getSnapshot()).toBeInstanceOf(ClosedCellSnapshot);
  });

  test('지뢰가 있는 열린 셀은 지뢰를 표시한다.', () => {
    // given
    const cell = GridCell.of(CellState.OPENED, MineCellType.of(), GridCellPosition.of(0, 0));

    // when
    // then
    expect(cell.getSnapshot()).toBeInstanceOf(OpenedMineCellSnapshot);
  });

  test('열린 셀은 주변 지뢰 개수를 표시한다.', () => {
    // given
    const cell = GridCell.of(CellState.OPENED, NumberCellType.of(1), GridCellPosition.of(0, 0));

    // when
    // then
    expect(cell.getSnapshot()).toBeInstanceOf(OpenedNumberCellSnapshot);
  });

  test('주변에 지뢰가 없는 열린 셀은 비어 있는 상태로 표시된다.', () => {
    // given
    const cell = GridCell.of(CellState.OPENED, EmptyCellType.of(), GridCellPosition.of(0, 0));

    // when
    // then
    expect(cell.getSnapshot()).toBeInstanceOf(OpenedEmptyCellSnapshot);
  });

  test('열린 셸은 다시 열 수 없습니다.', () => {
    // given
    const cell = GridCell.of(CellState.OPENED, EmptyCellType.of(), GridCellPosition.of(0, 0));

    // when
    // then
    expect(cell.isCellOpeningDisabled()).toBeTruthy();
  });

  test('깃발이 꽂힌 셀은 열 수 없습니다.', () => {
    // given
    const cell = GridCell.of(CellState.FLAGGED, EmptyCellType.of(), GridCellPosition.of(0, 0));

    // when
    // then
    expect(cell.isCellOpeningDisabled()).toBeTruthy();
  });

  test('닫힌 셸은 열 수 있습니다.', () => {
    // given
    const cell = GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(0, 0));

    // when
    // then
    expect(cell.isCellOpeningDisabled()).toBeFalsy();
  });

  test('지뢰가 있는 열린 셸은 열 수 없습니다.', () => {
    // given
    const cell = GridCell.of(CellState.OPENED, MineCellType.of(), GridCellPosition.of(0, 0));

    // when
    // then
    expect(cell.isCellOpeningDisabled()).toBeTruthy();
  });
});
