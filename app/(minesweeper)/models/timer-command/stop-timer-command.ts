import { UseTimerReturn } from '@/hooks/use-timer';

import { TimerCommand } from './timer-command.interface';

export class StopTimerCommand implements TimerCommand {
  static of(): StopTimerCommand {
    return new StopTimerCommand();
  }

  execute(timer: UseTimerReturn) {
    timer.stop();
  }
}
