import { ReactNode } from 'react';

import { CellSnapshot } from './cell-snapshot.interface';

export class DefaultCellSnapshot implements CellSnapshot {
  static of(): DefaultCellSnapshot {
    return new DefaultCellSnapshot();
  }

  getClassname(): string {
    return '';
  }

  getContent(): ReactNode {
    return null;
  }
}
