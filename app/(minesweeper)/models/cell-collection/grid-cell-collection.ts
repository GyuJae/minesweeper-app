import { GameException } from '../../exceptions/game-exception';
import { Cell } from '../cell/cell.abstract';
import { GridCell } from '../cell/grid-cell';
import { GridCellPosition } from '../cell-position/grid-cell-position';
import { CellPositionCollection } from '../cell-position-collection/cell-position-collection.abstract';
import { GridCellPositionCollection } from '../cell-position-collection/grid-cell-position-collection';
import { CellState } from '../cell-state/cell-state.enum';
import { EmptyCellType } from '../cell-type/empty-cell-type';
import { NumberCellType } from '../cell-type/number-cell-type';
import { GameLevel } from '../game-level/game-level.enum';
import { CellCollection } from './cell-collections.abstract';

export class GridCellCollection extends CellCollection {
  private constructor(private readonly _gameLevel: GameLevel, private readonly _cells: GridCell[][]) {
    super();
  }

  static of(
    gameLevel: GameLevel,
    cells: GridCell[][] = Array.from({ length: gameLevel.getRowSize() }, (_, row) =>
      Array.from({ length: gameLevel.getColumnSize() }, (_, col) =>
        GridCell.of(CellState.CLOSED, EmptyCellType.of(), GridCellPosition.of(row, col)),
      ),
    ),
  ): GridCellCollection {
    return new GridCellCollection(gameLevel, cells);
  }

  override isAllClosed(): boolean {
    return this._cells.every((row) => row.every((cell) => cell.isClosed()));
  }

  override hasUnopenedMines(): boolean {
    return this._cells.flat().some((cell) => cell.isMine() && cell.isClosed());
  }

  override openCell(position: GridCellPosition): CellCollection {
    if (this.isAllClosed()) return GridCellCollection._updateInitialMineCells(this, position)._openCell(position);
    return this._openCell(position);
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
    return this._cells.flat().filter((cell) => cell.isMine() && cell.isClosed()).length;
  }

  override getNumberPositions(): CellPositionCollection {
    const allPositions = GridCellPositionCollection.gameLevelOf(this._gameLevel);
    return allPositions.filter((position) => this.findCellByPosition(position).isNumber());
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

  override unflag(position: GridCellPosition): GridCellCollection {
    const cell = this.findCellByPosition(position);
    if (!cell.isFlagged()) {
      throw GameException.of('깃발이 꽂힌 셀이 아닙니다.');
    }

    return GridCellCollection._updatedCellByPosition(this, position, cell.unflag());
  }

  private _every(predicate: (_cell: Cell) => boolean): boolean {
    return this._cells.every((row) => row.every(predicate));
  }

  override areAllSafeCellsOpened(): boolean {
    return this.filter((cell) => cell.isSafeCell())._every((cell) => cell.isOpened());
  }

  private static _updateAdjacentMineCount(cells: GridCellCollection, gameLevel: GameLevel): GridCellCollection {
    return cells._map((cell) => {
      if (cell.isMine()) return cell;
      const adjacentMineCount = cell.getAdjacentMineCount(cells, gameLevel);
      if (adjacentMineCount <= 0) return cell;
      return GridCell.of(cell.getState(), NumberCellType.of(adjacentMineCount), cell.getPosition());
    });
  }

  private static _updatedCellByPosition(
    cells: GridCellCollection,
    position: GridCellPosition,
    newCell: GridCell,
  ): GridCellCollection {
    const newCells = cells._cells.map((row) => [...row]);
    newCells[position.getRow()][position.getColumn()] = newCell;
    return new GridCellCollection(cells._gameLevel, newCells);
  }

  private _updatedMineCellsByPositions(positions: GridCellPositionCollection): GridCellCollection {
    let updatedCells = new GridCellCollection(
      this._gameLevel,
      this._cells.map((row) => [...row]),
    );
    for (const position of positions) {
      const cell = this.findCellByPosition(position);
      updatedCells = GridCellCollection._updatedCellByPosition(updatedCells, position, cell.updatedToMine());
    }
    return updatedCells;
  }

  private _openCell(position: GridCellPosition): GridCellCollection {
    const cell = this.findCellByPosition(position);
    if (cell.isOpened()) return this;

    const opendCell = cell.open();
    let updatedCollection = GridCellCollection._updatedCellByPosition(this, position, opendCell);

    if (opendCell.isNumber()) return updatedCollection;

    const adjacentPositions = cell.getPosition().getAdjacentPositions(this._gameLevel);

    for (const adjacentPosition of adjacentPositions) {
      const adjacentCell = this.findCellByPosition(adjacentPosition);
      if (adjacentCell.isMine()) continue;
      if (adjacentCell.isOpened()) continue;

      updatedCollection = updatedCollection._openCell(adjacentPosition);
    }

    return updatedCollection;
  }

  private _map(mapper: (_cell: GridCell) => GridCell): GridCellCollection {
    return GridCellCollection.of(
      this._gameLevel,
      this._cells.map((row) => row.map(mapper)),
    );
  }

  override filter(_predicate: (_cell: Cell) => boolean): GridCellCollection {
    return GridCellCollection.of(
      this._gameLevel,
      this._cells.map((row) => row.filter(_predicate)),
    );
  }

  override *[Symbol.iterator](): Iterator<GridCell> {
    yield* this._cells.flat();
  }
}
