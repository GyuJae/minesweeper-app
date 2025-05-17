import { UseTimerReturn } from '@/hooks/use-timer';

export interface TimerCommand {
  execute(_timer: UseTimerReturn): void;
}
