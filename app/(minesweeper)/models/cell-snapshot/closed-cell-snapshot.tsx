import { ReactNode } from 'react';

import { CellSnapshot } from './cell-snapshot.interface';

export class ClosedCellSnapshot implements CellSnapshot {
  static of(): ClosedCellSnapshot {
    return new ClosedCellSnapshot();
  }

  getContent(): ReactNode {
    return null;
  }

  getButtonVariant(): 'secondary' {
    return 'secondary';
  }

  getName(): string {
    return ClosedCellSnapshot.name;
  }
}
