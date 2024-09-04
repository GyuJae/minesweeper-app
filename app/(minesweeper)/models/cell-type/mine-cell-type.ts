import { CellType } from "./cell-type.abstract";

export class MineCellType extends CellType {
  private constructor() {
    super();
  }

  static of(): CellType {
    return new MineCellType();
  }

  isMine(): boolean {
    return true;
  }
}
