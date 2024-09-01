import { describe, expect, test } from "vitest";

import { Board } from "./board.abstract";

describe("Board", () => {
  test("게임 시작 시 설정한 난이도에 맞게 보드 크기가 정해집니다.", () => {
    // given
    const gameLevel = GameLevel.EASY;

    // when
    const board = Board.of(gameLevel);

    // then
    expect(board.getRowSize()).toBe(9);
    expect(board.getColumnSize()).toBe(9);
    expect(board.getCandiateMineCount()).toBe(10);
  });
});
