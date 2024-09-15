import { Cell } from '../cell/cell.abstract';
import { CellCollection } from '../cell-collection/cell-collections.abstract';
import { GridCellCollection } from '../cell-collection/grid-cell-collection';
import { GridCellPosition } from '../cell-position/grid-cell-position';
import { GameLevel } from '../game-level/game-level.enum';
import { Board } from './board.abstract';

export class DefaultBoard extends Board {
  private constructor(private readonly _gameLevel: GameLevel, private readonly _cells: GridCellCollection) {
    super();
  }

  static of(gameLevel: GameLevel, cells?: GridCellCollection): DefaultBoard {
    return new DefaultBoard(gameLevel, cells ?? GridCellCollection.of(gameLevel));
  }

  override getCandidateMineCount(): number {
    return this._gameLevel.getMineCount();
  }

  override getColumnSize(): number {
    return this._gameLevel.getColumnSize();
  }

  override getRowSize(): number {
    return this._gameLevel.getRowSize();
  }

  override isAllClosed(): boolean {
    return this._cells.isAllClosed();
  }

  override hasUnopenedMines(): boolean {
    return this._cells.hasUnopenedMines();
  }

  override openCell(position: GridCellPosition): Board {
    return DefaultBoard.of(this._gameLevel, this._cells.openCell(position));
  }

  override isOpenedCell(position: GridCellPosition): boolean {
    return this._cells.isOpenedCell(position);
  }

  override getUnOpenedMineCount(): number {
    return this._cells.getUnOpenedMineCount();
  }

  override findCellByPosition(cellPosition: GridCellPosition): Cell {
    return this._cells.findCellByPosition(cellPosition);
  }

  override getCells(): CellCollection {
    return this._cells;
  }

  override isGameOver(): boolean {
    return this._cells.hasOpenedMineCell();
  }

  override isGameClear(): boolean {
    return this._cells.areAllSafeCellsOpened();
  }

  override flag(position: GridCellPosition): DefaultBoard {
    return DefaultBoard.of(this._gameLevel, this._cells.flag(position));
  }

  override unflag(position: GridCellPosition): DefaultBoard {
    return DefaultBoard.of(this._gameLevel, this._cells.unflag(position));
  }

  override getRemainingFlagCount(): number {
    return this._gameLevel.getMineCount() - this._cells.getFlagCount();
  }

  override getGameLevel(): GameLevel {
    return this._gameLevel;
  }

  override ifFirstOpenedCell(callback: () => void): DefaultBoard {
    if (this._cells.isFirstOpenedCell()) callback();
    return this;
  }
}
