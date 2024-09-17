import { Variants } from 'framer-motion';
import { ReactNode } from 'react';

import { Cell } from '../cell/cell.abstract';
import { CellSnapshot } from './cell-snapshot.interface';

export class OpenedNumberCellSnapshot implements CellSnapshot {
  private constructor(private readonly _cell: Cell) {}

  static of(cell: Cell): OpenedNumberCellSnapshot {
    return new OpenedNumberCellSnapshot(cell);
  }

  getContent(): ReactNode {
    return this._cell.getNearbyMineCount();
  }

  getButtonVariant(): 'ghost' {
    return 'ghost';
  }

  getName(): string {
    return OpenedNumberCellSnapshot.name;
  }

  getAnimationVariant(): Variants {
    return {
      [CellSnapshot.VARIANT_INITIAL]: {},
      [CellSnapshot.VARIANT_ANIMATE]: {},
      [CellSnapshot.VARIANT_EXIT]: {},
    };
  }
}
