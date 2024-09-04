import { CellPosition } from "../cell-position/cell-position.abstract";

export abstract class CellPositionCollection {
  abstract getSize(): number;
  abstract add(_position: CellPosition): CellPositionCollection;
  abstract has(_position: CellPosition): boolean;
  abstract toList(): CellPosition[];
}
