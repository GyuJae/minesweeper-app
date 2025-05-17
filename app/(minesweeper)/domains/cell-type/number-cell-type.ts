import { CellType } from './cell-type.abstract';

export class NumberCellType extends CellType {
  private constructor(private readonly _nearbyMineCount: number) {
    super();
  }

  static of(number: number): CellType {
    return new NumberCellType(number);
  }

  override isMine(): boolean {
    return false;
  }

  override isNumber(): boolean {
    return true;
  }

  override getNearbyMineCount(): number {
    return this._nearbyMineCount;
  }

  override isEmpty(): boolean {
    return false;
  }

  override isFlower(): boolean {
    return false;
  }
}
