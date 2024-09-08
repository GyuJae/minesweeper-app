import { describe, expect, test } from 'vitest';

import { DefaultBoard } from '../board/default-board';
import { GridCellCollection } from '../cell-collection/grid-cell-collection';
import { GridCellPosition } from '../cell-position/grid-cell-position';
import { GameLevel } from '../game-level/game-level.enum';

describe('Board', () => {
  test('게임 시작 시 설정한 난이도에 맞게 보드 크기가 정해집니다.', () => {
    // given
    const gameLevel = GameLevel.EASY;

    // when
    const board = DefaultBoard.of(gameLevel, GridCellCollection.of(gameLevel));

    // then
    expect(board.getRowSize()).toBe(gameLevel.getRowSize());
    expect(board.getColumnSize()).toBe(gameLevel.getColumnSize());
    expect(board.getCandidateMineCount()).toBe(gameLevel.getMineCount());
  });

  test('처음 생성된 보드는 모든 칸이 닫힌 상태입니다.', () => {
    // given
    const gameLevel = GameLevel.EASY;

    // when
    const board = DefaultBoard.of(gameLevel, GridCellCollection.of(gameLevel));

    // then
    expect(board.isAllClosed()).toBeTruthy();
  });

  test('열림 상태가 아무것도 없는 경우 지뢰가 배치되지 않습니다.', () => {
    // given
    const gameLevel = GameLevel.EASY;

    // when
    const board = DefaultBoard.of(gameLevel, GridCellCollection.of(gameLevel));

    // then
    expect(board.hasUnopenedMines()).toBeFalsy();
  });

  test('처음 셸이 열리는 경우에 지뢰가 무작위로 배치됩니다.', () => {
    // given
    const gameLevel = GameLevel.EASY;
    const board = DefaultBoard.of(gameLevel, GridCellCollection.of(gameLevel));
    const position = GridCellPosition.of(0, 0);

    // when
    const newBoard = board.openCell(position);

    // then
    expect(newBoard.isOpenedCell(position)).toBeTruthy();
    expect(newBoard.hasUnopenedMines()).toBeTruthy();
    expect(newBoard.getUnOpenedMineCount()).toBe(gameLevel.getMineCount());
  });

  test('지뢰가 무작위로 배치된 이후 규칙에 따라 숫자 셸이 배치됩니다.', () => {
    // given
    const gameLevel = GameLevel.EASY;
    const board = DefaultBoard.of(gameLevel, GridCellCollection.of(gameLevel));
    const position = GridCellPosition.of(0, 0);

    // when
    const newBoard = board.openCell(position);

    // then
    expect(newBoard.findCellByPosition(position).isOpened()).toBeTruthy();
    const numberCells = newBoard.getCells().filter((cell) => cell.isNumber());
    for (const cell of numberCells) {
      expect(cell.getNearbyMineCount()).toBeGreaterThan(0);
    }
  });

  test('섈을 클릭 시 지뢰일 경우 게임이 종료됩니다.', () => {
    // given
    const gameLevel = GameLevel.EASY;
    const board = DefaultBoard.of(gameLevel, GridCellCollection.of(gameLevel));
    const minePosition = board
      .getCells()
      .find((cell) => cell.isMine())
      .getPosition();

    // when
    const newBoard = board.openCell(minePosition);

    // then
    expect(newBoard.isGameOver()).toBeTruthy();
  });
});
