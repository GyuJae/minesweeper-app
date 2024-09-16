import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

import { Cell } from '../cell/cell.abstract';
import { CellPosition } from '../cell-position/cell-position.abstract';
import { CellSnapshot } from './cell-snapshot.interface';
import { DefaultOpenedCellSnapshot } from './default-opened-cell-snapshot';

export class OpenedNumberCellSnapshot implements CellSnapshot {
  private constructor(private readonly _cell: Cell, private readonly _position: CellPosition) {}

  static of(cell: Cell, position: CellPosition): OpenedNumberCellSnapshot {
    return new OpenedNumberCellSnapshot(cell, position);
  }

  getClassName(): string {
    return cn(this._defaultOpenedSnapshot.getClassName(), {
      'text-blue-600': this._cell.getNearbyMineCount() === 1,
      'text-green-600': this._cell.getNearbyMineCount() === 2,
      'text-red-600': this._cell.getNearbyMineCount() === 3,
      'text-slate-700': this._cell.getNearbyMineCount() >= 4,
    });
  }

  getContent(): ReactNode {
    return this._cell.getNearbyMineCount();
  }

  isDisabledOpenCell(): boolean {
    return this._defaultOpenedSnapshot.isDisabledOpenCell();
  }

  private get _defaultOpenedSnapshot(): CellSnapshot {
    return DefaultOpenedCellSnapshot.of(this._position);
  }
}
