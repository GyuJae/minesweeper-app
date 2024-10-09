import { FX } from '@/libs';

import { GridCellPositionCollection } from '../cell-position-collection/grid-cell-position-collection';
import { GameLevel } from '../game-level/game-level.enum';
import { CellPosition } from './cell-position.abstract';

export class GridCellPosition extends CellPosition {
  constructor(private readonly _row: number, private readonly _column: number) {
    super();
  }

  static of(row: number, column: number): GridCellPosition {
    return new GridCellPosition(row, column);
  }

  override getRow(): number {
    return this._row;
  }

  override getColumn(): number {
    return this._column;
  }

  override equals(other: CellPosition): boolean {
    return this._row === other.getRow() && this._column === other.getColumn();
  }

  override toString(): string {
    return `${this._row}-${this._column}`;
  }

  override getAdjacentPositions(gameLevel: GameLevel): GridCellPositionCollection {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    return FX.pipe(
      directions,
      FX.map(([dRow, dCol]) => GridCellPosition.of(this._row + dRow, this._column + dCol)),
      FX.filter((p) => p._isValid(gameLevel)),
      GridCellPositionCollection.of,
    );
  }

  private _isValid = (gameLevel: GameLevel): boolean => {
    return (
      this._row >= 0 &&
      this._row < gameLevel.getRowSize() &&
      this._column >= 0 &&
      this._column < gameLevel.getColumnSize()
    );
  };
}
