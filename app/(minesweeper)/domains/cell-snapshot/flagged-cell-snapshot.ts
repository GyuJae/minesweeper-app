import { Variants } from 'framer-motion';
import { ReactNode } from 'react';

import { CellSnapshot } from './cell-snapshot.interface';

export class FlaggedCellSnapshot implements CellSnapshot {
  static of(): FlaggedCellSnapshot {
    return new FlaggedCellSnapshot();
  }

  getContent(): ReactNode {
    return '🚩';
  }

  getButtonVariant(): 'ghost' {
    return 'ghost';
  }

  getName(): string {
    return FlaggedCellSnapshot.name;
  }

  getAnimationVariant(): Variants {
    const randomX = Math.random() > 0.5 ? 20 : -20;
    const randomRotation = Math.random() > 0.5 ? 45 : -45;

    return {
      [CellSnapshot.VARIANT_INITIAL]: {
        y: -5,
        opacity: 0,
      },
      [CellSnapshot.VARIANT_ANIMATE]: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      [CellSnapshot.VARIANT_EXIT]: {
        y: -50,
        x: randomX,
        scale: 0.2,
        rotate: randomRotation,
        transition: { duration: 0.3 },
      },
    };
  }
}
