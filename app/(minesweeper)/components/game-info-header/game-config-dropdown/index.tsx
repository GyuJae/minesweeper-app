'use client';

import { CheckIcon, MenuIcon } from 'lucide-react';

import { useMinesweeperBoard } from '@/app/(minesweeper)/context/minesweeper-board.provider';
import { useMinesweeperGameConfig } from '@/app/(minesweeper)/context/minesweeper-game-config.provider';
import { GameLevel } from '@/app/(minesweeper)/models/game-level/game-level.enum';
import { GameStatus } from '@/app/(minesweeper)/models/game-status/game-status.enum';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const GameConfigDropdown = () => {
  const gameConfigContext = useMinesweeperGameConfig();
  const boardContext = useMinesweeperBoard();

  const onChangeLevel = (selectedLevel: GameLevel) => {
    gameConfigContext.setGameLevel(selectedLevel);
    boardContext.resetByGameLevel(selectedLevel);
    gameConfigContext.setGameStatus(GameStatus.READY);
  };

  const onResetGame = () => {
    boardContext.resetByGameLevel(gameConfigContext.gameLevel);
    gameConfigContext.setGameStatus(GameStatus.READY);
  };

  const onPaused = () => {
    gameConfigContext.setGameStatus(GameStatus.PAUSED);
  };

  const onRestart = () => {
    gameConfigContext.setGameStatus(GameStatus.PLAYING);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='size-10 rounded-full'>
          <MenuIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem disabled={gameConfigContext.gameStatus.isReady()} onClick={onResetGame}>
          처음부터
        </DropdownMenuItem>
        <DropdownMenuItem disabled={!gameConfigContext.gameStatus.isPlaying()} onClick={onPaused}>
          일시정지
        </DropdownMenuItem>
        <DropdownMenuItem disabled={!gameConfigContext.gameStatus.isPaused()} onClick={onRestart}>
          다시시작
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>난이도</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {GameLevel.findAllLevels().map((level) => (
                <DropdownMenuItem
                  key={level.name}
                  role='button'
                  tabIndex={0}
                  onClick={() => onChangeLevel(level)}
                  className='flex justify-between'
                >
                  {level.name}
                  {gameConfigContext.gameLevel.equals(level) && <CheckIcon className='size-4' />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GameConfigDropdown;
