import { CellCollection } from "../cell-collection/cell-collections.abstract";
import { CellGrid } from "../cell-collection/cell-grid";
import { GameLevel } from "../game-level/game-level.enum";
import { Board } from "./board.abstract";

export class DefaultBoard extends Board {
  private constructor(
    private readonly _gameLevel: GameLevel,
    private readonly _cells: CellCollection
  ) {
    super();
  }

  static of(gameLevel: GameLevel): Board {
    return new DefaultBoard(gameLevel, CellGrid.of(gameLevel));
  }

  getCandiateMineCount(): number {
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
}
