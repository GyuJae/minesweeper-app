import { GameException } from '../../exceptions/game-exception';
import { Cell } from '../cell/cell.abstract';
import { CellCollection } from '../cell-collection/cell-collections.abstract';
import { CellPosition } from '../cell-position/cell-position.abstract';
import { GameLevel } from '../game-level/game-level.enum';

export abstract class Board {
  abstract toggleFlag(_position: CellPosition): Board;
  abstract findCellByPosition(_cellPosition: CellPosition): Cell;
  abstract isOpenedCell(_position: CellPosition): boolean;
  abstract openCell(_position: CellPosition): Board;
  abstract getCandidateMineCount(): number;
  abstract getColumnSize(): number;
  abstract getRowSize(): number;
  abstract isAllClosed(): boolean;
  abstract hasUnopenedMines(): boolean;
  abstract getCells(): CellCollection;
  abstract getRows(): Array<Array<Cell>>;

  abstract isGameOver(): boolean;
  abstract isGameClear(): boolean;
  abstract getRemainingFlagCount(): number;
  abstract getGameLevel(): GameLevel;
  abstract ifFirstOpenedCell(_callback: () => void): Board;
  abstract ifGameOver(_callback: () => void): Board;
  abstract ifGameClear(_callback: (_newBoard: Board) => Board): Board;
  abstract ifThrowGameException(_callback: (_exception: GameException) => void): Board;
  abstract ifNotThrowGameException(_callback: () => void): Board;
  abstract hasNoFlagsLeft(): boolean;
  abstract changeAllMineCellsToFlowers(): Board;
  abstract playSound(_cellPosition: CellPosition): Board;
}
