import { CellType } from './cell-type.abstract';

export class MineCellType extends CellType {
  private constructor() {
    super();
  }

  static of(): CellType {
    return new MineCellType();
  }

  override isMine(): boolean {
    return true;
  }

  override isNumber(): boolean {
    return false;
  }

  override isEmpty(): boolean {
    return false;
  }

  override getNearbyMineCount(): number {
    // TODO 수정 필요
    return 0;
  }

  override isFlower(): boolean {
    return false;
  }
}
