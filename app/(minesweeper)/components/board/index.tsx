'use client';

import React, { FC } from 'react';

import { cn } from '@/libs/utils';

import { Board as BoardModel } from '../../domains/board/board.abstract';
import { Cell as CellModel } from '../../domains/cell/cell.abstract';
import { GameLevel } from '../../domains/game-level/game-level.enum';
import Cell from '../cell';

interface Properties {
  board: BoardModel;
  onClickCell: (_cell: CellModel) => void;
  onContextMenuCell: (_cell: CellModel) => void;
}

const Board: FC<Properties> = ({ board, onClickCell, onContextMenuCell }) => {
  return (
    <table className='border-collapse border'>
      <tbody
        className={cn('grid', {
          'grid-rows-4': GameLevel.VERY_EASY.equals(board.getGameLevel()),
          'gird-rows-9': GameLevel.EASY.equals(board.getGameLevel()),
          'grid-rows-16': GameLevel.NORMAL.equals(board.getGameLevel()),
          'gird-rows-16': GameLevel.HARD.equals(board.getGameLevel()),
        })}
      >
        {board.getRows().map((row) => (
          <tr
            key={row[0].getPosition().getRow()}
            className={cn('grid', {
              'grid-cols-4': GameLevel.VERY_EASY.equals(board.getGameLevel()),
              'grid-cols-9': GameLevel.EASY.equals(board.getGameLevel()),
              'grid-cols-16': GameLevel.NORMAL.equals(board.getGameLevel()),
              'grid-cols-30': GameLevel.HARD.equals(board.getGameLevel()),
            })}
          >
            {row.map((cell) => (
              <td key={cell.getPosition().toString()} className='border'>
                <Cell
                  cell={cell}
                  gameLevel={board.getGameLevel()}
                  onClick={() => onClickCell(cell)}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    onContextMenuCell(cell);
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Board;
