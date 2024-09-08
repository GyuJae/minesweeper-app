import { Cell } from '../cell/cell.abstract';
import { CellPosition } from '../cell-position/cell-position.abstract';
import { CellPositionCollection } from '../cell-position-collection/cell-position-collection.abstract';

export abstract class CellCollection {
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
  abstract [Symbol.iterator](): Iterator<Cell>;
}
