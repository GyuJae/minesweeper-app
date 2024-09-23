import { beforeAll, describe, expect, render, screen, test, userEvent } from '@/libs/test';

import { MinesweeperBoardProvider } from '../context/minesweeper-board.provider';
import { MinesweeperGameConfigProvider } from '../context/minesweeper-game-config.provider';
import { DefaultBoard } from '../models/board/default-board';
import { GridCell } from '../models/cell/grid-cell';
import { GridCellCollection } from '../models/cell-collection/grid-cell-collection';
import { CellPosition } from '../models/cell-position/cell-position.abstract';
import { GridCellPosition } from '../models/cell-position/grid-cell-position';
import { CellState } from '../models/cell-state/cell-state.enum';
import { EmptyCellType } from '../models/cell-type/empty-cell-type';
import { MineCellType } from '../models/cell-type/mine-cell-type';
import { NumberCellType } from '../models/cell-type/number-cell-type';
import { GameLevel } from '../models/game-level/game-level.enum';
import Minesweeper from '../page';

const testHelper = {
  clickCell: async (position: CellPosition) => {
    await userEvent.click(
      screen.getByRole('button', {
        name: `cell-${position.toString()}`,
      }),
    );
  },
};

beforeAll(() => {});

describe('<Minesweeper />', () => {
  test('사용자가 지뢰가 아닌 모든 셀을 열면 게임에서 승리합니다. 승리 메시지가 출력됩니다.', async () => {
    // given
    const gameLevel = GameLevel.VERY_EASY;
    const defaultBoard = DefaultBoard.of(
      gameLevel,
      GridCellCollection.of(gameLevel, [
        [
          GridCell.of(CellState.CLOSED, NumberCellType.of(1), GridCellPosition.of(0, 0)),
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
    );

    render(
      <MinesweeperGameConfigProvider gameLevel={gameLevel}>
        <MinesweeperBoardProvider gameLevel={gameLevel} defaultBoard={defaultBoard}>
          <Minesweeper />
        </MinesweeperBoardProvider>
      </MinesweeperGameConfigProvider>,
    );

    await testHelper.clickCell(GridCellPosition.of(0, 0));
    await testHelper.clickCell(GridCellPosition.of(0, 3));
    await testHelper.clickCell(GridCellPosition.of(1, 0));
    await testHelper.clickCell(GridCellPosition.of(1, 1));
    await testHelper.clickCell(GridCellPosition.of(1, 2));
    await testHelper.clickCell(GridCellPosition.of(1, 3));
    await testHelper.clickCell(GridCellPosition.of(2, 0));
    await testHelper.clickCell(GridCellPosition.of(2, 1));
    await testHelper.clickCell(GridCellPosition.of(2, 2));
    await testHelper.clickCell(GridCellPosition.of(2, 3));
    await testHelper.clickCell(GridCellPosition.of(3, 0));
    await testHelper.clickCell(GridCellPosition.of(3, 2));
    await testHelper.clickCell(GridCellPosition.of(3, 3));

    // then
    expect(screen.getByText('🥳')).toBeDefined();
  });
});
