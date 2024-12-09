import { Cause, Console, Effect, Either, Exit, Option, pipe, Random, Schedule } from 'effect';
import { describe, expect, test } from 'vitest';

describe('Effect TS', () => {
  test.skip('Console.log', () => {
    const program = Console.log('Hello, World!');
    Effect.runSync(program);
  });

  test('Using Generator', async () => {
    const addServiceCharge = (amount: number) => amount + 1;

    const applyDiscount = (total: number, discountRate: number): Effect.Effect<number, Error> =>
      discountRate === 0
        ? Effect.fail(new Error('Discount rate cannot be zero'))
        : Effect.succeed(total - (total * discountRate) / 100);

    const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100));

    const fetchDiscountRate = Effect.promise(() => Promise.resolve(5));

    const program = Effect.gen(function* () {
      const transactionAmount = yield* fetchTransactionAmount;

      const discountRate = yield* fetchDiscountRate;

      const discountedAmount = yield* applyDiscount(transactionAmount, discountRate);

      const finalAmount = addServiceCharge(discountedAmount);

      return `Final amount to charge: ${finalAmount}`;
    });

    expect(await Effect.runPromise(program)).toBe('Final amount to charge: 96');
  });

  test('Passing this', async () => {
    class MyService {
      readonly local = 1;
      compute = Effect.gen(this, function* () {
        return yield* Effect.succeed(this.local + 1);
      });
    }
    expect(await Effect.runSync(new MyService().compute)).toBe(2);
  });

  test('pipe', () => {
    const inc = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    const subtractTen = (x: number) => x - 10;

    const result = pipe(5, inc, double, subtractTen);

    expect(result).toBe(2);
  });

  test('map', async () => {
    const addServiceCharge = (amount: number) => amount + 1;

    const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100));

    const finalAmount = pipe(fetchTransactionAmount, Effect.map(addServiceCharge));

    expect(await Effect.runPromise(finalAmount)).toBe(101);
  });

  test('as', () => {
    const program = pipe(Effect.succeed(5), Effect.as('new value'));

    expect(Effect.runSync(program)).toBe('new value');
  });

  test('flatMap', async () => {
    const applyDiscount = (total: number, discountRate: number): Effect.Effect<number, Error> =>
      discountRate === 0
        ? Effect.fail(new Error('Discount rate cannot be zero'))
        : Effect.succeed(total - (total * discountRate) / 100);

    const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100));

    const finalAmount = pipe(
      fetchTransactionAmount,
      Effect.flatMap((amount) => applyDiscount(amount, 5)),
    );

    expect(await Effect.runPromise(finalAmount)).toBe(95);
  });

  test('andThen', async () => {
    const applyDiscount = (total: number, discountRate: number): Effect.Effect<number, Error> =>
      discountRate === 0
        ? Effect.fail(new Error('Discount rate cannot be zero'))
        : Effect.succeed(total - (total * discountRate) / 100);

    const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100));

    const result = pipe(
      fetchTransactionAmount,
      Effect.andThen((amount) => amount * 2),
      Effect.andThen((amount) => applyDiscount(amount, 5)),
    );

    expect(await Effect.runPromise(result)).toBe(190);
  });

  test('Option', async () => {
    const fetchNumberValue = Effect.promise(() => Promise.resolve(42));

    const program = pipe(
      fetchNumberValue,
      Effect.andThen((x) => (x > 0 ? Option.some(x) : Option.none())),
    );

    expect(await Effect.runPromise(program)).toBe(42);
  });

  test('Option none', async () => {
    const fetchNumberValue = Effect.promise(() => Promise.resolve(-42));

    const program = pipe(
      fetchNumberValue,
      Effect.andThen((x) => (x > 0 ? Option.some(x) : Option.none())),
      Effect.match({
        onFailure: () => 0,
        onSuccess: (value) => value,
      }),
    );

    expect(await Effect.runPromise(program)).toBe(0);
  });

  test.skip('tap', async () => {
    const applyDiscount = (total: number, discountRate: number): Effect.Effect<number, Error> =>
      discountRate === 0
        ? Effect.fail(new Error('Discount rate cannot be zero'))
        : Effect.succeed(total - (total * discountRate) / 100);

    const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100));

    const finalAmount = pipe(
      fetchTransactionAmount,
      Effect.tap((amount) => Effect.sync(() => console.log(`Apply a discount to: ${amount}`))),
      Effect.flatMap((amount) => applyDiscount(amount, 5)),
    );

    expect(await Effect.runPromise(finalAmount)).toBe(95);
  });

  test('all', async () => {
    const webConfig = Effect.promise(() => Promise.resolve({ dbConnection: 'localhost', port: 8080 }));

    const checkDatabaseConnectivity = Effect.promise(() => Promise.resolve('Connected to Database'));

    const startupChecks = Effect.all([webConfig, checkDatabaseConnectivity]);

    expect(await Effect.runPromise(startupChecks)).toEqual([
      { dbConnection: 'localhost', port: 8080 },
      'Connected to Database',
    ]);
  });

  test('Build your first pipeline', async () => {
    const addServiceCharge = (amount: number) => amount + 1;

    const applyDiscount = (total: number, discountRate: number): Effect.Effect<number, Error> =>
      discountRate === 0
        ? Effect.fail(new Error('Discount rate cannot be zero'))
        : Effect.succeed(total - (total * discountRate) / 100);

    const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100));

    const fetchDiscountRate = Effect.promise(() => Promise.resolve(5));

    const program = Effect.all([fetchTransactionAmount, fetchDiscountRate]).pipe(
      Effect.flatMap(([transactionAmount, discountRate]) => applyDiscount(transactionAmount, discountRate)),
      Effect.map(addServiceCharge),
      Effect.map((finalAmount) => `Final amount to charge: ${finalAmount}`),
    );

    expect(await Effect.runPromise(program)).toBe('Final amount to charge: 96');
  });

  test('Expected Error Tracking', async () => {
    class HttpError {
      readonly _tag = 'HttpError';
    }

    class ValidationError {
      readonly _tag = 'ValidationError';
    }

    // type = Effect<string, HttpError | ValidationError, never>
    Effect.gen(function* () {
      const n1 = yield* Random.next;
      const n2 = yield* Random.next;

      const httpResult = n1 > 0.5 ? 'yay!' : yield* Effect.fail(new HttpError());
      const validationResult = n2 > 0.5 ? 'yay!' : yield* Effect.fail(new ValidationError());

      return httpResult + validationResult;
    });

    const httpResult = Random.next.pipe(
      Effect.andThen((n1) => (n1 > 0.5 ? Effect.succeed('yay!') : Effect.fail(new HttpError()))),
    );

    const validationResult = Random.next.pipe(
      Effect.andThen((n2) => (n2 > 0.5 ? Effect.succeed('yay!') : Effect.fail(new ValidationError()))),
    );

    // type = Effect<string, HttpError | ValidationError, never>
    Effect.all([httpResult, validationResult]).pipe(Effect.andThen(([http, validation]) => http + validation));
  });

  test.skip('short circuiting', async () => {
    const task1 = Console.log('Executing task1...');
    const task2 = Effect.fail('Something went wrong!');
    const task3 = Console.log('Executing task3...');

    const program = Effect.gen(function* () {
      yield* task1;
      yield* task2;
      yield* task3;
    });

    Effect.runPromiseExit(program).then(console.log);
  });

  test('Catching all Errors', async () => {
    class HttpError {
      readonly _tag = 'HttpError';
    }

    class ValidationError {
      readonly _tag = 'ValidationError';
    }

    const program = Effect.gen(function* () {
      const n1 = yield* Random.next;
      const n2 = yield* Random.next;

      const httpResult = n1 > 0.5 ? 'yay!' : yield* Effect.fail(new HttpError());
      const validationResult = n2 > 0.5 ? 'yay!' : yield* Effect.fail(new ValidationError());

      return httpResult + validationResult;
    });

    // const recovered = Effect.gen(function* () {
    Effect.gen(function* () {
      const failureOrSuccess = yield* Effect.either(program);
      if (Either.isLeft(failureOrSuccess)) {
        const error = failureOrSuccess.left;
        return `Recovering from ${error._tag}`;
      } else {
        return failureOrSuccess.right;
      }
    });

    // expect(await Effect.runPromise(recovered)).toBe('Recovering from HttpError');
    // expect(await Effect.runPromise(recovered)).toBe('Recovering from ValidationError');
    // expect(await Effect.runPromise(recovered)).toBe('yay!yay!');

    // const recovered = program.pipe(Effect.catchAll((error) => Effect.succeed(`Recovering from ${error._tag}`)));
    program.pipe(Effect.catchAll((error) => Effect.succeed(`Recovering from ${error._tag}`)));

    // expect(await Effect.runPromise(recovered)).toBe('Recovering from HttpError');
    // expect(await Effect.runPromise(recovered)).toBe('Recovering from HttpError');
    // expect(await Effect.runPromise(recovered)).toBe('Recovering from ValidationError');
    // expect(await Effect.runPromise(recovered)).toBe('yay!yay!');
  });

  test('Catching Some Errors', () => {
    // if _tag
    // catchSome
    // catchIf
    // catchTag
    // catchTags
  });

  test.skip('Unexpected Errors', async () => {
    const divide = (a: number, b: number): Effect.Effect<number> =>
      b === 0 ? Effect.die(new Error('Cannot divide by zero')) : Effect.succeed(a / b);

    Effect.runSync(divide(1, 0));
  });

  test.skip('dieMessage', () => {
    const divide = (a: number, b: number): Effect.Effect<number> =>
      b === 0 ? Effect.dieMessage('Cannot divide by zero') : Effect.succeed(a / b);

    Effect.runSync(divide(1, 0)); // throws RuntimeException: Cannot divide by zero
  });

  test.skip('orDie', () => {
    const divide = (a: number, b: number): Effect.Effect<number, Error> =>
      b === 0 ? Effect.fail(new Error('Cannot divide by zero')) : Effect.succeed(a / b);

    const program = Effect.orDie(divide(1, 0));

    Effect.runSync(program);
  });

  test.skip('orDieWith', () => {
    const divide = (a: number, b: number): Effect.Effect<number, Error> =>
      b === 0 ? Effect.fail(new Error('Cannot divide by zero')) : Effect.succeed(a / b);

    const program = Effect.orDieWith(divide(1, 0), (error) => new Error(`An error occurred: ${error.message}`));

    Effect.runSync(program);
  });

  test.skip('exit', () => {
    const task = Effect.dieMessage('Boom!');

    const program = Effect.gen(function* () {
      const exit = yield* Effect.exit(task);
      if (Exit.isFailure(exit)) {
        const cause = exit.cause;
        yield* Cause.isDieType(cause) && Cause.isRuntimeException(cause.defect)
          ? Console.log(`RuntimeException defect caught: ${cause.defect.message}`)
          : Console.log('Unknown defect caught.');
      }
    });

    Effect.runPromiseExit(program).then(console.log);
  });

  test.skip('catchAllDefect', () => {
    const task = Effect.dieMessage('Boom!');

    const program = Effect.catchAllDefect(task, (defect) => {
      if (Cause.isRuntimeException(defect)) {
        return Console.log(`RuntimeException defect caught: ${defect.message}`);
      }
      return Console.log('Unknown defect caught.');
    });

    Effect.runPromiseExit(program).then(console.log);
  });

  test.skip('catchSomeDefect', () => {
    const task = Effect.dieMessage('Boom!');

    const program = Effect.catchSomeDefect(task, (defect) => {
      if (Cause.isIllegalArgumentException(defect)) {
        return Option.some(Console.log(`Caught an IllegalArgumentException defect: ${defect.message}`));
      }
      return Option.none();
    });

    Effect.runPromiseExit(program).then(console.log);
  });

  test('orElse', async () => {
    const success = Effect.succeed('success');
    const failure = Effect.fail('failure');
    const fallback = Effect.succeed('fallback');

    const program1 = Effect.orElse(success, () => fallback);
    expect(await Effect.runSync(program1)).toBe('success');

    const program2 = Effect.orElse(failure, () => fallback);
    expect(await Effect.runSync(program2)).toBe('fallback');
  });

  test.skip('orElseFail / orElseSucceed', async () => {
    class NegativeAgeError {
      readonly _tag = 'NegativeAgeError';
      constructor(private readonly _age: number) {}
    }

    class IllegalAgeError {
      readonly _tag = 'IllegalAgeError';
      constructor(private readonly _age: number) {}
    }

    const validate = (age: number): Effect.Effect<number, NegativeAgeError | IllegalAgeError> => {
      if (age < 0) {
        return Effect.fail(new NegativeAgeError(age));
      } else if (age < 18) {
        return Effect.fail(new IllegalAgeError(age));
      } else {
        return Effect.succeed(age);
      }
    };

    await Effect.orElseFail(validate(3), () => 'invalid age');
  });

  test.only('retry', () => {
    let count = 0;

    const effect = Effect.async<string, Error>((resume) => {
      if (count <= 5) {
        count++;
        console.log('failure');
        resume(Effect.fail(new Error('failure')));
      } else {
        console.log('success');
        resume(Effect.succeed('yay!'));
      }
    });

    const policy = Schedule.fixed('100 millis');
    const repeated = Effect.retry(effect, policy);
    Effect.runPromise(repeated).then(console.log);
    /*
    Output:
    failure
    failure
    failure
    success
    yay!
    */

    Effect.runPromise(Effect.retry(effect, { times: 5 }));
    /*
    Output:
    failure
    failure
    failure
    success
    */

    // Effect.retryOrElse(effect, policy, fallback);
    // const policy = Schedule.addDelay(
    //   Schedule.recurs(2), // Retry for a maximum of 2 times
    //   () => '100 millis', // Add a delay of 100 milliseconds between retries
    // );

    // Create a new effect that retries the effect with the specified policy,
    // and provides a fallback effect if all retries fail
    // const repeated = Effect.retryOrElse(effect, policy, () => Console.log('orElse').pipe(Effect.as('default value')));

    // Effect.runPromise(repeated).then(console.log);
    /*
    Output:
    failure
    failure
    failure
    orElse
    default value
    */

    // let count2 = 0;
    // const action = Effect.failSync(() => {
    //   console.log(`Action called ${++count2} time(s)`);
    //   return `Error ${count2}`;
    // });

    // const program = Effect.retry(action, { until: (error) => error === 'Error 3' });

    // Effect.runPromiseExit(program).then(console.log);
  });
});
