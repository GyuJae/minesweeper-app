import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

import { CellPosition } from '../../../models/cell-position/cell-position.abstract';
import { CellSnapshot } from './cell-snapshot.interface';

export class ClosedCellSnapshot implements CellSnapshot {
  private constructor(private readonly _position: CellPosition) {}

  static of(position: CellPosition): ClosedCellSnapshot {
    return new ClosedCellSnapshot(position);
  }

  getClassname(): string {
    return cn('size-full text-5xl font-semibold', {
      'bg-green-500': this._isOddPosition(),
      'bg-green-400': !this._isOddPosition(),
    });
  }

  getContent(): ReactNode {
    return null;
  }

  private _isOddPosition(): boolean {
    return this._position.getColumn() % 2 !== 0;
  }
}
