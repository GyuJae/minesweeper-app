import { ReactNode } from 'react';

import { Cell } from '../cell/cell.abstract';
import { CellPosition } from '../cell-position/cell-position.abstract';
import { CellSnapshot } from './cell-snapshot.interface';
import { DefaultOpendCellSnapshot } from './default-opend-cell-snapshot';

export class OpendMineCellSnapshot implements CellSnapshot {
  private constructor(private readonly _cell: Cell, private readonly _position: CellPosition) {}

  static of(cell: Cell, position: CellPosition): OpendMineCellSnapshot {
    return new OpendMineCellSnapshot(cell, position);
  }

  private get _defaultSnapshot(): CellSnapshot {
    return DefaultOpendCellSnapshot.of(this._position);
  }

  getClassname(): string {
    return this._defaultSnapshot.getClassname();
  }

  getContent(): ReactNode {
    return <div>💣</div>;
  }
}
