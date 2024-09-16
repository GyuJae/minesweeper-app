import React from 'react';

import { useMinesweeperBoard } from '../../context/minesweeper-board.provider';
import { useMinesweeperGameConfig } from '../../context/minesweeper-game-config.provider';
import { GameLevel } from '../../models/game-level/game-level.enum';
import { GameStatus } from '../../models/game-status/game-status.enum';
import GameLevelSelect from './game-level-select';

const GameInfoHeader = () => {
  const gameConfigContext = useMinesweeperGameConfig();
  const boardContext = useMinesweeperBoard();

  const onChangeGameLevel = (selectedLevel: GameLevel) => {
    gameConfigContext.setGameLevel(selectedLevel);
    boardContext.resetByGameLevel(selectedLevel);
    gameConfigContext.setGameStatus(GameStatus.READY);
  };

  // const onResetBoard: MouseEventHandler<HTMLButtonElement> = () => {
  //   boardContext.resetByGameLevel(gameConfigContext.gameLevel);
  //   gameConfigContext.setGameStatus(GameStatus.READY);
  // };

  return (
    <header className='flex w-full items-center justify-between py-4'>
      <nav>
        <GameLevelSelect
          options={GameLevel.findAllLevels()}
          onChangeLevel={onChangeGameLevel}
          selectedOption={gameConfigContext.gameLevel}
        />
      </nav>
      <section>
        <p className='text-5xl'>{gameConfigContext.gameStatus.getEmoji()}</p>
      </section>
      <section className='flex gap-4 text-lg'>
        <p>🕰️ {gameConfigContext.overSeconds}</p>
        <p>🚩 {boardContext.board.getRemainingFlagCount()}</p>
      </section>
    </header>
  );
};

export default GameInfoHeader;
