import { CellPosition } from '../cell-position/cell-position.abstract';
import { CellSnapshot } from './cell-snapshot.interface';
import { DefaultOpendCellSnapshot } from './default-opend-cell-snapshot';

export class OpendEmptyCellSnapshot implements CellSnapshot {
  private constructor(private readonly _position: CellPosition) {}

  static of(position: CellPosition): OpendEmptyCellSnapshot {
    return new OpendEmptyCellSnapshot(position);
  }

  private get _defaultSnapshot(): CellSnapshot {
    return DefaultOpendCellSnapshot.of(this._position);
  }

  getClassname(): string {
    return this._defaultSnapshot.getClassname();
  }

  getContent(): string {
    return '';
  }
}
