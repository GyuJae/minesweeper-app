'use client';

import Board from './components/board';
import GameLevelSelect from './components/game-level-select';
import { useMinesweeperBoard } from './context/minesweeper-board.provider';
import { useMinesweeperGameConfig } from './context/minesweeper-game-config.provider';
import { Cell } from './models/cell/cell.abstract';
import { GameLevel } from './models/game-level/game-level.enum';
import { GameStatus } from './models/game-status/game-status.enum';

export default function Minesweeper() {
  const gameConfigContext = useMinesweeperGameConfig();
  const boardContext = useMinesweeperBoard();

  const onChangeGameLevel = (selectedLevel: GameLevel) => {
    gameConfigContext.setGameLevel(selectedLevel);
    boardContext.resetByGameLevel(selectedLevel);
    gameConfigContext.setGameStatus(GameStatus.READY);
  };

  const onResetBoard = () => {
    boardContext.resetByGameLevel(gameConfigContext.gameLevel);
    gameConfigContext.setGameStatus(GameStatus.READY);
  };

  const onClickCell = (cell: Cell) => {
    if (cell.isCellOpeningDisabled()) return;
    if (gameConfigContext.gameStatus.isDisabledClickCell()) return;
    boardContext
      .openCell(cell.getPosition())
      .ifFirstOpenedCell(() => gameConfigContext.setGameStatus(GameStatus.PLAYING))
      .ifGameOver(() => gameConfigContext.setGameStatus(GameStatus.GAME_OVER))
      .ifGameClear(() => gameConfigContext.setGameStatus(GameStatus.CLEAR));
  };

  const onContextMenuCell = (cell: Cell) => {
    if (cell.isFlaggingDisabled()) return;
    if (gameConfigContext.gameStatus.isDisabledClickCell()) return;
    boardContext.toggleFlag(cell.getPosition());
  };

  return (
    <div className='flex h-screen items-center justify-center'>
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
      <div>
        <GameLevelSelect
          options={GameLevel.findAllLevels()}
          onChangeLevel={onChangeGameLevel}
          selectedOption={gameConfigContext.gameLevel}
        />
      </div>
      <Board board={boardContext.board} onClickCell={onClickCell} onContextMenuCell={onContextMenuCell} />
    </div>
  );
}
