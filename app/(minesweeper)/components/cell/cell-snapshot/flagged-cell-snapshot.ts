import { ReactNode } from 'react';

import { CellSnapshot } from './cell-snapshot.interface';

export class FlaggedCellSnapshot implements CellSnapshot {
  static of(): FlaggedCellSnapshot {
    return new FlaggedCellSnapshot();
  }

  getClassname(): string {
    return '';
  }
  getContent(): ReactNode {
    return '🚩';
  }
}