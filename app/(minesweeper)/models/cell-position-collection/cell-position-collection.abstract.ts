import { CellPosition } from '../cell-position/cell-position.abstract';

export abstract class CellPositionCollection implements Iterable<CellPosition> {
  abstract getSize(): number;
  abstract add(_position: CellPosition): CellPositionCollection;
  abstract has(_position: CellPosition): boolean;
  abstract toList(): CellPosition[];

  abstract [Symbol.iterator](): Iterator<CellPosition>;

  abstract filter(_predicate: (_position: CellPosition) => boolean): CellPositionCollection;
}
