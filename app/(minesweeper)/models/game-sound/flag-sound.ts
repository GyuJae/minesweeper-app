import { GameSound } from './game-sound.abstract';

export class FlagSound implements GameSound {
  private static FILE_PATH = '/wav/flag_sound.wav';

  static of(): FlagSound {
    return new FlagSound();
  }

  play(): void {
    const audio = new Audio(FlagSound.FILE_PATH);
    audio.play();
  }
}
