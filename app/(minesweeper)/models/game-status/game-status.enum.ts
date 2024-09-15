import { Enum, EnumType } from 'ts-jenum';

@Enum('name')
export class GameStatus extends EnumType<GameStatus>() {
  static readonly READY = new GameStatus('게임 시작 전');
  static readonly PLAYING = new GameStatus('진행 중');
  static readonly PAUSED = new GameStatus('일시 정지');
  static readonly END = new GameStatus('게임 종료');

  private constructor(public readonly name: string) {
    super();
  }

  getName(): string {
    return this.name;
  }
}
