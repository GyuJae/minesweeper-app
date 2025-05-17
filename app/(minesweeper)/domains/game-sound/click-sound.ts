import { GameSound } from './game-sound.abstract';

export class ClickSound implements GameSound {
  private static FILE_PATH = '/wav/click_sound.wav';

  static of(): ClickSound {
    return new ClickSound();
  }

  play(): void {
    const audio = new Audio(ClickSound.FILE_PATH);
    audio.play();
  }
}
