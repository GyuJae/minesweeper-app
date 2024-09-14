import { ReactNode } from 'react';

import { Cell } from '../../../models/cell/cell.abstract';
import { CellPosition } from '../../../models/cell-position/cell-position.abstract';
import { CellSnapshot } from './cell-snapshot.interface';
import { DefaultOpendCellSnapshot } from './default-opend-cell-snapshot';

export class OpendMineCellSnapshot implements CellSnapshot {
  private constructor(private readonly _cell: Cell, private readonly _position: CellPosition) {}

  static of(cell: Cell, position: CellPosition): OpendMineCellSnapshot {
    return new OpendMineCellSnapshot(cell, position);
  }

  private get _defaultOpendSnapshot(): CellSnapshot {
    return DefaultOpendCellSnapshot.of(this._position);
  }

  getClassname(): string {
    return this._defaultOpendSnapshot.getClassname();
  }

  getContent(): ReactNode {
    return <div>💣</div>;
  }
}
