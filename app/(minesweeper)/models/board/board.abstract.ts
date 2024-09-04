import { Cell } from '../cell/cell.abstract';
import { CellPosition } from '../cell-position/cell-position.abstract';
import { CellPositionCollection } from '../cell-position-collection/cell-position-collection.abstract';

export abstract class Board {
  abstract findCellByPosition(_cellPosition: CellPosition): Cell;
  abstract getNumberPositions(): CellPositionCollection;
  abstract isOpenedCell(_position: CellPosition): boolean;
  abstract openCell(_position: CellPosition): Board;
  abstract getCandidateMineCount(): number;
  abstract getColumnSize(): number;
  abstract getRowSize(): number;
  abstract isAllClosed(): boolean;
  abstract hasUnopenedMines(): boolean;
  abstract getUnOpenedMineCount(): number;
}
