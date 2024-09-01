import { CellType } from "./cell-type.abstract";

export class EmptyCellType extends CellType {
  static of(): CellType {
    return new EmptyCellType();
  }

  isMine(): boolean {
    return false;
  }
}
