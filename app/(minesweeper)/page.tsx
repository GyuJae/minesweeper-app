'use client';

import dynamic from 'next/dynamic';

import Board from './components/board';
import GameInfoHeader from './components/game-info-header';
import { useMinesweeperBoard } from './context/minesweeper-board.provider';
import { useMinesweeperGameConfig } from './context/minesweeper-game-config.provider';
import { Board as BoardModel } from './models/board/board.abstract';
import { Cell } from './models/cell/cell.abstract';
import { ExplosionSound } from './models/game-sound/explosion-sound';
import { FlagSound } from './models/game-sound/flag-sound';
import { SuccessSound } from './models/game-sound/success-sound';
import { GameStatus } from './models/game-status/game-status.enum';

const ParticleLottie = dynamic(() => import('./components/particle-lottie'), { ssr: false });

export default function Minesweeper() {
  const gameConfigContext = useMinesweeperGameConfig();
  const boardContext = useMinesweeperBoard();

  const onClickCell = (cell: Cell) => {
    if (gameConfigContext.gameStatus.isDisabledClickCell()) return;

    const newBoard = boardContext.board
      .openCell(cell.getPosition())
      .ifThrowGameException(() => ExplosionSound.of().play())
      .ifNotThrowGameException(() => cell.playSound())
      .ifFirstOpenedCell(() => gameConfigContext.setGameStatus(GameStatus.PLAYING))
      .ifGameOver(() => gameConfigContext.setGameStatus(GameStatus.GAME_OVER))
      .ifGameClear((board: BoardModel) => {
        SuccessSound.of().play();
        gameConfigContext.setGameStatus(GameStatus.CLEAR);
        return board.changeAllMineCellsToFlowers();
      });
    boardContext.setBoard(newBoard);
  };

  const onContextMenuCell = (cell: Cell) => {
    if (gameConfigContext.gameStatus.isDisabledClickCell()) return;

    boardContext
      .toggleFlag(cell.getPosition())
      .ifThrowGameException(() => ExplosionSound.of().play())
      .ifNotThrowGameException(() => FlagSound.of().play());
  };

  return (
    <div className='relative m-auto flex max-w-max flex-col py-24'>
      <GameInfoHeader />
      <Board board={boardContext.board} onClickCell={onClickCell} onContextMenuCell={onContextMenuCell} />
      {gameConfigContext.gameStatus.isClear() && (
        <ParticleLottie loop={false} className='pointer-events-none absolute inset-0' />
      )}
    </div>
  );
}
