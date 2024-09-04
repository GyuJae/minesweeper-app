import { CellState } from '../cell-state/cell-state.enum';
import { CellType } from '../cell-type/cell-type.abstract';
import { MineCellType } from '../cell-type/mine-cell-type';
import { Cell } from './cell.abstract';

export class DefaultCell extends Cell {
  private constructor(private readonly _cellState: CellState, private _cellType: CellType) {
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

  isOpened(): boolean {
    return this._cellState === CellState.OPENED;
  }

  open(): Cell {
    return DefaultCell.of(CellState.OPENED, this._cellType);
  }

  updatedToMine(): Cell {
    return DefaultCell.of(this._cellState, MineCellType.of());
  }
}
