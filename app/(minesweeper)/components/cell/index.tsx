import React from 'react';

import { Cell as CellModel } from '../../models/cell/cell.abstract';

interface Properties {
  cell: CellModel;
}

const Cell = ({ cell }: Properties) => {
  return <button aria-label={CellModel.name} role='button'></button>;
};

export default Cell;
