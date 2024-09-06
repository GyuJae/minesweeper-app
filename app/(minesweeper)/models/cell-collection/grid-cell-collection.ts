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

        const recalculatedMineCount: number = cell
          .getPosition()
          .getAdjacentPositions(this._gameLevel)
          .filter((p) => updatedToMineCellCollection.findCellByPosition(p).isMine())
          .getSize();

        if (recalculatedMineCount > 0) {
          updatedToNumberCellCollection = updatedToNumberCellCollection._updatedCell(
            cell.getPosition(),
            GridCell.of(cell.getState(), NumberCellType.of(recalculatedMineCount), cell.getPosition()),
          );
        }
      }

      return updatedToNumberCellCollection;
    }

    return this._openCell(position);
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

  private _updatedCell(position: CellPosition, newCell: GridCell): GridCellCollection {
    const newCells = this._cells.map((row) => [...row]);
    newCells[position.getRow()][position.getColumn()] = newCell;
    return new GridCellCollection(this._gameLevel, newCells);
  }

  private _updatedMineCellsByPositions(positions: GridCellPositionCollection): GridCellCollection {
    const newCells = this._cells.map((row) => [...row]);
    for (const position of positions) {
      newCells[position.getRow()][position.getColumn()] = GridCell.of(CellState.CLOSED, MineCellType.of(), position);
    }
    return new GridCellCollection(this._gameLevel, newCells);
  }

  private _initMinePositions(): GridCellPositionCollection {
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

  private _openCell(position: GridCellPosition): GridCellCollection {
    const cell = this.findCellByPosition(position);

    const newCells = this._cells.map((row) => [...row]);
    newCells[position.getRow()][position.getColumn()] = cell.open();

    return new GridCellCollection(this._gameLevel, newCells);
  }

  override *[Symbol.iterator](): Iterator<GridCell> {
    for (const row of this._cells) {
      for (const cell of row) {
        yield cell;
      }
    }
  }
}
