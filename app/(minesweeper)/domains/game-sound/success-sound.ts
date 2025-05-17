export class SuccessSound {
  private static FILE_PATH = '/wav/success_sound.wav';

  static of(): SuccessSound {
    return new SuccessSound();
  }

  play(): void {
    const audio = new Audio(SuccessSound.FILE_PATH);
    audio.play();
  }
}
