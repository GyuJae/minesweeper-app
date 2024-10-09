import { FX } from '@/libs';

import { GridCellPosition } from '../cell-position/grid-cell-position';
import { GameLevel } from '../game-level/game-level.enum';
import { CellPositionCollection } from './cell-position-collection.abstract';

export class GridCellPositionCollection extends CellPositionCollection {
  private constructor(private readonly _positions: Iterable<GridCellPosition>) {
    super();
  }

  static of(positions: GridCellPosition[]): GridCellPositionCollection {
    return new GridCellPositionCollection(positions);
  }

  static initialMinesOf(gameLevel: GameLevel, selectPosition: GridCellPosition): GridCellPositionCollection {
    const mineCount = gameLevel.getMineCount();
    const minePositions: GridCellPosition[] = [];
    while (minePositions.length < mineCount) {
      const randomPosition = GridCellPosition.of(
        Math.floor(Math.random() * gameLevel.getRowSize()),
        Math.floor(Math.random() * gameLevel.getColumnSize()),
      );

      if (randomPosition.equals(selectPosition)) continue;
      if (minePositions.some((position) => position.equals(randomPosition))) continue;

      minePositions.push(randomPosition);
    }

    return GridCellPositionCollection.of(minePositions);
  }

  static gameLevelOf(gameLevel: GameLevel): GridCellPositionCollection {
    const gridPositions = Array.from({ length: gameLevel.getRowSize() }, (_, row) =>
      Array.from({ length: gameLevel.getColumnSize() }, (_, col) => GridCellPosition.of(row, col)),
    );

    return GridCellPositionCollection.of(gridPositions.flat());
  }

  override getSize(): number {
    return FX.size(this._positions);
  }

  filter(predicate: (_position: GridCellPosition) => boolean): GridCellPositionCollection {
    return FX.pipe(this._positions, FX.filter(predicate), FX.toArray, GridCellPositionCollection.of);
  }

  *[Symbol.iterator](): Iterator<GridCellPosition> {
    for (const position of this._positions) {
      yield position;
    }
  }
}
