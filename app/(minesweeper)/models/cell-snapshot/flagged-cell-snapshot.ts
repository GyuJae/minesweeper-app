import { ReactNode } from 'react';

import { CellPosition } from '../cell-position/cell-position.abstract';
import { CellSnapshot } from './cell-snapshot.interface';
import { ClosedCellSnapshot } from './closed-cell-snapshot';

export class FlaggedCellSnapshot implements CellSnapshot {
  private constructor(private readonly _position: CellPosition) {}

  static of(position: CellPosition): FlaggedCellSnapshot {
    return new FlaggedCellSnapshot(position);
  }

  getClassName(): string {
    return this._getClosedCellSnapshot().getClassName();
  }
  getContent(): ReactNode {
    return '🚩';
  }

  private _getClosedCellSnapshot(): CellSnapshot {
    return ClosedCellSnapshot.of(this._position);
  }
}
