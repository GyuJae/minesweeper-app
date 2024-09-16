import { ReactNode } from 'react';

export interface CellSnapshot {
  // TODO REMOVE
  getClassName(): string;
  getContent(): ReactNode;
}
