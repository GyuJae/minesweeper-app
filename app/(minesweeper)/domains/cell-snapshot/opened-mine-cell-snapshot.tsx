import { Variants } from 'framer-motion';
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

  getButtonVariant(): 'ghost' {
    return 'ghost';
  }

  getName(): string {
    return OpenedMineCellSnapshot.name;
  }

  getAnimationVariant(): Variants {
    return {
      [CellSnapshot.VARIANT_INITIAL]: {},
      [CellSnapshot.VARIANT_ANIMATE]: {},
      [CellSnapshot.VARIANT_EXIT]: {},
    };
  }
}
