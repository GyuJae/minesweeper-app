import { ReactNode } from 'react';

import { GridCellCollection } from '../cell-collection/grid-cell-collection';
import { GridCellPosition } from '../cell-position/grid-cell-position';
import { CellSnapshot } from '../cell-snapshot/cell-snapshot.interface';
import { ClosedCellSnapshot } from '../cell-snapshot/closed-cell-snapshot';
import { FlaggedCellSnapshot } from '../cell-snapshot/flagged-cell-snapshot';
import { OpenedEmptyCellSnapshot } from '../cell-snapshot/opened-empty-cell-snapshot';
import { OpenedMineCellSnapshot } from '../cell-snapshot/opened-mine-cell-snapshot';
import { OpenedNumberCellSnapshot } from '../cell-snapshot/opened-number-cell-snapshot';
import { CellState } from '../cell-state/cell-state.enum';
import { CellType } from '../cell-type/cell-type.abstract';
import { MineCellType } from '../cell-type/mine-cell-type';
import { GameLevel } from '../game-level/game-level.enum';
import { Cell } from './cell.abstract';

export class GridCell extends Cell {
  private constructor(
    private readonly _cellState: CellState,
    private readonly _cellType: CellType,
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

  override isFlagged(): boolean {
    return this._cellState === CellState.FLAGGED;
  }

  override flag(): GridCell {
    return GridCell.of(CellState.FLAGGED, this._cellType, this._position);
  }

  override unFlag(): GridCell {
    return GridCell.of(CellState.CLOSED, this._cellType, this._position);
  }

  override toString(): string {
    return this.isNumber() ? this.getNearbyMineCount().toString() : '';
  }

  override getSnapshot(): CellSnapshot {
    if (this.isFlagged()) return FlaggedCellSnapshot.of();
    if (this.isClosed()) return ClosedCellSnapshot.of();
    if (this.isMine()) return OpenedMineCellSnapshot.of();
    if (this.isNumber()) return OpenedNumberCellSnapshot.of(this);
    return OpenedEmptyCellSnapshot.of();
  }

  override getContent(): ReactNode {
    return this.getSnapshot().getContent();
  }

  override isFlaggingDisabled(): boolean {
    return this.isOpened();
  }

  override isCellOpeningDisabled(): boolean {
    return this.isOpened() || this.isFlagged();
  }

  override getSnapshotKey(): string {
    return this.getSnapshot().getName();
  }

  override getAdjacentMineCount(cells: GridCellCollection, gameLevel: GameLevel): number {
    return this._position
      .getAdjacentPositions(gameLevel)
      .filter((p) => cells.findCellByPosition(p).isMine())
      .getSize();
  }
}
