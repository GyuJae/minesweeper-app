import { UseTimerReturn } from '@/hooks/use-timer';

import { TimerCommand } from './timer-command.interface';

export class ResetTimerCommand implements TimerCommand {
  static of(): ResetTimerCommand {
    return new ResetTimerCommand();
  }

  execute(timer: UseTimerReturn) {
    timer.reset();
  }
}
