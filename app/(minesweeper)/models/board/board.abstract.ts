import { Cell } from '../cell/cell.abstract';
import { CellCollection } from '../cell-collection/cell-collections.abstract';
import { CellPosition } from '../cell-position/cell-position.abstract';

export abstract class Board {
  abstract findCellByPosition(_cellPosition: CellPosition): Cell;
  abstract isOpenedCell(_position: CellPosition): boolean;
  abstract openCell(_position: CellPosition): Board;
  abstract getCandidateMineCount(): number;
  abstract getColumnSize(): number;
  abstract getRowSize(): number;
  abstract isAllClosed(): boolean;
  abstract hasUnopenedMines(): boolean;
  abstract getUnOpenedMineCount(): number;
  abstract getCells(): CellCollection;
  abstract isGameOver(): boolean;
  abstract isGameClear(): boolean;
  abstract flag(_position: CellPosition): Board;
  abstract unflag(_position: CellPosition): Board;
}
