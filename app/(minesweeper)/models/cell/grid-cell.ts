import { GridCellPosition } from '../cell-position/grid-cell-position';
import { CellState } from '../cell-state/cell-state.enum';
import { CellType } from '../cell-type/cell-type.abstract';
import { MineCellType } from '../cell-type/mine-cell-type';
import { Cell } from './cell.abstract';

export class GridCell extends Cell {
  private constructor(
    private readonly _cellState: CellState,
    private _cellType: CellType,
    private readonly _position: GridCellPosition,
  ) {
    super();
  }

  static of(cellState: CellState, cellType: CellType, position: GridCellPosition): GridCell {
    return new GridCell(cellState, cellType, position);
  }

  override isClosed(): boolean {
    return this._cellState === CellState.CLOSED;
  }

  override isMine(): boolean {
    return this._cellType.isMine();
  }

  override isOpened(): boolean {
    return this._cellState === CellState.OPENED;
  }

  override isNumber(): boolean {
    return this._cellType.isNumber();
  }

  override open(): GridCell {
    return GridCell.of(CellState.OPENED, this._cellType, this._position);
  }

  override updatedToMine(): GridCell {
    return GridCell.of(this._cellState, MineCellType.of(), this._position);
  }

  override getPosition(): GridCellPosition {
    return this._position;
  }

  override getState(): CellState {
    return this._cellState;
  }

  override getNearbyMineCount(): number {
    return this._cellType.getNearbyMineCount();
  }
}
