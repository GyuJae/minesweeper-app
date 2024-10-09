import { Cell } from '../cell/cell.abstract';
import { CellPosition } from '../cell-position/cell-position.abstract';
import { GridCellPosition } from '../cell-position/grid-cell-position';

export abstract class CellCollection {
  abstract getFlagCount(): number;
  abstract unFlag(_position: GridCellPosition): CellCollection;
  abstract flag(_position: GridCellPosition): CellCollection;
  abstract findCellByPosition(_cellPosition: CellPosition): Cell;
  abstract isOpenedCell(_position: CellPosition): boolean;
  abstract hasUnopenedMines(): boolean;
  abstract isAllClosed(): boolean;
  abstract openCell(_position: CellPosition): CellCollection;
  abstract getRowSize(): number;
  abstract getColumnSize(): number;
  abstract hasOpenedMineCell(): boolean;
  abstract isAllSafeCellsOpened(): boolean;
  abstract getRows(): Iterable<Iterable<Cell>>;
  abstract isFirstOpenedCell(): boolean;
  abstract changeAllMineCellsToFlowers(): CellCollection;
}
