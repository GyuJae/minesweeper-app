import React, { MouseEventHandler } from 'react';

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

  const onResetBoard: MouseEventHandler<HTMLButtonElement> = () => {
    boardContext.resetByGameLevel(gameConfigContext.gameLevel);
    gameConfigContext.setGameStatus(GameStatus.READY);
  };

  return (
    <header>
      <nav>
        <GameLevelSelect
          options={GameLevel.findAllLevels()}
          onChangeLevel={onChangeGameLevel}
          selectedOption={gameConfigContext.gameLevel}
        />
      </nav>
      <section>
        <p>
          {gameConfigContext.gameStatus.getName()} {gameConfigContext.overSeconds}
        </p>
        {gameConfigContext.gameStatus.showResetButton() && (
          <button type='button' onClick={onResetBoard}>
            Reset
          </button>
        )}
        <p>남은 깃발 수: {boardContext.board.getRemainingFlagCount()}</p>
      </section>
    </header>
  );
};

export default GameInfoHeader;
