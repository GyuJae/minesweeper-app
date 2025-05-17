import { FX } from '@/libs';

import { GameException } from '../../exceptions/game-exception';
import { GridCell } from '../cell/grid-cell';
import { GridCellPosition } from '../cell-position/grid-cell-position';
import { GridCellPositionCollection } from '../cell-position-collection/grid-cell-position-collection';
import { CellState } from '../cell-state/cell-state.enum';
import { EmptyCellType } from '../cell-type/empty-cell-type';
import { NumberCellType } from '../cell-type/number-cell-type';
import { GameLevel } from '../game-level/game-level.enum';
import { CellCollection } from './cell-collections.abstract';

export class GridCellCollection extends CellCollection {
  private constructor(
    private readonly _gameLevel: GameLevel,
    private readonly _cells: Array<Array<GridCell>>,
    private readonly _firstCellOpened: boolean = false,
  ) {
    super();
  }

  static of(
    gameLevel: GameLevel,
    cells: GridCell[][] = Array.from({ length: gameLevel.getRowSize() }, (_, row) =>
      Array.from({ length: gameLevel.getColumnSize() }, (_, col) =>
        GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(row, col)),
      ),
    ),
    firstCellOpened: boolean = false,
  ): GridCellCollection {
    return new GridCellCollection(gameLevel, cells, firstCellOpened);
  }

  override getRows(): GridCell[][] {
    return this._cells;
  }

  override isAllClosed(): boolean {
    return FX.pipe(
      this as GridCellCollection,
      FX.every((cell) => !cell.isOpened()),
    );
  }

  override hasUnopenedMines(): boolean {
    return FX.pipe(
      this as GridCellCollection,
      FX.some((cell) => cell.isMine() && cell.isClosed()),
    );
  }

  override changeAllMineCellsToFlowers(): GridCellCollection {
    return FX.pipe(
      this as GridCellCollection,
      FX.map((cell) => {
        if (cell.isMine()) return cell.markAsFlower();
        return cell;
      }),
      GridCellCollection._toGridCells,
      (cells) => GridCellCollection.of(this._gameLevel, cells, this._firstCellOpened),
    );
  }

  override openCell(position: GridCellPosition): GridCellCollection {
    let updatedCells = this._copy();

    if (updatedCells._isFlaggedCell(position)) {
      throw GameException.of('깃발이 꽂힌 셀을 열 수 없습니다.');
    }

    if (updatedCells._isOpenedCell(position)) {
      throw GameException.of('열려 있는 셀을 다시 열 수 없습니다.');
    }

    if (updatedCells._isMineCell(position)) {
      return updatedCells._updatedMineCellAllOpened();
    }

    let isFirstCellOpening = false;

    if (updatedCells.isAllClosed()) {
      isFirstCellOpening = true;
      updatedCells = updatedCells._clearFlags();
    }

    if (updatedCells._hasMineCell()) {
      return this._updateToOpenCellByPosition(position)._copyWithFirstCellOpened(isFirstCellOpening);
    }

    if (isFirstCellOpening) {
      updatedCells = GridCellCollection._updateInitialMineCells(updatedCells, position);
    }

    return updatedCells._updateToOpenCellByPosition(position)._copyWithFirstCellOpened(isFirstCellOpening);
  }

  private _isMineCell(position: GridCellPosition) {
    return this.findCellByPosition(position).isMine();
  }

  private _isFlaggedCell(position: GridCellPosition): boolean {
    return this.findCellByPosition(position).isFlagged();
  }

  private _isOpenedCell(position: GridCellPosition): boolean {
    return this.findCellByPosition(position).isOpened();
  }

  private _clearFlags() {
    return FX.pipe(
      this as GridCellCollection,
      FX.map((cell) => (cell.isFlagged() ? cell.unFlag() : cell)),
      GridCellCollection._toGridCells,
      (cells) => GridCellCollection.of(this._gameLevel, cells, this._firstCellOpened),
    );
  }

  private _hasMineCell(): boolean {
    return FX.pipe(
      this as GridCellCollection,
      FX.some((cell) => cell.isMine()),
    );
  }

  private static _updateInitialMineCells(cells: GridCellCollection, position: GridCellPosition): GridCellCollection {
    let copyCells = cells._copy();
    return FX.pipe(
      GridCellPositionCollection.initialMinesOf(copyCells._gameLevel, position),
      FX.map((position) => copyCells.findCellByPosition(position)),
      FX.map((cell) => cell.updatedToMine()),
      FX.each((cell) => {
        copyCells = GridCellCollection._updatedCellByPosition(copyCells, cell.getPosition(), cell);
      }),
      () => GridCellCollection._updateAdjacentMineCount(copyCells, copyCells._gameLevel),
    );
  }

  override isOpenedCell(position: GridCellPosition): boolean {
    return this.findCellByPosition(position).isOpened();
  }

  override getRowSize(): number {
    return this._gameLevel.getRowSize();
  }

  override getColumnSize(): number {
    return this._gameLevel.getColumnSize();
  }

  override findCellByPosition(position: GridCellPosition): GridCell {
    return this._cells[position.getRow()][position.getColumn()];
  }

  override hasOpenedMineCell(): boolean {
    return this._cells.flat().some((cell) => cell.isMine() && cell.isOpened());
  }

  override flag(position: GridCellPosition): GridCellCollection {
    const cell = this.findCellByPosition(position);
    if (cell.isOpened()) throw GameException.of('열려 있는 셀에 깃발을 꽂을 수 없습니다.');

    const updatedCell = cell.flag();
    return GridCellCollection._updatedCellByPosition(this, position, updatedCell);
  }

  override unFlag(position: GridCellPosition): GridCellCollection {
    const cell = this.findCellByPosition(position);
    if (!cell.isFlagged()) throw GameException.of('깃발이 꽂힌 셀이 아닙니다.');

    return GridCellCollection._updatedCellByPosition(this, position, cell.unFlag());
  }

  override isAllSafeCellsOpened(): boolean {
    return FX.pipe(
      this as GridCellCollection,
      FX.filter((cell) => cell.isSafeCell()),
      FX.every((cell) => cell.isOpened()),
    );
  }

  override getFlagCount(): number {
    return FX.pipe(
      this as GridCellCollection,
      FX.filter((cell) => cell.isFlagged()),
      FX.size,
    );
  }

  override isFirstOpenedCell(): boolean {
    return this._firstCellOpened;
  }

  private static _updateAdjacentMineCount(cells: GridCellCollection, gameLevel: GameLevel): GridCellCollection {
    return FX.pipe(
      cells as GridCellCollection,
      FX.map((cell: GridCell) =>
        cell.isMine() ? cell : GridCellCollection._getUpdatedCellIfNumberCell(cell, cells, gameLevel),
      ),
      GridCellCollection._toGridCells,
      (updatedCells) => GridCellCollection.of(cells._gameLevel, updatedCells, cells._firstCellOpened),
    );
  }

  private static _getUpdatedCellIfNumberCell(
    cell: GridCell,
    cells: GridCellCollection,
    gameLevel: GameLevel,
  ): GridCell {
    const adjacentMineCount = cell.getAdjacentMineCount(cells, gameLevel);
    return adjacentMineCount > 0
      ? GridCell.of(cell.getState(), NumberCellType.of(adjacentMineCount), cell.getPosition())
      : cell;
  }

  private static _updatedCellByPosition(
    cells: GridCellCollection,
    position: GridCellPosition,
    newCell: GridCell,
  ): GridCellCollection {
    return FX.pipe(
      cells,
      FX.map((cell) => (cell.getPosition().equals(position) ? newCell : cell)),
      GridCellCollection._toGridCells,
      (updatedCells) => GridCellCollection.of(cells._gameLevel, updatedCells, cells._firstCellOpened),
    );
  }

  private _getAdjacentPositionsByCell(cell: GridCell): GridCellPositionCollection {
    return cell.getPosition().getAdjacentPositions(this._gameLevel);
  }

  private _getAdjacentEnabledClickPositionsByCell(cell: GridCell): GridCellPositionCollection {
    return FX.pipe(
      this._getAdjacentPositionsByCell(cell),
      FX.map((position) => this.findCellByPosition(position)),
      FX.reject((cell) => cell.disabledOpening()),
      FX.map((cell) => cell.getPosition()),
      GridCellPositionCollection.of,
    );
  }

  private _updateToOpenCellByPosition(position: GridCellPosition): GridCellCollection {
    const cell = this.findCellByPosition(position);

    return FX.pipe(
      cell,
      (firstOpenedCell) => {
        if (cell.isNumber()) return GridCellPositionCollection.emptyOf();
        return this._getAdjacentEnabledClickPositionsByCell(firstOpenedCell);
      },
      (positions) =>
        FX.reduce(
          (accumulator, position) => {
            return accumulator._updateToOpenCellByPosition(position);
          },
          GridCellCollection._updatedCellByPosition(this, position, cell.open()),
          positions,
        ),
    );
  }

  private _updatedMineCellAllOpened(): GridCellCollection {
    return FX.pipe(
      this as GridCellCollection,
      FX.map((cell) => {
        if (cell.isMine()) return cell.open();
        return cell;
      }),
      GridCellCollection._toGridCells,
      (cells) => GridCellCollection.of(this._gameLevel, cells, this._firstCellOpened),
    );
  }

  private static _toGridCells(cells: IterableIterator<GridCell>): GridCell[][] {
    const gridCells: GridCell[][] = [];
    for (const cell of cells) {
      if (gridCells[cell.getPosition().getRow()] === undefined) {
        gridCells[cell.getPosition().getRow()] = [];
      }
      gridCells[cell.getPosition().getRow()][cell.getPosition().getColumn()] = cell;
    }
    return gridCells;
  }

  private _copyWithFirstCellOpened(firstCellOpened: boolean): GridCellCollection {
    return new GridCellCollection(this._gameLevel, this._cells, firstCellOpened);
  }

  private _copy(): GridCellCollection {
    return new GridCellCollection(this._gameLevel, this._cells, this._firstCellOpened);
  }

  *[Symbol.iterator](): Iterator<GridCell> {
    for (const row of this._cells) {
      for (const cell of row) {
        yield cell;
      }
    }
  }
}
