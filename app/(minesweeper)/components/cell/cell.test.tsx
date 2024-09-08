import { describe, expect, render, screen, test } from '@/libs/test';

import { Cell as CellModel } from '../../models/cell/cell.abstract';
import { GridCell } from '../../models/cell/grid-cell';
import { GridCellPosition } from '../../models/cell-position/grid-cell-position';
import { CellState } from '../../models/cell-state/cell-state.enum';
import { EmptyCellType } from '../../models/cell-type/empty-cell-type';
import Cell from '.';

describe('Cell 컴포넌트 테스트', () => {
  test('클릭 할 수 있는 셀을 렌더링 합니다.', () => {
    // given
    // when
    render(<Cell cell={GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(0, 0))} />);

    // then
    expect(screen.getByRole('button', { name: CellModel.name })).toBeDefined();
  });
});
