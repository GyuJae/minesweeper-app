import { ReactNode } from 'react';

import { CellPosition } from '../cell-position/cell-position.abstract';
import { CellSnapshot } from '../cell-snapshot/cell-snapshot.interface';
import { CellState } from '../cell-state/cell-state.enum';

export abstract class Cell {
  abstract isFlagged(): boolean;
  abstract getNearbyMineCount(): number;
  abstract getState(): CellState;
  abstract getPosition(): CellPosition;
  abstract isNumber(): boolean;
  abstract isOpened(): boolean;
  abstract open(): Cell;
  abstract isMine(): boolean;
  abstract isClosed(): boolean;
  abstract isFlower(): boolean;
  abstract updatedToMine(): Cell;
  abstract flag(): Cell;
  abstract unFlag(): Cell;
  abstract getSnapshot(): CellSnapshot;
  abstract getContent(): ReactNode;
  abstract isFlaggingDisabled(): boolean;
  abstract isCellOpeningDisabled(): boolean;
  abstract getSnapshotKey(): string;
  abstract getAdjacentMineCount(..._arguments: any): number;
  abstract markAsFlower(): Cell;
  abstract playSound(): void;
  abstract isSafeCell(): boolean;
  abstract disabledOpening(): boolean;
}
