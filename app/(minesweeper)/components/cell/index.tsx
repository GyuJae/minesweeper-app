'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { cn } from '@/libs/utils';

import { Cell as CellModel } from '../../models/cell/cell.abstract';
interface Properties {
  cell: CellModel;
  onClick: React.HTMLAttributes<HTMLButtonElement>['onClick'];
}

// TODO responsive size
// TODO !cell.isMine() 체크 하는 부분 더 좋은 방법 생각하기
const Cell = ({ cell, onClick }: Properties) => {
  const index = cell.getPosition().getColumn() + cell.getPosition().getRow();
  const isOdd = index % 2 !== 0;
  const isEven = index % 2 === 0;
  return (
    <motion.button
      role='button'
      aria-label={CellModel.name}
      onClick={onClick}
      className={cn('size-full text-4xl font-semibold', {
        'bg-green-400': isEven && cell.isClosed(),
        'bg-green-500': isOdd && cell.isClosed(),
        'bg-amber-50': isEven && cell.isOpened(),
        'bg-amber-100': isOdd && cell.isOpened(),
        'text-blue-600': !cell.isMine() && cell.getNearbyMineCount() === 1,
        'text-green-600': !cell.isMine() && cell.getNearbyMineCount() === 2,
        'text-red-600': !cell.isMine() && cell.getNearbyMineCount() === 3,
        'text-slate-700': !cell.isMine() && cell.getNearbyMineCount() >= 4,
      })}
    >
      {cell.isOpened() ? cell.toString() : ''}
      {cell.isOpened() && cell.isMine() ? '💣' : ''}
    </motion.button>
  );
};

export default Cell;
