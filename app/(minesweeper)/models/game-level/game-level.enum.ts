import { Enum, EnumType } from 'ts-jenum';

@Enum('name')
export class GameLevel extends EnumType<GameLevel>() {
  static readonly VERY_EASY = new GameLevel('매우 쉬움', 4, 4, 3);
  static readonly EASY = new GameLevel('쉬움', 9, 9, 10);
  static readonly NORMAL = new GameLevel('중간', 16, 16, 40);
  static readonly HARD = new GameLevel('어려움', 16, 30, 99);

  constructor(
    private readonly name: string,
    private readonly _rowSize: number,
    private readonly _columnSize: number,
    private readonly _mineCount: number,
  ) {
    super();
  }
  getMineCount(): number {
    return this._mineCount;
  }

  getRowSize(): number {
    return this._rowSize;
  }

  getColumnSize(): number {
    return this._columnSize;
  }

  equals(other: GameLevel): boolean {
    return this === other;
  }
}
