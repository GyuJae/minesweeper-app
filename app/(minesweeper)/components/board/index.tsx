import React, { FC } from 'react';

import { Board as BoardModel } from '../../models/board/board.abstract';
import Cell from '../cell';

interface Properties {
  board: BoardModel;
}

const Board: FC<Properties> = ({ board }) => {
  return (
    <div>
      {board
        .getCells()
        .toList()
        .map((cell) => (
          <Cell key={cell.getPosition().toString()} cell={cell} />
        ))}
    </div>
  );
};

export default Board;
