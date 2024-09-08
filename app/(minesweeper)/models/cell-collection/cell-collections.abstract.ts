import { Cell } from '../cell/cell.abstract';
import { CellPosition } from '../cell-position/cell-position.abstract';
import { GridCellPosition } from '../cell-position/grid-cell-position';
import { CellPositionCollection } from '../cell-position-collection/cell-position-collection.abstract';

export abstract class CellCollection {
  abstract unflag(_position: GridCellPosition): CellCollection;
  abstract flag(_position: GridCellPosition): CellCollection;
  abstract find(_predicate: (_cell: Cell) => boolean): Cell | undefined;
  abstract findCellByPosition(_cellPosition: CellPosition): Cell;
  abstract getNumberPositions(): CellPositionCollection;
  abstract isOpenedCell(_position: CellPosition): boolean;
  abstract hasUnopenedMines(): boolean;
  abstract isAllClosed(): boolean;
  abstract openCell(_position: CellPosition): CellCollection;
  abstract getUnOpenedMineCount(): number;
  abstract getRowSize(): number;
  abstract getColumnSize(): number;
  abstract filter(_predicate: (_cell: Cell) => boolean): CellCollection;
  abstract hasOpenedMineCell(): boolean;
  abstract areAllSafeCellsOpened(): boolean;
  abstract [Symbol.iterator](): Iterator<Cell>;
}
