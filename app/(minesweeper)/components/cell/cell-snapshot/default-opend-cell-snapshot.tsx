import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

import { CellPosition } from '../../../models/cell-position/cell-position.abstract';
import { CellSnapshot } from './cell-snapshot.interface';
import { DefaultCellSnapshot } from './default-cell-snapshot';

export class DefaultOpendCellSnapshot implements CellSnapshot {
  private constructor(private readonly _position: CellPosition) {}

  static of(position: CellPosition): DefaultOpendCellSnapshot {
    return new DefaultOpendCellSnapshot(position);
  }

  private _getDefaultCellSnapshot(): DefaultCellSnapshot {
    return DefaultCellSnapshot.of();
  }

  getClassname(): string {
    return cn(this._getDefaultCellSnapshot().getClassname(), {
      'bg-amber-50': this._isOddPosition(),
      'bg-amber-100': !this._isOddPosition(),
    });
  }

  getContent(): ReactNode {
    return null;
  }

  private _isOddPosition(): boolean {
    return (this._position.getColumn() + this._position.getRow()) % 2 !== 0;
  }
}
