import { Variants } from 'framer-motion';

import { CellSnapshot } from './cell-snapshot.interface';

export class OpenedEmptyCellSnapshot implements CellSnapshot {
  private constructor() {}

  static of(): OpenedEmptyCellSnapshot {
    return new OpenedEmptyCellSnapshot();
  }

  getContent(): string {
    return '';
  }

  getButtonVariant(): 'ghost' {
    return 'ghost';
  }

  getName(): string {
    return OpenedEmptyCellSnapshot.name;
  }

  getAnimationVariant(): Variants {
    return {
      [CellSnapshot.VARIANT_INITIAL]: {
        scale: 0.8,
        opacity: 0,
      },
      [CellSnapshot.VARIANT_ANIMATE]: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.1 },
      },
      [CellSnapshot.VARIANT_EXIT]: {
        opacity: 0,
      },
    };
  }
}
