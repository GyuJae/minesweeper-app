import { CellPosition } from '../cell-position/cell-position.abstract';
import { GridCellPosition } from '../cell-position/grid-cell-position';
import { CellPositionCollection } from './cell-position-collection.abstract';

export class GridCellPositionCollection extends CellPositionCollection {
  private constructor(private readonly _positions: GridCellPosition[]) {
    super();
  }

  static of(positions: GridCellPosition[]): CellPositionCollection {
    return new GridCellPositionCollection(positions);
  }

  override add(position: GridCellPosition): CellPositionCollection {
    this._positions.push(position);
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
}
