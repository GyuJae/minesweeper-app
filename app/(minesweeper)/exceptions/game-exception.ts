export class GameException extends Error {
  private constructor(public readonly message: string) {
    super(message);
  }

  static of(message: string): GameException {
    return new GameException(message);
  }
}
