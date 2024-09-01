export abstract class Cell {
  abstract isMine(): boolean;
  abstract isClosed(): boolean;
}
