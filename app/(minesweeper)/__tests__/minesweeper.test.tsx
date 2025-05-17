import { afterEach, beforeAll, cleanup, describe, expect, render, screen, test, userEvent, vi } from '@/libs/test';

import { MinesweeperBoardProvider } from '../context/minesweeper-board.provider';
import { MinesweeperGameConfigProvider } from '../context/minesweeper-game-config.provider';
import { DefaultBoard } from '../domains/board/default-board';
import { GridCell } from '../domains/cell/grid-cell';
import { GridCellCollection } from '../domains/cell-collection/grid-cell-collection';
import { CellPosition } from '../domains/cell-position/cell-position.abstract';
import { GridCellPosition } from '../domains/cell-position/grid-cell-position';
import { CellState } from '../domains/cell-state/cell-state.enum';
import { EmptyCellType } from '../domains/cell-type/empty-cell-type';
import { MineCellType } from '../domains/cell-type/mine-cell-type';
import { NumberCellType } from '../domains/cell-type/number-cell-type';
import { GameLevel } from '../domains/game-level/game-level.enum';
import Minesweeper from '../page';

const testHelper = {
  EMPTY_CELL_TEXT: '',
  clickCell: async (position: CellPosition) => {
    await userEvent.click(
      screen.getByRole('button', {
        name: `cell-${position.toString()}`,
      }),
    );
  },
  findCell: (position: CellPosition) => {
    return screen.getByRole('button', {
      name: `cell-${position.toString()}`,
    });
  },
};

describe('<Minesweeper />', () => {
  beforeAll(() => {
    Object.defineProperty(global.HTMLMediaElement.prototype, 'play', {
      configurable: true,
      writable: true,
      value: vi.fn().mockResolvedValue(null),
    });
    Object.defineProperty(global.HTMLCanvasElement.prototype, 'getContext', {
      configurable: true,
      writable: true,
      value: vi.fn().mockResolvedValue(null),
    });
  });

  afterEach(() => {
    cleanup();
  });

  test.each([{ cellCollection: GridCellCollection, cell: GridCell, cellPosition: GridCellPosition }])(
    '사용자가 지뢰가 아닌 모든 셀을 열면 게임에서 승리합니다. 승리 메시지가 출력됩니다.',
    async ({ cell, cellPosition, cellCollection }) => {
      // given
      const gameLevel = GameLevel.VERY_EASY;
      const defaultBoard = DefaultBoard.of(
        gameLevel,
        cellCollection.of(gameLevel, [
          [
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(0, 0)),
            cell.of(CellState.CLOSED, MineCellType.of(), cellPosition.of(0, 1)),
            cell.of(CellState.CLOSED, MineCellType.of(), cellPosition.of(0, 2)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(0, 3)),
          ],
          [
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(1, 0)),
            cell.of(CellState.CLOSED, NumberCellType.of(2), cellPosition.of(1, 1)),
            cell.of(CellState.CLOSED, NumberCellType.of(2), cellPosition.of(1, 2)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(1, 3)),
          ],
          [
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(2, 0)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(2, 1)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(2, 2)),
            cell.of(CellState.CLOSED, EmptyCellType.of(), cellPosition.of(2, 3)),
          ],
          [
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(3, 0)),
            cell.of(CellState.CLOSED, MineCellType.of(), cellPosition.of(3, 1)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(3, 2)),
            cell.of(CellState.CLOSED, EmptyCellType.of(), cellPosition.of(3, 3)),
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

      // when
      await testHelper.clickCell(cellPosition.of(0, 0));
      await testHelper.clickCell(cellPosition.of(0, 3));
      await testHelper.clickCell(cellPosition.of(1, 0));
      await testHelper.clickCell(cellPosition.of(1, 1));
      await testHelper.clickCell(cellPosition.of(1, 2));
      await testHelper.clickCell(cellPosition.of(1, 3));
      await testHelper.clickCell(cellPosition.of(2, 0));
      await testHelper.clickCell(cellPosition.of(2, 1));
      await testHelper.clickCell(cellPosition.of(2, 2));
      await testHelper.clickCell(cellPosition.of(2, 3));
      await testHelper.clickCell(cellPosition.of(3, 0));
      await testHelper.clickCell(cellPosition.of(3, 2));
      await testHelper.clickCell(cellPosition.of(3, 3));

      // then
      expect(screen.getByText('🥳')).toBeDefined();
    },
  );

  test.each([{ cellCollection: GridCellCollection, cell: GridCell, cellPosition: GridCellPosition }])(
    '숫자 셸을 클릭하면 숫자가 표시된다.',
    async ({ cell, cellPosition, cellCollection }) => {
      // given
      const gameLevel = GameLevel.VERY_EASY;
      const defaultBoard = DefaultBoard.of(
        gameLevel,
        cellCollection.of(gameLevel, [
          [
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(0, 0)),
            cell.of(CellState.CLOSED, MineCellType.of(), cellPosition.of(0, 1)),
            cell.of(CellState.CLOSED, MineCellType.of(), cellPosition.of(0, 2)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(0, 3)),
          ],
          [
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(1, 0)),
            cell.of(CellState.CLOSED, NumberCellType.of(2), cellPosition.of(1, 1)),
            cell.of(CellState.CLOSED, NumberCellType.of(2), cellPosition.of(1, 2)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(1, 3)),
          ],
          [
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(2, 0)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(2, 1)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(2, 2)),
            cell.of(CellState.CLOSED, EmptyCellType.of(), cellPosition.of(2, 3)),
          ],
          [
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(3, 0)),
            cell.of(CellState.CLOSED, MineCellType.of(), cellPosition.of(3, 1)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(3, 2)),
            cell.of(CellState.CLOSED, EmptyCellType.of(), cellPosition.of(3, 3)),
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

      // when
      await testHelper.clickCell(cellPosition.of(0, 0));

      // then
      expect(testHelper.findCell(cellPosition.of(0, 0)).textContent).toBe('1');
    },
  );

  test.each([{ cellCollection: GridCellCollection, cell: GridCell, cellPosition: GridCellPosition }])(
    '빈 공간을 클릭하면 주변 숫자 셀이 모두 열린다.',
    async ({ cell, cellPosition, cellCollection }) => {
      // given
      const gameLevel = GameLevel.VERY_EASY;
      const defaultBoard = DefaultBoard.of(
        gameLevel,
        cellCollection.of(gameLevel, [
          [
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(0, 0)),
            cell.of(CellState.CLOSED, MineCellType.of(), cellPosition.of(0, 1)),
            cell.of(CellState.CLOSED, MineCellType.of(), cellPosition.of(0, 2)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(0, 3)),
          ],
          [
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(1, 0)),
            cell.of(CellState.CLOSED, NumberCellType.of(2), cellPosition.of(1, 1)),
            cell.of(CellState.CLOSED, NumberCellType.of(2), cellPosition.of(1, 2)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(1, 3)),
          ],
          [
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(2, 0)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(2, 1)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(2, 2)),
            cell.of(CellState.CLOSED, EmptyCellType.of(), cellPosition.of(2, 3)),
          ],
          [
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(3, 0)),
            cell.of(CellState.CLOSED, MineCellType.of(), cellPosition.of(3, 1)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(3, 2)),
            cell.of(CellState.CLOSED, EmptyCellType.of(), cellPosition.of(3, 3)),
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

      // when
      await testHelper.clickCell(cellPosition.of(2, 3));

      // then
      expect(testHelper.findCell(cellPosition.of(0, 0)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(0, 1)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(0, 2)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(0, 3)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);

      expect(testHelper.findCell(cellPosition.of(1, 0)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(1, 1)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(1, 2)).textContent).toBe('2');
      expect(testHelper.findCell(cellPosition.of(1, 3)).textContent).toBe('1');

      expect(testHelper.findCell(cellPosition.of(2, 0)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(2, 1)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(2, 2)).textContent).toBe('1');
      expect(testHelper.findCell(cellPosition.of(2, 3)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);

      expect(testHelper.findCell(cellPosition.of(3, 0)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(3, 1)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(3, 2)).textContent).toBe('1');
      expect(testHelper.findCell(cellPosition.of(3, 3)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
    },
  );

  test.each([{ cellCollection: GridCellCollection, cell: GridCell, cellPosition: GridCellPosition }])(
    '지뢰셸을 클릭하면 모든 지뢰 셸이 열리면서 게임이 종료된다.',
    async ({ cell, cellPosition, cellCollection }) => {
      // given
      const gameLevel = GameLevel.VERY_EASY;
      const defaultBoard = DefaultBoard.of(
        gameLevel,
        cellCollection.of(gameLevel, [
          [
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(0, 0)),
            cell.of(CellState.CLOSED, MineCellType.of(), cellPosition.of(0, 1)),
            cell.of(CellState.CLOSED, MineCellType.of(), cellPosition.of(0, 2)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(0, 3)),
          ],
          [
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(1, 0)),
            cell.of(CellState.CLOSED, NumberCellType.of(2), cellPosition.of(1, 1)),
            cell.of(CellState.CLOSED, NumberCellType.of(2), cellPosition.of(1, 2)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(1, 3)),
          ],
          [
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(2, 0)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(2, 1)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(2, 2)),
            cell.of(CellState.CLOSED, EmptyCellType.of(), cellPosition.of(2, 3)),
          ],
          [
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(3, 0)),
            cell.of(CellState.CLOSED, MineCellType.of(), cellPosition.of(3, 1)),
            cell.of(CellState.CLOSED, NumberCellType.of(1), cellPosition.of(3, 2)),
            cell.of(CellState.CLOSED, EmptyCellType.of(), cellPosition.of(3, 3)),
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

      // when
      await testHelper.clickCell(cellPosition.of(0, 1));

      // then
      expect(testHelper.findCell(cellPosition.of(0, 0)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(0, 1)).textContent).toBe('💣');
      expect(testHelper.findCell(cellPosition.of(0, 2)).textContent).toBe('💣');
      expect(testHelper.findCell(cellPosition.of(0, 3)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);

      expect(testHelper.findCell(cellPosition.of(1, 0)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(1, 1)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(1, 2)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(1, 3)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);

      expect(testHelper.findCell(cellPosition.of(2, 0)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(2, 1)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(2, 2)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(2, 3)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);

      expect(testHelper.findCell(cellPosition.of(3, 0)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(3, 1)).textContent).toBe('💣');
      expect(testHelper.findCell(cellPosition.of(3, 2)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
      expect(testHelper.findCell(cellPosition.of(3, 3)).textContent).toBe(testHelper.EMPTY_CELL_TEXT);
    },
  );
});
