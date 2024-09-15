import { ReactNode } from 'react';

export interface CellSnapshot {
  // TODO REMOVE
  getClassname(): string;
  getContent(): ReactNode;
}
