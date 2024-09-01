import { CellState } from "../cell-state/cell-state.enum";
import { Cell } from "./cell.abtract";

export class DefaultCell extends Cell {
  private constructor(private readonly _cellState: CellState) {
    super();
  }

  static of(cellState: CellState): Cell {
    return new DefaultCell(cellState);
  }

  isClosed(): boolean {
    return this._cellState === CellState.CLOSED;
  }
}
