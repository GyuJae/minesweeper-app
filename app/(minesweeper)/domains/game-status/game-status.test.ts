import { describe, expect, test, vi } from 'vitest';

import { UseTimerReturn } from '@/hooks/use-timer';

import { GameStatus } from './game-status.enum';

describe('GameStatus', () => {
  test('게임 시작 전 상태로 변경 시 타이머를 초기화합니다.', () => {
    // given
    const mockTimer: UseTimerReturn = {
      start: vi.fn(),
      stop: vi.fn(),
      reset: vi.fn(),
      seconds: 0,
    };

    // when
    GameStatus.READY.timerExecute(mockTimer);

    // then
    expect(mockTimer.reset).toBeCalled();
    expect(mockTimer.start).not.toBeCalled();
    expect(mockTimer.stop).not.toBeCalled();
  });

  test('게임 진행 중 상태로 변경 시 타이머를 시작합니다.', () => {
    // given
    const mockTimer: UseTimerReturn = {
      start: vi.fn(),
      stop: vi.fn(),
      reset: vi.fn(),
      seconds: 0,
    };

    // when
    GameStatus.PLAYING.timerExecute(mockTimer);

    // then
    expect(mockTimer.start).toBeCalled();
    expect(mockTimer.reset).not.toBeCalled();
    expect(mockTimer.stop).not.toBeCalled();
  });

  test('게임 일시 정지 상태로 변경 시 타이머를 정지합니다.', () => {
    // given
    const mockTimer: UseTimerReturn = {
      start: vi.fn(),
      stop: vi.fn(),
      reset: vi.fn(),
      seconds: 0,
    };

    // when
    GameStatus.PAUSED.timerExecute(mockTimer);

    // then
    expect(mockTimer.stop).toBeCalled();
    expect(mockTimer.reset).not.toBeCalled();
    expect(mockTimer.start).not.toBeCalled();
  });

  test('게임 종료 상태로 변경 시 타이머를 정지합니다.', () => {
    // given
    const mockTimer: UseTimerReturn = {
      start: vi.fn(),
      stop: vi.fn(),
      reset: vi.fn(),
      seconds: 0,
    };

    // when
    GameStatus.GAME_OVER.timerExecute(mockTimer);

    // then
    expect(mockTimer.stop).toBeCalled();
    expect(mockTimer.reset).not.toBeCalled();
    expect(mockTimer.start).not.toBeCalled();
  });

  test('게임 클리어 상태로 변경 시 타이머를 정지합니다.', () => {
    // given
    const mockTimer: UseTimerReturn = {
      start: vi.fn(),
      stop: vi.fn(),
      reset: vi.fn(),
      seconds: 0,
    };

    // when
    GameStatus.CLEAR.timerExecute(mockTimer);

    // then
    expect(mockTimer.stop).toBeCalled();
    expect(mockTimer.reset).not.toBeCalled();
    expect(mockTimer.start).not.toBeCalled();
  });

  test('게임 시작 전 상태에서 셸을 열 수 있습니다.', () => {
    // given
    const gameStatus = GameStatus.READY;

    // when
    // then
    expect(gameStatus.isDisabledClickCell()).toBeFalsy();
  });

  test('게임 진행 중 상태에서 셸을 열 수 있습니다.', () => {
    // given
    const gameStatus = GameStatus.PLAYING;

    // when
    // then
    expect(gameStatus.isDisabledClickCell()).toBeFalsy();
  });

  test('게임 일시 정지 상태에서 셸을 열 수 없습니다.', () => {
    // given
    const gameStatus = GameStatus.PAUSED;

    // when
    // then
    expect(gameStatus.isDisabledClickCell()).toBeTruthy();
  });

  test('게임 종료 상태에서 셸을 열 수 없습니다.', () => {
    // given
    const gameStatus = GameStatus.GAME_OVER;

    // when
    // then
    expect(gameStatus.isDisabledClickCell()).toBeTruthy();
  });

  test('게임 클리어 상태에서 셸을 열 수 없습니다.', () => {
    // given
    const gameStatus = GameStatus.CLEAR;

    // when
    // then
    expect(gameStatus.isDisabledClickCell()).toBeTruthy();
  });

  test('게임 시작 전 상태에서 리셋 버튼을 보여주지 않습니다.', () => {
    // given
    const gameStatus = GameStatus.READY;

    // when
    // then
    expect(gameStatus.showResetButton()).toBeFalsy();
  });

  test('게임 진행 중 상태에서 리셋 버튼을 보여주지 않습니다.', () => {
    // given
    const gameStatus = GameStatus.PLAYING;

    // when
    // then
    expect(gameStatus.showResetButton()).toBeFalsy();
  });

  test('게임 일시 정지 상태에서 리셋 버튼을 보여주지 않습니다.', () => {
    // given
    const gameStatus = GameStatus.PAUSED;

    // when
    // then
    expect(gameStatus.showResetButton()).toBeFalsy();
  });

  test('게임 종료 상태에서 리셋 버튼을 보여줍니다.', () => {
    // given
    const gameStatus = GameStatus.GAME_OVER;

    // when
    // then
    expect(gameStatus.showResetButton()).toBeTruthy();
  });

  test('게임 클리어 상태에서 리셋 버튼을 보여줍니다.', () => {
    // given
    const gameStatus = GameStatus.CLEAR;

    // when
    // then
    expect(gameStatus.showResetButton()).toBeTruthy();
  });
});
