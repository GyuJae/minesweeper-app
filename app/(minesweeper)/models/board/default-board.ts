import { Cell } from '../cell/cell.abstract';
import { CellCollection } from '../cell-collection/cell-collections.abstract';
import { CellPosition } from '../cell-position/cell-position.abstract';
import { CellPositionCollection } from '../cell-position-collection/cell-position-collection.abstract';
import { GameLevel } from '../game-level/game-level.enum';
import { Board } from './board.abstract';

export class DefaultBoard extends Board {
  private constructor(private readonly _gameLevel: GameLevel, private readonly _cells: CellCollection) {
    super();
  }

  static of(gameLevel: GameLevel, cells: CellCollection): DefaultBoard {
    return new DefaultBoard(gameLevel, cells);
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

  override openCell(position: CellPosition): Board {
    return DefaultBoard.of(this._gameLevel, this._cells.openCell(position));
  }

  override isOpenedCell(position: CellPosition): boolean {
    return this._cells.isOpenedCell(position);
  }

  override getUnOpenedMineCount(): number {
    return this._cells.getUnOpenedMineCount();
  }

  override getNumberPositions(): CellPositionCollection {
    return this._cells.getNumberPositions();
  }

  override findCellByPosition(cellPosition: CellPosition): Cell {
    return this._cells.findCellByPosition(cellPosition);
  }
}
