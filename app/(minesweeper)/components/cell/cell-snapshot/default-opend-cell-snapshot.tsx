import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

import { CellPosition } from '../../../models/cell-position/cell-position.abstract';
import { CellSnapshot } from './cell-snapshot.interface';

export class DefaultOpendCellSnapshot implements CellSnapshot {
  private constructor(private readonly _position: CellPosition) {}

  static of(position: CellPosition): DefaultOpendCellSnapshot {
    return new DefaultOpendCellSnapshot(position);
  }

  getClassname(): string {
    return cn('size-full text-5xl font-semibold', {
      'bg-amber-50': this._isOddPosition(),
      'bg-amber-100': !this._isOddPosition(),
    });
  }

  getContent(): ReactNode {
    return null;
  }

  private _isOddPosition(): boolean {
    return this._position.getColumn() % 2 !== 0;
  }
}
