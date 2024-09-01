export abstract class Board {
  abstract getCandiateMineCount(): number;
  abstract getColumnSize(): number;
  abstract getRowSize(): number;
  abstract isAllClosed(): boolean;
  abstract hasUnopenedMines(): boolean;
}
