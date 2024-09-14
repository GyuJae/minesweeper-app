import { CellPosition } from '../../../models/cell-position/cell-position.abstract';
import { CellSnapshot } from './cell-snapshot.interface';
import { DefaultOpendCellSnapshot } from './default-opend-cell-snapshot';

export class OpendEmptyCellSnapshot implements CellSnapshot {
  private constructor(private readonly _position: CellPosition) {}

  static of(position: CellPosition): OpendEmptyCellSnapshot {
    return new OpendEmptyCellSnapshot(position);
  }

  private get _defaultOpendSnapshot(): CellSnapshot {
    return DefaultOpendCellSnapshot.of(this._position);
  }

  getClassname(): string {
    return this._defaultOpendSnapshot.getClassname();
  }

  getContent(): string {
    return '';
  }
}
