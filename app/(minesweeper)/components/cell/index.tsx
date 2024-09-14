'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { Cell as CellModel } from '../../models/cell/cell.abstract';
interface Properties {
  cell: CellModel;
  onClick: React.HTMLAttributes<HTMLButtonElement>['onClick'];
}

// TODO responsive size
const Cell = ({ cell, onClick }: Properties) => {
  return (
    <motion.button role='button' onClick={onClick} className={cell.getClassname()} aria-label={CellModel.name}>
      {cell.getContent()}
    </motion.button>
  );
};

export default Cell;
