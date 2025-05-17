import { GameLevel } from '../game-level/game-level.enum';

export abstract class CellPosition {
  abstract getRow(): number;
  abstract getColumn(): number;
  abstract equals(_position: CellPosition): boolean;
  abstract toString(): string;

  abstract getAdjacentPositions(_gameLevel: GameLevel): Iterable<CellPosition>;
}
