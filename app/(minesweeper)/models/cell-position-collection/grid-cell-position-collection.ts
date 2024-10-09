import { FX } from '@/libs';

import { GridCellPosition } from '../cell-position/grid-cell-position';
import { GameLevel } from '../game-level/game-level.enum';
import { CellPositionCollection } from './cell-position-collection.abstract';

export class GridCellPositionCollection extends CellPositionCollection {
  private constructor(private readonly _positions: Iterable<GridCellPosition>) {
    super();
  }

  static of(positions: Iterable<GridCellPosition>): GridCellPositionCollection {
    return new GridCellPositionCollection(positions);
  }

  static emptyOf(): GridCellPositionCollection {
    return new GridCellPositionCollection([]);
  }

  static initialMinesOf(gameLevel: GameLevel, firstSelectPosition: GridCellPosition): GridCellPositionCollection {
    const mineCount = gameLevel.getMineCount();
    const rowSize = gameLevel.getRowSize();
    const columnSize = gameLevel.getColumnSize();

    return FX.pipe(
      FX.range(0, Infinity),
      FX.map(() => GridCellPosition.of(Math.floor(Math.random() * rowSize), Math.floor(Math.random() * columnSize))),
      FX.reject((position) => position.equals(firstSelectPosition)),
      FX.uniqBy((position) => position.toString()),
      FX.take(mineCount),
      FX.toArray,
      GridCellPositionCollection.of,
    );
  }

  *[Symbol.iterator](): Iterator<GridCellPosition> {
    for (const position of this._positions) {
      yield position;
    }
  }
}
