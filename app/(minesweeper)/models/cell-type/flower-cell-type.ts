import { GameException } from '../../exceptions/game-exception';
import { CellType } from './cell-type.abstract';

export class FlowerCellType extends CellType {
  static of(): FlowerCellType {
    return new FlowerCellType();
  }

  override getNearbyMineCount(): number {
    throw GameException.of('지뢰 타입은 주변 지뢰 개수를 가지고 있지 않습니다.');
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
