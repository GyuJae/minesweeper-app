import { CellPosition } from "../cell-position/cell-position.abstract";

export abstract class CellCollection {
  abstract isOpenedCell(_position: CellPosition): boolean;
  abstract hasUnopenedMines(): boolean;
  abstract isAllClosed(): boolean;
  abstract openCell(_position: CellPosition): CellCollection;
  abstract getUnOpenedMineCount(): number;
}
