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
      [CellSnapshot.VARIANT_INITIAL]: {},
      [CellSnapshot.VARIANT_ANIMATE]: {},
      [CellSnapshot.VARIANT_EXIT]: {},
    };
  }
}
