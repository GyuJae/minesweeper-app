import { CellType } from './cell-type.abstract';

export class FlowerCellType extends CellType {
  static of(): FlowerCellType {
    return new FlowerCellType();
  }

  override getNearbyMineCount(): number {
    // TODO 수정 필요
    return 0;
  }
  override isMine(): boolean {
    return false;
  }

  override isNumber(): boolean {
    return false;
  }

  override isEmpty(): boolean {
    return false;
  }

  override isFlower(): boolean {
    return true;
  }
}
