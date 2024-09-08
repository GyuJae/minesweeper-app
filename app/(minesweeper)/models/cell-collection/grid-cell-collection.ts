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

  private static _updateAdjacentMineCount(cells: GridCellCollection, gameLevel: GameLevel): GridCellCollection {
    return cells._map((cell) => {
      if (cell.isMine()) return cell;
      const adjacentMineCount = cell.getAdjacentMineCount(cells, gameLevel);
      if (adjacentMineCount <= 0) return cell;
      return GridCell.of(cell.getState(), NumberCellType.of(adjacentMineCount), cell.getPosition());
    });
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
    return GridCellCollection._updatedCellByPosition(this, position, cell.open());
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

  private _map(mapper: (_cell: GridCell) => GridCell): GridCellCollection {
    return GridCellCollection.of(
      this._gameLevel,
      this._cells.map((row) => row.map(mapper)),
    );
  }

  override *[Symbol.iterator](): Iterator<GridCell> {
    yield* this._cells.flat();
  }
}
