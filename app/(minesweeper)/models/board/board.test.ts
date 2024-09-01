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

  test("처음 생성된 보드는 모든 칸이 닫힌 상태입니다.", () => {
    // given
    const gameLevel = GameLevel.EASY;

    // when
    const board = DefaultBoard.of(gameLevel);

    // then
    expect(board.isAllClosed()).toBeTruthy();
  });

  test("열림 상태가 아무것도 없는 경우 지뢰가 배치되지 않습니다.", () => {
    // given
    const gameLevel = GameLevel.EASY;

    // when
    const board = DefaultBoard.of(gameLevel);

    // then
    expect(board.hasUnopenedMines()).toBeFalsy();
  });

  test("처음 셸이 열리는 경우에 지뢰가 무작위로 배치됩니다.", () => {
    // given
    const gameLevel = GameLevel.EASY;
    const board = DefaultBoard.of(gameLevel);
    const position = Position.of(0, 0);

    // when
    board.openCell(position);

    // then
    expect(board.hasUnopenedMines()).toBeTruthy();
    expect(board.getUnOpenedMineCount()).toBe(10);
  });
});
