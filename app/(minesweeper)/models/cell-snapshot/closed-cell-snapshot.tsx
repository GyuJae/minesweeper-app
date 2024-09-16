import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

import { CellPosition } from '../cell-position/cell-position.abstract';
import { CellSnapshot } from './cell-snapshot.interface';
import { DefaultCellSnapshot } from './default-cell-snapshot';

export class ClosedCellSnapshot implements CellSnapshot {
  private constructor(private readonly _position: CellPosition) {}

  static of(position: CellPosition): ClosedCellSnapshot {
    return new ClosedCellSnapshot(position);
  }

  private _getDefaultCellSnapshot(): DefaultCellSnapshot {
    return DefaultCellSnapshot.of();
  }

  getClassName(): string {
    return cn(this._getDefaultCellSnapshot().getClassName(), {
      'bg-green-500': this._isOddPosition(),
      'bg-green-400': !this._isOddPosition(),
    });
  }

  getContent(): ReactNode {
    return null;
  }

  private _isOddPosition(): boolean {
    return (this._position.getColumn() + this._position.getRow()) % 2 !== 0;
  }
}
