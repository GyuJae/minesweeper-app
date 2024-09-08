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
    throw new Error('지뢰 타입은 주변 지뢰 개수를 가지고 있지 않습니다.');
  }
}
