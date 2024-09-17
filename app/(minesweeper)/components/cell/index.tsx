'use client';

import React, { MouseEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';

import { Cell as CellModel } from '../../models/cell/cell.abstract';
import { GameLevel } from '../../models/game-level/game-level.enum';

interface Properties {
  cell: CellModel;
  gameLevel: GameLevel;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onContextMenu: MouseEventHandler<HTMLButtonElement>;
}

const Cell = ({ cell, gameLevel, onClick, onContextMenu }: Properties) => {
  return (
    <Button
      variant={cell.getSnapshot().getButtonVariant()}
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={cn('min-h-full min-w-full font-semibold rounded-none', {
        'size-24 text-3xl': GameLevel.VERY_EASY.equals(gameLevel),
        'size-16 text-2xl': GameLevel.EASY.equals(gameLevel),
        'size-12 text-xl': GameLevel.NORMAL.equals(gameLevel),
        'size-10 text-lg': GameLevel.HARD.equals(gameLevel),
        'text-blue-600': cell.isSafeCell() && cell.getNearbyMineCount() === 1,
        'text-green-600': cell.isSafeCell() && cell.getNearbyMineCount() === 2,
        'text-red-600': cell.isSafeCell() && cell.getNearbyMineCount() === 3,
        'text-slate-700': cell.isSafeCell() && cell.getNearbyMineCount() >= 4,
      })}
      aria-label={CellModel.name}
    >
      {cell.getContent()}
    </Button>
  );
};

export default Cell;
