import { ReactNode } from 'react';

import { CellPosition } from '../cell-position/cell-position.abstract';
import { CellSnapshot } from './cell-snapshot.interface';

export class DefaultOpendCellSnapshot implements CellSnapshot {
  private constructor(private readonly _position: CellPosition) {}

  static of(position: CellPosition): DefaultOpendCellSnapshot {
    return new DefaultOpendCellSnapshot(position);
  }

  getClassname(): string {
    return this._getClassnameByPosition();
  }

  getContent(): ReactNode {
    return null;
  }

  private _getClassnameByPosition(): string {
    return this._isOddPosition() ? 'bg-amber-100' : 'bg-amber-50';
  }

  private _isOddPosition(): boolean {
    return this._position.getColumn() % 2 !== 0;
  }
}
