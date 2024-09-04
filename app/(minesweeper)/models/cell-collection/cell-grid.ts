import { Cell } from '../cell/cell.abstract';
import { DefaultCell } from '../cell/default-cell';
import { CellPosition } from '../cell-position/cell-position.abstract';
import { GridCellPosition } from '../cell-position/grid-cell-position';
import { CellPositionCollection } from '../cell-position-collection/cell-position-collection.abstract';
import { GridCellPositionCollection } from '../cell-position-collection/grid-cell-positions';
import { CellState } from '../cell-state/cell-state.enum';
import { EmptyCellType } from '../cell-type/empty-cell-type';
import { MineCellType } from '../cell-type/mine-cell-type';
import { GameLevel } from '../game-level/game-level.enum';
import { CellCollection } from './cell-collections.abstract';

export class GridCellCollection extends CellCollection {
  private constructor(private readonly _gameLevel: GameLevel, private readonly _cells: Cell[][]) {
    super();
  }

  static of(gameLevel: GameLevel): CellCollection {
    return new GridCellCollection(
      gameLevel,
      Array.from({ length: gameLevel.getRowSize() }, () =>
        Array.from({ length: gameLevel.getColumnSize() }, () => DefaultCell.of(CellState.CLOSED, EmptyCellType.of())),
      ),
    );
  }

  override isAllClosed(): boolean {
    return this._cells.every((row) => row.every((cell) => cell.isClosed()));
  }

  override hasUnopenedMines(): boolean {
    return this._cells.flat().some((cell) => cell.isMine() && cell.isClosed());
  }

  override openCell(position: CellPosition): CellCollection {
    if (this.isAllClosed()) {
      return this._openCells(position)._updatedCells(
        this._initMinePositions(),
        DefaultCell.of(CellState.CLOSED, MineCellType.of()),
      );
    }

    return this._openCells(position);
  }

  override isOpenedCell(position: CellPosition): boolean {
    return this._findCellByPosition(position).isOpened();
  }

  override getUnOpenedMineCount(): number {
    return this._cells.flat().filter((cell) => cell.isMine() && cell.isClosed()).length;
  }

  private _updatedCells(positions: CellPositionCollection, newCell: Cell): GridCellCollection {
    const newCells = this._cells.map((row) => [...row]);
    for (const position of positions.toList()) {
      newCells[position.getRow()][position.getColumn()] = newCell;
    }
    return new GridCellCollection(this._gameLevel, newCells);
  }

  private _initMinePositions(): CellPositionCollection {
    const mineCount = this._gameLevel.getMineCount();
    const minePositions = GridCellPositionCollection.of([]);

    while (minePositions.getSize() < mineCount) {
      const randomRow = Math.floor(Math.random() * this._gameLevel.getRowSize());
      const randomColumn = Math.floor(Math.random() * this._gameLevel.getColumnSize());
      const newPosition = GridCellPosition.of(randomRow, randomColumn);
      if (minePositions.has(newPosition)) continue;
      minePositions.add(newPosition);
    }

    return minePositions;
  }

  private _openCells(position: CellPosition): GridCellCollection {
    const cell = this._findCellByPosition(position);

    const newCells = this._cells.map((row) => [...row]);
    newCells[position.getRow()][position.getColumn()] = cell.open();

    return new GridCellCollection(this._gameLevel, newCells);
  }

  private _findCellByPosition(position: CellPosition): Cell {
    return this._cells[position.getRow()][position.getColumn()];
  }
}
