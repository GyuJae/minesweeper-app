'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { MouseEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';

import { Cell as CellModel } from '../../domains/cell/cell.abstract';
import { CellSnapshot } from '../../domains/cell-snapshot/cell-snapshot.interface';
import { GameLevel } from '../../domains/game-level/game-level.enum';

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
        'text-pink-600': cell.isSafeCell() && cell.getNearbyMineCount() >= 4,
      })}
      aria-label={`cell-${cell.getPosition().toString()}`}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={cell.getSnapshotKey()}
          variants={cell.getSnapshot().getAnimationVariant()}
          initial={CellSnapshot.VARIANT_INITIAL}
          animate={CellSnapshot.VARIANT_ANIMATE}
          exit={CellSnapshot.VARIANT_EXIT}
          transition={{ duration: 0.3 }}
        >
          {cell.getContent()}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
};

export default Cell;
