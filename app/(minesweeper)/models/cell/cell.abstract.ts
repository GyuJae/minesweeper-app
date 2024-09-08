import { CellPosition } from '../cell-position/cell-position.abstract';
import { CellState } from '../cell-state/cell-state.enum';

export abstract class Cell {
  abstract getNearbyMineCount(): number;
  abstract getState(): CellState;
  abstract getPosition(): CellPosition;
  abstract isNumber(): boolean;
  abstract isOpened(): boolean;
  abstract open(): Cell;
  abstract isMine(): boolean;
  abstract isClosed(): boolean;
  abstract updatedToMine(): Cell;

  isSafeCell(): boolean {
    return !this.isMine();
  }
}
