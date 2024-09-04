export abstract class Cell {
  abstract isOpened(): boolean;
  abstract open(): Cell;
  abstract isMine(): boolean;
  abstract isClosed(): boolean;
  abstract updatedToMine(): Cell;
}
