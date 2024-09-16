import { ReactNode } from 'react';

import { CellSnapshot } from './cell-snapshot.interface';

export class OpenedMineCellSnapshot implements CellSnapshot {
  private constructor() {}

  static of(): OpenedMineCellSnapshot {
    return new OpenedMineCellSnapshot();
  }

  getContent(): ReactNode {
    return <div className='m-auto size-1/3 rounded-full bg-black/70' />;
  }

  getButtonVariant(): 'secondary' {
    return 'secondary';
  }
}
