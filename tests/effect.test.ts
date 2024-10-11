import { Console, Effect } from 'effect';
import { describe, test } from 'vitest';

describe('Effect', () => {
  test.skip('Console.log', () => {
    const program = Console.log('Hello, World!');
    Effect.runSync(program);
  });
});
