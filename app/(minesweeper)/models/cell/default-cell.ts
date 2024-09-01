import { CellState } from "../cell-state/cell-state.enum";
import { CellType } from "../cell-type/cell-type.abstract";
import { Cell } from "./cell.abtract";

export class DefaultCell extends Cell {
  private constructor(
    private readonly _cellState: CellState,
    private _cellType: CellType
  ) {
    super();
  }

  static of(cellState: CellState, cellType: CellType): Cell {
    return new DefaultCell(cellState, cellType);
  }

  isClosed(): boolean {
    return this._cellState === CellState.CLOSED;
  }

  isMine(): boolean {
    return this._cellType.isMine();
  }
}
