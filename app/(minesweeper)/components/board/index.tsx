'use client';

import React, { FC, useState } from 'react';

import { Board as BoardModel } from '../../models/board/board.abstract';
import { Cell as CellModel } from '../../models/cell/cell.abstract';
import Cell from '../cell';

interface Properties {
  defaultBoard: BoardModel;
}

// TODO GameLevel에 맞게 grid 설정 필요
const Board: FC<Properties> = ({ defaultBoard }) => {
  const [board, setBoard] = useState(defaultBoard);

  const onClickCell = (cell: CellModel) => {
    const newBoard = board.openCell(cell.getPosition());
    setBoard(newBoard);
  };

  return (
    <table>
      <tbody className='grid size-96 grid-cols-1 grid-rows-4'>
        {board
          .getCells()
          .getRows()
          .map((row) => (
            <tr key={row[0].getPosition().getRow()} className='grid grid-cols-4'>
              {row.map((cell) => (
                <td key={cell.getPosition().toString()} className='p-0'>
                  <Cell cell={cell} onClick={() => onClickCell(cell)} role='button' />
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Board;
