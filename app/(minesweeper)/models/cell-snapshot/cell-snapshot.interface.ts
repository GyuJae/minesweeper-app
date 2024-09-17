import { Variants } from 'framer-motion';
import { ReactNode } from 'react';

export abstract class CellSnapshot {
  static VARIANT_INITIAL: string = 'initial';
  static VARIANT_ANIMATE: string = 'animate';
  static VARIANT_EXIT: string = 'exit';

  abstract getContent(): ReactNode;
  abstract getButtonVariant(): 'secondary' | 'ghost';
  abstract getName(): string;
  abstract getAnimationVariant(): Variants;
}
