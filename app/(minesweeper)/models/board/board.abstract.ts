import { CellPosition } from '../cell-position/cell-position.abstract';

export abstract class Board {
  abstract isOpenedCell(_position: CellPosition): boolean;
  abstract openCell(_position: CellPosition): Board;
  abstract getCandidateMineCount(): number;
  abstract getColumnSize(): number;
  abstract getRowSize(): number;
  abstract isAllClosed(): boolean;
  abstract hasUnopenedMines(): boolean;
  abstract getUnOpenedMineCount(): number;
}
