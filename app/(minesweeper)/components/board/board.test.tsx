import { describe, expect, render, screen, test } from '@/libs/test';

import { DefaultBoard } from '../../models/board/default-board';
import { Cell as CellModel } from '../../models/cell/cell.abstract';
import { GridCellCollection } from '../../models/cell-collection/grid-cell-collection';
import { GameLevel } from '../../models/game-level/game-level.enum';
import Board from '.';

describe('Board Component', () => {
  test('난이도에 맞는 보드를 생성할 수 있습니다.', () => {
    // given
    // when
    render(
      <Board board={DefaultBoard.of(GameLevel.EASY, GridCellCollection.of(GameLevel.EASY))} onClickCell={() => {}} />,
    );

    // then
    const cells = screen.getAllByRole('button', {
      name: CellModel.name,
    });
    expect(cells).toHaveLength(GameLevel.EASY.getRowSize() * GameLevel.EASY.getColumnSize());
  });
});
