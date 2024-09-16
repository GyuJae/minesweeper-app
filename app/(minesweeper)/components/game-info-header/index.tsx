import React from 'react';

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';

import { useMinesweeperBoard } from '../../context/minesweeper-board.provider';
import { useMinesweeperGameConfig } from '../../context/minesweeper-game-config.provider';
import { GameLevel } from '../../models/game-level/game-level.enum';
import { GameStatus } from '../../models/game-status/game-status.enum';
import GameLevelSelect from './game-level-select';

const GameInfoHeader = () => {
  const gameConfigContext = useMinesweeperGameConfig();
  const boardContext = useMinesweeperBoard();

  const onChangeLevel = (selectedLevel: GameLevel) => {
    gameConfigContext.setGameLevel(selectedLevel);
    boardContext.resetByGameLevel(selectedLevel);
    gameConfigContext.setGameStatus(GameStatus.READY);
  };

  const onRestart = () => {
    boardContext.resetByGameLevel(gameConfigContext.gameLevel);
    gameConfigContext.setGameStatus(GameStatus.READY);
  };

  const onPaused = () => {
    gameConfigContext.setGameStatus(GameStatus.PAUSED);
  };

  return (
    <header className='flex w-full items-center justify-between py-4'>
      <nav>
        <GameLevelSelect
          options={GameLevel.findAllLevels()}
          onChangeLevel={onChangeLevel}
          selectedOption={gameConfigContext.gameLevel}
        />
      </nav>

      <section>
        <ContextMenu>
          <ContextMenuTrigger>
            <p className='text-5xl'>{gameConfigContext.gameStatus.getEmoji()}</p>
          </ContextMenuTrigger>
          <ContextMenuContent className='w-64'>
            <ContextMenuItem inset onClick={onRestart}>
              처음부터
            </ContextMenuItem>
            <ContextMenuItem
              inset
              disabled={!GameStatus.PLAYING.equals(gameConfigContext.gameStatus)}
              onClick={onPaused}
            >
              일시정지
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </section>
      <section className='grid grid-cols-2 gap-4 text-lg'>
        <p>🕰️ {gameConfigContext.overSeconds}</p>
        <p>🚩 {boardContext.board.getRemainingFlagCount()}</p>
      </section>
    </header>
  );
};

export default GameInfoHeader;
