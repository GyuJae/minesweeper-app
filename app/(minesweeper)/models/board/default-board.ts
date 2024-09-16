import { GameException } from '../../exceptions/game-exception';
import { Cell } from '../cell/cell.abstract';
import { CellCollection } from '../cell-collection/cell-collections.abstract';
import { GridCellCollection } from '../cell-collection/grid-cell-collection';
import { GridCellPosition } from '../cell-position/grid-cell-position';
import { GameLevel } from '../game-level/game-level.enum';
import { Board } from './board.abstract';

export class DefaultBoard extends Board {
  private constructor(
    private readonly _gameLevel: GameLevel,
    private readonly _cells: GridCellCollection,
    private readonly _gameException?: GameException,
  ) {
    super();
  }

  static of(gameLevel: GameLevel, cells?: GridCellCollection, gameException?: GameException): DefaultBoard {
    return new DefaultBoard(gameLevel, cells ?? GridCellCollection.of(gameLevel), gameException ?? undefined);
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
    try {
      return DefaultBoard.of(this._gameLevel, this._cells.openCell(position));
    } catch (error) {
      if (error instanceof GameException) return this._copyWithGameException(error);
      throw error;
    }
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

  override toggleFlag(position: GridCellPosition): DefaultBoard {
    try {
      return this.findCellByPosition(position).isFlagged() ? this._unFlag(position) : this._flag(position);
    } catch (error) {
      if (error instanceof GameException) return this._copyWithGameException(error);
      throw error;
    }
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

  override ifGameOver(callback: () => void): DefaultBoard {
    if (this.isGameOver()) callback();
    return this;
  }

  override ifGameClear(callback: () => void): DefaultBoard {
    if (this.isGameClear()) callback();
    return this;
  }

  override ifThrowGameException(callback: (_exception: GameException) => void): DefaultBoard {
    if (this._gameException) callback(this._gameException);
    return this;
  }

  override hasNoFlagsLeft(): boolean {
    return this.getRemainingFlagCount() <= 0;
  }
  private _flag(position: GridCellPosition): DefaultBoard {
    if (this.hasNoFlagsLeft()) throw GameException.of('지뢰 수 초과하여 깃발을 꽂을 수 없습니다.');
    return DefaultBoard.of(this._gameLevel, this._cells.flag(position));
  }

  private _unFlag(position: GridCellPosition): DefaultBoard {
    return DefaultBoard.of(this._gameLevel, this._cells.unFlag(position));
  }

  private _copyWithGameException(gameException: GameException): DefaultBoard {
    return DefaultBoard.of(this._gameLevel, this._cells, gameException);
  }
}
