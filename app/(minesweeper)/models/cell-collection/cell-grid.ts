import { Cell } from "../cell/cell.abtract";
import { DefaultCell } from "../cell/default-cell";
import { CellState } from "../cell-state/cell-state.enum";
import { GameLevel } from "../game-level/game-level.enum";
import { CellCollection } from "./cell-collections.abstract";

export class CellGrid extends CellCollection {
  private constructor(
    private readonly _gameLevel: GameLevel,
    private readonly _cells: Cell[][]
  ) {
    super();
  }

  isAllClosed(): boolean {
    return this._cells.every((row) => row.every((cell) => cell.isClosed()));
  }

  static of(gameLevel: GameLevel): CellCollection {
    return new CellGrid(
      gameLevel,
      Array.from({ length: gameLevel.getRowSize() }, () =>
        Array.from({ length: gameLevel.getColumnSize() }, () =>
          DefaultCell.of(CellState.CLOSED)
        )
      )
    );
  }
}
