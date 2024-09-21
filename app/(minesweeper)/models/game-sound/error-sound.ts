import { GameSound } from './game-sound.abstract';

export class ErrorSound implements GameSound {
  private static FILE_PATH = '/wav/error_sound.wav';

  static of(): ErrorSound {
    return new ErrorSound();
  }

  play(): void {
    const audio = new Audio(ErrorSound.FILE_PATH);
    audio.play();
  }
}
