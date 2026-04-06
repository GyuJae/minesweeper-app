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
      [CellSnapshot.VARIANT_INITIAL]: {
        scale: 0.5,
        opacity: 0,
        rotate: -45,
      },
      [CellSnapshot.VARIANT_ANIMATE]: {
        scale: [1, 1.5, 1],
        opacity: 1,
        rotate: 0,
        transition: {
          duration: 0.5,
          times: [0, 0.5, 1],
        },
      },
      [CellSnapshot.VARIANT_EXIT]: {
        scale: 2,
        opacity: 0,
      },
    };
  }
}
