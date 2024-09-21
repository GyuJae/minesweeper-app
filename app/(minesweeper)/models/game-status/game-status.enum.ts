import type { ReactNode } from 'react';
import { Enum, EnumType } from 'ts-jenum';

import { UseTimerReturn } from '@/hooks/use-timer';

import { ResetTimerCommand } from '../timer-command/reset-timer-command';
import { StartTimerCommand } from '../timer-command/start-timer-command';
import { StopTimerCommand } from '../timer-command/stop-timer-command';
import type { TimerCommand } from '../timer-command/timer-command.interface';

@Enum('name')
export class GameStatus extends EnumType<GameStatus>() {
  static readonly READY = new GameStatus('게임 시작 전', '🙂', ResetTimerCommand.of(), false, false);

  static readonly PLAYING = new GameStatus('진행 중', '😃', StartTimerCommand.of(), false, false);

  static readonly PAUSED = new GameStatus('일시 정지', '😐', StopTimerCommand.of(), true, false);

  static readonly GAME_OVER = new GameStatus('게임 종료', '😢', StopTimerCommand.of(), true, true);

  static readonly CLEAR = new GameStatus('게임 클리어', '🥳', StopTimerCommand.of(), true, true);

  private constructor(
    public readonly name: string,
    private readonly _emoji: ReactNode,
    private readonly _timerCommand: TimerCommand,
    private readonly _isDisabledClickCell: boolean,
    private readonly _showResetButton: boolean,
  ) {
    super();
  }

  getEmoji(): ReactNode {
    return this._emoji;
  }

  equals(other: GameStatus): boolean {
    return this === other;
  }

  timerExecute(timer: UseTimerReturn) {
    return this._timerCommand.execute(timer);
  }

  isDisabledClickCell(): boolean {
    return this._isDisabledClickCell;
  }

  showResetButton(): boolean {
    return this._showResetButton;
  }

  isPlaying(): boolean {
    return this.equals(GameStatus.PLAYING);
  }

  isPaused(): boolean {
    return this.equals(GameStatus.PAUSED);
  }

  isReady() {
    return this.equals(GameStatus.READY);
  }

  isClear() {
    return this.equals(GameStatus.CLEAR);
  }
}
