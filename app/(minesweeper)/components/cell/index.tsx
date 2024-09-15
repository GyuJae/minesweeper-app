'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { cn } from '@/libs/utils';

import { Cell as CellModel } from '../../models/cell/cell.abstract';
import { GameLevel } from '../../models/game-level/game-level.enum';
interface Properties {
  cell: CellModel;
  gameLevel: GameLevel;
  onClick: React.HTMLAttributes<HTMLButtonElement>['onClick'];
}

// TODO responsive size
const Cell = ({ cell, gameLevel, onClick }: Properties) => {
  return (
    <motion.button
      role='button'
      onClick={onClick}
      className={cn(cell.getClassname(), 'min-h-full min-w-full font-semibold', {
        'size-24 text-3xl': GameLevel.VERY_EASY.equals(gameLevel),
        'size-16 text-2xl': GameLevel.EASY.equals(gameLevel),
        'size-12 text-xl': GameLevel.NORMAL.equals(gameLevel),
        'size-10 text-lg': GameLevel.HARD.equals(gameLevel),
      })}
      aria-label={CellModel.name}
    >
      {cell.getContent()}
    </motion.button>
  );
};

export default Cell;
