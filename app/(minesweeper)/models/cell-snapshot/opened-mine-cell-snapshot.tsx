import { ReactNode } from 'react';

import { CellSnapshot } from './cell-snapshot.interface';

export class OpenedMineCellSnapshot implements CellSnapshot {
  private constructor() {}

  static of(): OpenedMineCellSnapshot {
    return new OpenedMineCellSnapshot();
  }

  getContent(): ReactNode {
    return '💣';
  }

  getButtonVariant(): 'secondary' {
    return 'secondary';
  }
}
