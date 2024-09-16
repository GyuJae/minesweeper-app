import React, { MouseEventHandler } from 'react';

import { useMinesweeperBoard } from '../../context/minesweeper-board.provider';
import { useMinesweeperGameConfig } from '../../context/minesweeper-game-config.provider';
import { GameStatus } from '../../models/game-status/game-status.enum';

const GameInfoHeader = () => {
  const gameConfigContext = useMinesweeperGameConfig();
  const boardContext = useMinesweeperBoard();

  const onResetBoard: MouseEventHandler<HTMLButtonElement> = () => {
    boardContext.resetByGameLevel(gameConfigContext.gameLevel);
    gameConfigContext.setGameStatus(GameStatus.READY);
  };

  return (
    <div>
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
