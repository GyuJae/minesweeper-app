import { Variants } from 'framer-motion';
import { ReactNode } from 'react';

import { CellSnapshot } from './cell-snapshot.interface';

export class FlowerCellSnapshot implements CellSnapshot {
  private static FLORAL_EMOJIS = ['🌸', '🌼', '🌻', '🌺', '🌹', '🌷', '💐'];

  static of(): FlowerCellSnapshot {
    return new FlowerCellSnapshot();
  }

  getContent(): ReactNode {
    return FlowerCellSnapshot.FLORAL_EMOJIS[Math.floor(Math.random() * FlowerCellSnapshot.FLORAL_EMOJIS.length)];
  }
  getButtonVariant(): 'secondary' {
    return 'secondary';
  }

  getName(): string {
    return FlowerCellSnapshot.name;
  }

  getAnimationVariant(): Variants {
    return {
      [CellSnapshot.VARIANT_INITIAL]: {},
      [CellSnapshot.VARIANT_ANIMATE]: {},
      [CellSnapshot.VARIANT_EXIT]: {},
    };
  }
}
