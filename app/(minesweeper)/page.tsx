'use client';

import dynamic from 'next/dynamic';

import Board from './components/board';
import GameInfoHeader from './components/game-info-header';
import { useMinesweeperBoard } from './context/minesweeper-board.provider';
import { useMinesweeperGameConfig } from './context/minesweeper-game-config.provider';
import { Board as BoardModel } from './domains/board/board.abstract';
import { Cell } from './domains/cell/cell.abstract';
import { ExplosionSound } from './domains/game-sound/explosion-sound';
import { FlagSound } from './domains/game-sound/flag-sound';
import { SuccessSound } from './domains/game-sound/success-sound';
import { GameStatus } from './domains/game-status/game-status.enum';

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
    <div className='relative m-auto flex max-w-max flex-col gap-8 py-24'>
      <GameInfoHeader />
      <div className='relative'>
        {gameConfigContext.gameStatus.isPaused() && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/95'>
            <span>일시정지</span>
          </div>
        )}
        <Board board={boardContext.board} onClickCell={onClickCell} onContextMenuCell={onContextMenuCell} />
      </div>
      {gameConfigContext.gameStatus.isClear() && (
        <ParticleLottie loop={false} className='pointer-events-none absolute inset-0' />
      )}
    </div>
  );
}
