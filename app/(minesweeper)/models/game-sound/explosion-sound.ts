import { GameSound } from './game-sound.abstract';

export class ExplosionSound implements GameSound {
  private static FILE_PATH = '/wav/explosion_sound.wav';

  static of(): ExplosionSound {
    return new ExplosionSound();
  }

  play(): void {
    const audio = new Audio(ExplosionSound.FILE_PATH);
    audio.play();
  }
}
