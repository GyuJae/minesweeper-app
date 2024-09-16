import { ReactNode } from 'react';

import { Cell } from '../cell/cell.abstract';
import { CellPosition } from '../cell-position/cell-position.abstract';
import { CellSnapshot } from './cell-snapshot.interface';
import { DefaultOpenedCellSnapshot } from './default-opened-cell-snapshot';

export class OpenedMineCellSnapshot implements CellSnapshot {
  private constructor(private readonly _cell: Cell, private readonly _position: CellPosition) {}

  static of(cell: Cell, position: CellPosition): OpenedMineCellSnapshot {
    return new OpenedMineCellSnapshot(cell, position);
  }

  getClassName(): string {
    return this._defaultOpenedSnapshot.getClassName();
  }

  getContent(): ReactNode {
    return <div className='m-auto size-1/3 rounded-full bg-black/70' />;
  }

  private get _defaultOpenedSnapshot(): CellSnapshot {
    return DefaultOpenedCellSnapshot.of(this._position);
  }
}
