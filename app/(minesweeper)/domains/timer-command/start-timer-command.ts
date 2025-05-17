import { UseTimerReturn } from '@/hooks/use-timer';

import { TimerCommand } from './timer-command.interface';

export class StartTimerCommand implements TimerCommand {
  static of(): StartTimerCommand {
    return new StartTimerCommand();
  }

  execute(timer: UseTimerReturn) {
    timer.start();
  }
}
