import { CellCollection } from '../cell-collection/cell-collections.abstract';
import { CellPosition } from '../cell-position/cell-position.abstract';
import { GameLevel } from '../game-level/game-level.enum';
import { Board } from './board.abstract';

export class DefaultBoard extends Board {
  private constructor(private readonly _gameLevel: GameLevel, private readonly _cells: CellCollection) {
    super();
  }

  static of(gameLevel: GameLevel, cells: CellCollection): Board {
    return new DefaultBoard(gameLevel, cells);
  }

  getCandidateMineCount(): number {
    return this._gameLevel.getMineCount();
  }

  getColumnSize(): number {
    return this._gameLevel.getColumnSize();
  }

  getRowSize(): number {
    return this._gameLevel.getRowSize();
  }

  isAllClosed(): boolean {
    return this._cells.isAllClosed();
  }

  hasUnopenedMines(): boolean {
    return this._cells.hasUnopenedMines();
  }

  openCell(position: CellPosition): Board {
    return DefaultBoard.of(this._gameLevel, this._cells.openCell(position));
  }

  isOpenedCell(position: CellPosition): boolean {
    return this._cells.isOpenedCell(position);
  }

  getUnOpenedMineCount(): number {
    return this._cells.getUnOpenedMineCount();
  }
}
