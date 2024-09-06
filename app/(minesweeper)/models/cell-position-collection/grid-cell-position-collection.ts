import { CellPosition } from '../cell-position/cell-position.abstract';
import { GridCellPosition } from '../cell-position/grid-cell-position';
import { GameLevel } from '../game-level/game-level.enum';
import { CellPositionCollection } from './cell-position-collection.abstract';

export class GridCellPositionCollection extends CellPositionCollection {
  private constructor(private readonly _positions: GridCellPosition[]) {
    super();
  }

  static of(positions: GridCellPosition[]): GridCellPositionCollection {
    return new GridCellPositionCollection(positions);
  }

  static fromGameLevel(gameLevel: GameLevel): GridCellPositionCollection {
    const gridPositions = Array.from({ length: gameLevel.getRowSize() }, (_, row) =>
      Array.from({ length: gameLevel.getColumnSize() }, (_, col) => GridCellPosition.of(row, col)),
    );

    return GridCellPositionCollection.of(gridPositions.flat());
  }

  override add(position: GridCellPosition): GridCellPositionCollection {
    return GridCellPositionCollection.of([...this._positions, position as GridCellPosition]);
  }

  override has(position: GridCellPosition): boolean {
    return this._positions.some((p) => p.equals(position));
  }

  override getSize(): number {
    return this._positions.length;
  }

  override toList(): CellPosition[] {
    return this._positions;
  }

  override filter(predicate: (_position: GridCellPosition) => boolean): GridCellPositionCollection {
    return GridCellPositionCollection.of(this._positions.filter((position) => predicate(position)));
  }

  override [Symbol.iterator](): Iterator<CellPosition> {
    let index = 0;

    return {
      next: () => {
        if (index < this._positions.length) {
          return { value: this._positions[index++], done: false };
        }

        return { value: undefined, done: true };
      },
    };
  }
}
