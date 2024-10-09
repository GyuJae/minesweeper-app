import { FX } from '@/libs';

import { GameException } from '../../exceptions/game-exception';
import { Cell } from '../cell/cell.abstract';
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
    return this._cells.every((row) => row.every((cell) => !cell.isOpened()));
  }

  override hasUnopenedMines(): boolean {
    return this._cells.flat().some((cell) => cell.isMine() && cell.isClosed());
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

    let isFirstCellOpening = false;

    if (updatedCells.isAllClosed()) {
      isFirstCellOpening = true;
      updatedCells = updatedCells._clearFlags();
    }

    if (updatedCells._hasMineCell()) {
      return this._openCell(position)._copyWithFirstCellOpened(isFirstCellOpening);
    }

    if (isFirstCellOpening) {
      updatedCells = GridCellCollection._updateInitialMineCells(updatedCells, position);
    }

    return updatedCells._openCell(position)._copyWithFirstCellOpened(isFirstCellOpening);
  }
  private _isFlaggedCell(position: GridCellPosition): boolean {
    return this.findCellByPosition(position).isFlagged();
  }

  private _isOpenedCell(position: GridCellPosition): boolean {
    return this.findCellByPosition(position).isOpened();
  }

  private _clearFlags() {
    let copyCells = this._copy();

    for (const cell of copyCells) {
      if (cell.isFlagged()) {
        copyCells = copyCells.unFlag(cell.getPosition());
      }
    }

    return copyCells;
  }

  private _hasMineCell(): boolean {
    return this._some((cell) => cell.isMine());
  }

  private _some(predicate: (_cell: GridCell) => boolean): boolean {
    return this._cells.some((row) => row.some(predicate));
  }

  private static _updateInitialMineCells(cells: GridCellCollection, position: GridCellPosition): GridCellCollection {
    const updatedToMineCellCollection = cells._updatedMineCellsByPositions(
      GridCellPositionCollection.initialMinesOf(cells._gameLevel, position),
    );
    return GridCellCollection._updateAdjacentMineCount(updatedToMineCellCollection, cells._gameLevel);
  }

  override isOpenedCell(position: GridCellPosition): boolean {
    return this.findCellByPosition(position).isOpened();
  }

  override getUnOpenedMineCount(): number {
    return this._cells.flat().filter((cell) => cell.isMine() && (cell.isClosed() || cell.isFlagged())).length;
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

  override find(_predicate: (_cell: Cell) => boolean): Cell | undefined {
    return this._cells.flat().find(_predicate);
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

  private _updatedMineCellsByPositions(positions: GridCellPositionCollection): GridCellCollection {
    let updatedCells = this._copy();
    FX.pipe(
      positions,
      FX.map((position) => this.findCellByPosition(position)),
      FX.map((cell) => cell.updatedToMine()),
      FX.each((cell) => {
        updatedCells = GridCellCollection._updatedCellByPosition(updatedCells, cell.getPosition(), cell);
      }),
    );
    return updatedCells;
  }

  private _openCell(position: GridCellPosition): GridCellCollection {
    const cell = this.findCellByPosition(position);
    if (cell.isOpened()) return this;
    if (cell.isMine()) return this._updatedMineCellAllOpened();
    if (cell.isFlagged()) throw GameException.of('깃발이 꽂힌 셀은 열 수 없습니다.');

    const openedCell = cell.open();
    let updatedCollection = GridCellCollection._updatedCellByPosition(this, position, openedCell);

    if (openedCell.isNumber()) return updatedCollection;

    const adjacentPositions = cell.getPosition().getAdjacentPositions(this._gameLevel);

    for (const adjacentPosition of adjacentPositions) {
      const adjacentCell = this.findCellByPosition(adjacentPosition);
      if (adjacentCell.isMine()) continue;
      if (adjacentCell.isOpened()) continue;
      if (adjacentCell.isFlagged()) continue;

      updatedCollection = updatedCollection._openCell(adjacentPosition);
    }

    return updatedCollection;
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

  override *[Symbol.iterator](): Iterator<GridCell> {
    for (const row of this._cells) {
      for (const cell of row) {
        yield cell;
      }
    }
  }
}
