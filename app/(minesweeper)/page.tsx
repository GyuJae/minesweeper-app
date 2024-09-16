'use client';

import Board from './components/board';
import GameInfoHeader from './components/game-info-header';
import { useMinesweeperBoard } from './context/minesweeper-board.provider';
import { useMinesweeperGameConfig } from './context/minesweeper-game-config.provider';
import { Cell } from './models/cell/cell.abstract';
import { GameStatus } from './models/game-status/game-status.enum';

export default function Minesweeper() {
  const gameConfigContext = useMinesweeperGameConfig();
  const boardContext = useMinesweeperBoard();

  const onClickCell = (cell: Cell) => {
    if (gameConfigContext.gameStatus.isDisabledClickCell()) return;

    boardContext
      .openCell(cell.getPosition())
      .ifThrowGameException((exception) => console.log(exception.message)) // TODO 알림음 추가
      .ifFirstOpenedCell(() => gameConfigContext.setGameStatus(GameStatus.PLAYING))
      .ifGameOver(() => gameConfigContext.setGameStatus(GameStatus.GAME_OVER))
      .ifGameClear(() => gameConfigContext.setGameStatus(GameStatus.CLEAR));
  };

  const onContextMenuCell = (cell: Cell) => {
    if (gameConfigContext.gameStatus.isDisabledClickCell()) return;
    boardContext.toggleFlag(cell.getPosition()).ifThrowGameException((exception) => console.log(exception.message)); // TODO 알림음 추가
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <GameInfoHeader />
      <Board board={boardContext.board} onClickCell={onClickCell} onContextMenuCell={onContextMenuCell} />
    </div>
  );
}
