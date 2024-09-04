import { CellType } from './cell-type.abstract';

export class EmptyCellType extends CellType {
  static of(): CellType {
    return new EmptyCellType();
  }

  override isMine(): boolean {
    return false;
  }

  override isNumber(): boolean {
    return false;
  }

  override getNearbyMineCount(): number {
    return 0;
  }
}
