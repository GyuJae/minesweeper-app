import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

import { CellPosition } from '../cell-position/cell-position.abstract';
import { CellSnapshot } from './cell-snapshot.interface';
import { DefaultCellSnapshot } from './default-cell-snapshot';

export class DefaultOpenedCellSnapshot implements CellSnapshot {
  private constructor(private readonly _position: CellPosition) {}

  static of(position: CellPosition): DefaultOpenedCellSnapshot {
    return new DefaultOpenedCellSnapshot(position);
  }

  private _getDefaultCellSnapshot(): DefaultCellSnapshot {
    return DefaultCellSnapshot.of();
  }

  getClassName(): string {
    return cn(this._getDefaultCellSnapshot().getClassName(), {
      'bg-amber-50': this._isOddPosition(),
      'bg-amber-100': !this._isOddPosition(),
    });
  }

  getContent(): ReactNode {
    return null;
  }

  isCellOpeningDisabled(): boolean {
    return true;
  }

  private _isOddPosition(): boolean {
    return (this._position.getColumn() + this._position.getRow()) % 2 !== 0;
  }
}
