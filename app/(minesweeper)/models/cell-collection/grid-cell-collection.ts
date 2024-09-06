import { Cell } from '../cell/cell.abstract';
import { GridCell } from '../cell/grid-cell';
import { CellPosition } from '../cell-position/cell-position.abstract';
import { GridCellPosition } from '../cell-position/grid-cell-position';
import { CellPositionCollection } from '../cell-position-collection/cell-position-collection.abstract';
import { GridCellPositionCollection } from '../cell-position-collection/grid-cell-position-collection';
import { CellState } from '../cell-state/cell-state.enum';
import { EmptyCellType } from '../cell-type/empty-cell-type';
import { MineCellType } from '../cell-type/mine-cell-type';
import { NumberCellType } from '../cell-type/number-cell-type';
import { GameLevel } from '../game-level/game-level.enum';
import { CellCollection } from './cell-collections.abstract';

export class GridCellCollection extends CellCollection {
  private constructor(private readonly _gameLevel: GameLevel, private readonly _cells: Cell[][]) {
    super();
  }

  static of(
    gameLevel: GameLevel,
    cells: Cell[][] = Array.from({ length: gameLevel.getRowSize() }, (_, row) =>
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
    if (this.isAllClosed()) {
      const updatedToMineCellCollection = this._openCell(position)._updatedMineCellsByPositions(
        this._initMinePositions(),
      );

      let updatedToNumberCellCollection: GridCellCollection = GridCellCollection.of(
        this._gameLevel,
        updatedToMineCellCollection._cells,
      );

      for (const cell of updatedToMineCellCollection) {
        if (cell.isMine()) continue;

        const nearbyMineCount: number = updatedToMineCellCollection
          ._getAdjacentPositions(cell.getPosition())
          .filter((p) => updatedToMineCellCollection.findCellByPosition(p).isMine())
          .getSize();

        if (nearbyMineCount > 0) {
          updatedToNumberCellCollection = updatedToNumberCellCollection._updatedCell(
            cell.getPosition(),
            GridCell.of(cell.getState(), NumberCellType.of(nearbyMineCount), cell.getPosition()),
          );
        }
      }

      return updatedToNumberCellCollection;
    }

    return this._openCell(position);
  }

  override isOpenedCell(position: CellPosition): boolean {
    return this.findCellByPosition(position).isOpened();
  }

  override getUnOpenedMineCount(): number {
    return this._cells.flat().filter((cell) => cell.isMine() && cell.isClosed()).length;
  }

  override getNumberPositions(): CellPositionCollection {
    const allPositions = GridCellPositionCollection.fromGameLevel(this._gameLevel);
    return allPositions.filter((position) => this.findCellByPosition(position).isNumber());
  }

  override getRowSize(): number {
    return this._gameLevel.getRowSize();
  }

  override getColumnSize(): number {
    return this._gameLevel.getColumnSize();
  }

  override findCellByPosition(position: CellPosition): Cell {
    return this._cells[position.getRow()][position.getColumn()];
  }

  private _getAdjacentPositions(position: CellPosition): CellPositionCollection {
    let adjacentPositions = GridCellPositionCollection.of([]);
    for (let row = position.getRow() - 1; row <= position.getRow() + 1; row++) {
      for (let column = position.getColumn() - 1; column <= position.getColumn() + 1; column++) {
        if (row < 0 || column < 0 || row >= this._gameLevel.getRowSize() || column >= this._gameLevel.getColumnSize()) {
          continue;
        }
        if (row === position.getRow() && column === position.getColumn()) continue;
        adjacentPositions = adjacentPositions.add(GridCellPosition.of(row, column));
      }
    }
    return adjacentPositions;
  }

  private _updatedCell(position: CellPosition, newCell: Cell): GridCellCollection {
    const newCells = this._cells.map((row) => [...row]);
    newCells[position.getRow()][position.getColumn()] = newCell;
    return new GridCellCollection(this._gameLevel, newCells);
  }

  private _updatedMineCellsByPositions(positions: CellPositionCollection): GridCellCollection {
    const newCells = this._cells.map((row) => [...row]);
    for (const position of positions.toList()) {
      newCells[position.getRow()][position.getColumn()] = GridCell.of(CellState.CLOSED, MineCellType.of(), position);
    }
    return new GridCellCollection(this._gameLevel, newCells);
  }

  private _initMinePositions(): CellPositionCollection {
    const mineCount = this._gameLevel.getMineCount();
    let minePositions = GridCellPositionCollection.of([]);

    while (minePositions.getSize() < mineCount) {
      const randomRow = Math.floor(Math.random() * this._gameLevel.getRowSize());
      const randomColumn = Math.floor(Math.random() * this._gameLevel.getColumnSize());
      const newPosition = GridCellPosition.of(randomRow, randomColumn);
      if (minePositions.has(newPosition)) continue;
      minePositions = minePositions.add(newPosition);
    }

    return minePositions;
  }

  private _openCell(position: CellPosition): GridCellCollection {
    const cell = this.findCellByPosition(position);

    const newCells = this._cells.map((row) => [...row]);
    newCells[position.getRow()][position.getColumn()] = cell.open();

    return new GridCellCollection(this._gameLevel, newCells);
  }

  override *[Symbol.iterator](): Iterator<Cell> {
    for (const row of this._cells) {
      for (const cell of row) {
        yield cell;
      }
    }
  }
}
