import { Enum, EnumType } from 'ts-jenum';

import { UseTimerReturn } from '@/hooks/use-timer';

import { ResetTimerCommand } from '../timer-command/reset-timer-command';
import { StartTimerCommand } from '../timer-command/start-timer-command';
import { StopTimerCommand } from '../timer-command/stop-timer-command';
import type { TimerCommand } from '../timer-command/timer-command.interface';

@Enum('name')
export class GameStatus extends EnumType<GameStatus>() {
  static readonly READY = new GameStatus('게임 시작 전', ResetTimerCommand.of());
  static readonly PLAYING = new GameStatus('진행 중', StartTimerCommand.of());
  static readonly PAUSED = new GameStatus('일시 정지', StopTimerCommand.of());
  static readonly END = new GameStatus('게임 종료', StopTimerCommand.of());

  private constructor(public readonly name: string, private readonly _timerCommand: TimerCommand) {
    super();
  }

  getName(): string {
    return this.name;
  }

  equals(other: GameStatus): boolean {
    return this === other;
  }

  timerExecute(timer: UseTimerReturn) {
    return this._timerCommand.execute(timer);
  }
}
