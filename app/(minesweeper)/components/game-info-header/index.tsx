import React, { MouseEventHandler } from 'react';

import { useMinesweeperBoard } from '../../context/minesweeper-board.provider';
import { useMinesweeperGameConfig } from '../../context/minesweeper-game-config.provider';
import { GameLevel } from '../../models/game-level/game-level.enum';
import { GameStatus } from '../../models/game-status/game-status.enum';
import GameLevelSelect from '../game-level-select';

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
    <div>
      <GameLevelSelect
        options={GameLevel.findAllLevels()}
        onChangeLevel={onChangeGameLevel}
        selectedOption={gameConfigContext.gameLevel}
      />
      <div>
        {gameConfigContext.gameStatus.getName()} {gameConfigContext.overSeconds}
      </div>
      <div>
        {gameConfigContext.gameStatus.showResetButton() && (
          <button type='button' onClick={onResetBoard}>
            Reset
          </button>
        )}
      </div>
      <div>남은 깃발 수: {boardContext.board.getRemainingFlagCount()}</div>
    </div>
  );
};

export default GameInfoHeader;
