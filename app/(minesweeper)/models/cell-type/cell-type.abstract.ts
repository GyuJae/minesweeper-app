export abstract class CellType {
  abstract getNearbyMineCount(): number;

  abstract isMine(): boolean;

  abstract isNumber(): boolean;

  abstract isEmpty(): boolean;
}
