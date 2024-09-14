import { ReactNode } from 'react';

export interface CellSnapshot {
  getClassname(): string;
  getContent(): ReactNode;
}
