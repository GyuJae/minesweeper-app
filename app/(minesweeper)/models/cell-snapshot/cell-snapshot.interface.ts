import { ReactNode } from 'react';

export interface CellSnapshot {
  getContent(): ReactNode;
  getButtonVariant(): 'secondary' | 'ghost';
  getName(): string;
}
