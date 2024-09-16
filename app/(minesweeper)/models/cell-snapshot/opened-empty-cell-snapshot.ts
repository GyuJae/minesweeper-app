import { CellPosition } from '../cell-position/cell-position.abstract';
import { CellSnapshot } from './cell-snapshot.interface';
import { DefaultOpenedCellSnapshot } from './default-opened-cell-snapshot';

export class OpenedEmptyCellSnapshot implements CellSnapshot {
  private constructor(private readonly _position: CellPosition) {}

  static of(position: CellPosition): OpenedEmptyCellSnapshot {
    return new OpenedEmptyCellSnapshot(position);
  }

  private get _defaultOpenedSnapshot(): CellSnapshot {
    return DefaultOpenedCellSnapshot.of(this._position);
  }

  getClassName(): string {
    return this._defaultOpenedSnapshot.getClassName();
  }

  getContent(): string {
    return '';
  }
}
