import { CellSnapshot } from './cell-snapshot.interface';

export class OpenedEmptyCellSnapshot implements CellSnapshot {
  private constructor() {}

  static of(): OpenedEmptyCellSnapshot {
    return new OpenedEmptyCellSnapshot();
  }

  getContent(): string {
    return '';
  }

  getButtonVariant(): 'ghost' {
    return 'ghost';
  }
}
