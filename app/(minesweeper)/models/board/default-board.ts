import { GameLevel } from "../game-level/game-level.enum";
import { Board } from "./board.abstract";

export class DefaultBoard extends Board {
  private constructor(private readonly _gameLevel: GameLevel) {
    super();
  }

  static of(gameLevel: GameLevel): Board {
    return new DefaultBoard(gameLevel);
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
}
