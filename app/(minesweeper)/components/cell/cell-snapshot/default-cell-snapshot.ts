import { ReactNode } from 'react';

import { CellSnapshot } from './cell-snapshot.interface';

export class DefaultCellSnapshot implements CellSnapshot {
  static of(): DefaultCellSnapshot {
    return new DefaultCellSnapshot();
  }

  getClassname(): string {
    return 'size-full text-5xl font-semibold';
  }

  getContent(): ReactNode {
    return null;
  }
}
