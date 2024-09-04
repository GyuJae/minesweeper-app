import { CellPosition } from './cell-position.abstract';

export class GridCellPosition extends CellPosition {
  constructor(private readonly _row: number, private readonly _column: number) {
    super();
  }

  static of(row: number, column: number): GridCellPosition {
    return new GridCellPosition(row, column);
  }

  getRow(): number {
    return this._row;
  }

  getColumn(): number {
    return this._column;
  }

  equals(other: CellPosition): boolean {
    return this._row === other.getRow() && this._column === other.getColumn();
  }
}
