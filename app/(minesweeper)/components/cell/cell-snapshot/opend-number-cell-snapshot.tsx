import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

import { Cell } from '../../../models/cell/cell.abstract';
import { CellPosition } from '../../../models/cell-position/cell-position.abstract';
import { CellSnapshot } from './cell-snapshot.interface';
import { DefaultOpendCellSnapshot } from './default-opend-cell-snapshot';

export class OpendNumberCellSnapshot implements CellSnapshot {
  private constructor(private readonly _cell: Cell, private readonly _position: CellPosition) {}

  static of(cell: Cell, position: CellPosition): OpendNumberCellSnapshot {
    return new OpendNumberCellSnapshot(cell, position);
  }

  private get _defaultOpendSnapshot(): CellSnapshot {
    return DefaultOpendCellSnapshot.of(this._position);
  }

  getClassname(): string {
    return cn(this._defaultOpendSnapshot.getClassname(), {
      'text-blue-600': this._cell.getNearbyMineCount() === 1,
      'text-green-600': this._cell.getNearbyMineCount() === 2,
      'text-red-600': this._cell.getNearbyMineCount() === 3,
      'text-slate-700': this._cell.getNearbyMineCount() >= 4,
    });
  }

  getContent(): ReactNode {
    return this._cell.getNearbyMineCount();
  }
}
