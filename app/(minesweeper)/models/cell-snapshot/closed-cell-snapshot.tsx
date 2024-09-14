import { ReactNode } from 'react';

import { CellPosition } from '../cell-position/cell-position.abstract';
import { CellSnapshot } from './cell-snapshot.interface';

export class ClosedCellSnapshot implements CellSnapshot {
  private constructor(private readonly _position: CellPosition) {}

  static of(position: CellPosition): ClosedCellSnapshot {
    return new ClosedCellSnapshot(position);
  }

  getClassname(): string {
    return this._getClassnameByPosition();
  }

  getContent(): ReactNode {
    return null;
  }

  private _getClassnameByPosition(): string {
    return this._isOddPosition() ? 'bg-green-500' : 'bg-green-400';
  }

  private _isOddPosition(): boolean {
    return this._position.getColumn() % 2 !== 0;
  }
}
