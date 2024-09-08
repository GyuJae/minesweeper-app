export abstract class CellPosition {
  abstract getRow(): number;
  abstract getColumn(): number;
  abstract equals(_position: CellPosition): boolean;

  abstract toString(): string;
}
