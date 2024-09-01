import { describe, expect, test } from "vitest";

import { GameLevel } from "../game-level/game-level.enum";
import { DefaultBoard } from "./default-board";

describe("Board", () => {
  test("게임 시작 시 설정한 난이도에 맞게 보드 크기가 정해집니다.", () => {
    // given
    const gameLevel = GameLevel.EASY;

    // when
    const board = DefaultBoard.of(gameLevel);

    // then
    expect(board.getRowSize()).toBe(9);
    expect(board.getColumnSize()).toBe(9);
    expect(board.getCandiateMineCount()).toBe(10);
  });
});
