# 지뢰찾기

[지뢰찾기 웹사이트](https://minesweeper-app.netlify.app/)

함수형 프로그래밍과 객체 지향 프로그래밍을 결합하여, 유지보수와 확장성을 중점으로 구현한 웹 기반 지뢰찾기 게임입니다.

## 프로젝트 특징 요약

- 도메인 로직의 명확한 분리 및 모듈화
- 함수형 프로그래밍(fxts)과 객체 지향 설계의 혼합 사용
- 엄격한 타입 안전성 관리(ts-jenum)
- TDD 기반 Given-When-Then 명확한 테스트 코드 작성
- 선언적이고 가독성 좋은 코드 스타일

## 폴더구조

```
app/
├── (minesweeper)
│   ├── __tests__/
│   ├── components/
│   ├── context/
│   ├── exceptions/
│   └── domains/
│       ├── board/
│       ├── cell/
│       ├── cell-collection/
│       ├── cell-position/
│       ├── cell-position-collection/
│       ├── cell-snapshot/
│       ├── cell-state/
│       ├── cell-type/
│       ├── game-level/
│       ├── game-sound/
│       ├── game-status/
│       └── timer-command/
├── layout.tsx
└── page.tsx

```

#### 폴더 구조 설계 의도 및 장점

- 책임 분리: 상태(context), UI(components), 로직(domains)을 명확하게 분리
- 테스트 용이성: 각 도메인 별 단위 테스트 철저히 수행
- 확장성: 독립적인 도메인 구조로 기능 확장 용이

## 테스트 주도 개발(TDD) 적용

비즈니스 요구사항을 테스트 코드로 명시하여 코드 변경과 리팩토링에 안정성을 확보했습니다.

#### 주요 테스트 사례

- 게임 보드 초기화 및 설정 테스트

```ts
test('게임 시작 시 설정한 난이도에 맞게 보드 크기가 정해집니다.', () => {
  // Given: EASY 난이도가 설정된 상태
  const gameLevel = GameLevel.EASY;

  // When: 게임 보드를 생성하면
  const board = DefaultBoard.of(gameLevel);

  // Then: 보드의 크기가 EASY 난이도의 설정과 일치해야 합니다.
  expect(board.getRowSize()).toBe(gameLevel.getRowSize());
  expect(board.getColumnSize()).toBe(gameLevel.getColumnSize());
});
```

- 지뢰 클릭 시 게임 종료

```ts
test('셀을 클릭 시 지뢰일 경우 게임이 종료됩니다.', () => {
  // Given: 특정 위치에 지뢰가 있는 보드 상태
  const board = DefaultBoard.of(/* 지뢰가 포함된 보드 */);

  // When: 사용자가 지뢰가 있는 셀을 클릭하면
  const newBoard = board.openCell(GridCellPosition.of(0, 1));

  // Then: 게임은 종료 상태가 됩니다.
  expect(newBoard.isGameOver()).toBeTruthy();
});
```

- 승리 조건 테스트

```ts
test('사용자가 지뢰가 아닌 모든 셀을 열면 게임에서 승리합니다.', () => {
  // Given: 지뢰를 제외한 모든 셀이 열린 상태의 보드
  const board = DefaultBoard.of(/* 거의 클리어된 보드 상태 */);

  // When: 사용자가 마지막 지뢰가 아닌 셀을 열면
  const finalBoard = board.openCell(GridCellPosition.of(0, 0));

  // Then: 게임은 클리어 상태가 됩니다.
  expect(finalBoard.isGameClear()).toBeTruthy();
});
```

#### 테스트 코드 설계 의도

1. 도메인 전문가나 사용자의 요구사항이 테스트 코드에 명시적으로 드러나도록 작성하였습니다.
2. 게임의 핵심 규칙을 테스트로 문서화하여, 코드 변경이나 리팩토링 시에도 기존 규칙이 깨지지 않음을 보장합니다.
3. 지속적인 리팩토링을 안전하게 수행할 수 있는 기반을 제공합니다.

## Enum 관리

프로젝트에서는 일반적인 TypeScript의 enum 대신, ts-jenum의 class-enum을 활용하여 강력한 타입 안정성과 확장 가능한 상태 관리를 구현하였습니다.

#### 구현 사례(GameStatus)

게임의 진행 상태를 명확히 정의하고, 각 상태마다 관련된 로직을 캡슐화하였습니다.

```ts
@Enum('name')
export class GameStatus extends EnumType<GameStatus>() {
  static readonly READY = new GameStatus('게임 시작 전', '🙂', ResetTimerCommand.of(), false, false);
  static readonly PLAYING = new GameStatus('진행 중', '😃', StartTimerCommand.of(), false, false);
  static readonly PAUSED = new GameStatus('일시 정지', '😐', StopTimerCommand.of(), true, false);
  static readonly GAME_OVER = new GameStatus('게임 종료', '😢', StopTimerCommand.of(), true, true);
  static readonly CLEAR = new GameStatus('게임 클리어', '🥳', StopTimerCommand.of(), true, true);

  private constructor(
    public readonly name: string,
    private readonly _emoji: ReactNode,
    private readonly _timerCommand: TimerCommand,
    private readonly _isDisabledClickCell: boolean,
    private readonly _showResetButton: boolean,
  ) {
    super();
  }

  getEmoji(): ReactNode {
    return this._emoji;
  }

  timerExecute(timer: UseTimerReturn) {
    return this._timerCommand.execute(timer);
  }

  isDisabledClickCell(): boolean {
    return this._isDisabledClickCell;
  }

  showResetButton(): boolean {
    return this._showResetButton;
  }

  isPlaying(): boolean {
    return this.equals(GameStatus.PLAYING);
  }

  isPaused(): boolean {
    return this.equals(GameStatus.PAUSED);
  }

  isReady() {
    return this.equals(GameStatus.READY);
  }

  isClear() {
    return this.equals(GameStatus.CLEAR);
  }
}
```

#### 선택 이유 및 장점

1. 타입 안정성: 잘못된 값의 할당이나 비교를 컴파일 타임에 방지하여 런타임 오류를 최소화합니다.
2. 확장성 및 유지보수성: 상태별 로직을 각 Enum 인스턴스 내부에 캡슐화하여 코드 가독성을 높이고 상태 추가나 변경이 용이합니다.
3. 도메인 로직 캡슐화: Enum 상태에 따라 타이머 명령 실행 및 UI 상태를 관리하는 로직을 자연스럽게 캡슐화할 수 있어 코드를 더 선언적으로 관리할 수 있습니다.

## fxts를 활용한 함수형 프로그래밍 적용

함수형 프로그래밍 라이브러리인 [fxts](https://fxts.dev/)를 사용하여 코드의 가독성, 유지보수성 및 선언적 표현력을 향상시켰습니다.

#### fxts를 적용 예시

지뢰 위치를 랜덤하게 배치하는 로직을 FXts를 통해 명확하고 선언적인 코드로 구현했습니다.

```ts
static initialMinesOf(gameLevel: GameLevel, firstSelectPosition: GridCellPosition): GridCellPositionCollection {
  const mineCount = gameLevel.getMineCount();
  const rowSize = gameLevel.getRowSize();
  const columnSize = gameLevel.getColumnSize();

  return FX.pipe(
    FX.range(0, Infinity),  // 무한한 수열 생성
    FX.map(() => GridCellPosition.of(
      Math.floor(Math.random() * rowSize),
      Math.floor(Math.random() * columnSize),
    )),  // 랜덤 위치 생성
    FX.reject((position) => position.equals(firstSelectPosition)),  // 처음 선택된 위치 제외
    FX.uniqBy((position) => position.toString()),  // 중복 위치 제거
    FX.take(mineCount),  // 지정된 지뢰 개수만큼 추출
    FX.toArray,  // 배열로 변환
    GridCellPositionCollection.of,  // 컬렉션으로 변환
  );
}
```

#### fxts를 활용한 주요 이점

1. 가독성 향상: 각 로직 단계를 함수의 체이닝으로 표현하여 코드의 흐름을 직관적으로 이해할 수 있습니다.
2. 명령형 코드 감소 및 선언적 코드 증가: 복잡한 반복문과 조건문을 줄이고, 로직 자체에 집중할 수 있는 선언적 표현이 가능합니다.
3. 부수효과(side-effect)의 최소화: 순수 함수 위주의 설계로 부수효과를 줄여 오류를 방지하고 테스트 가능성을 높입니다.
4. 중복 코드 및 오류 예방: FXts의 `uniqBy`와 같은 기능을 사용하여 중복된 데이터를 간결히 처리하고, 무한 수열 등 복잡한 작업을 쉽게 다룰 수 있습니다.

## 참고한 학습자료

- [Multi-Paradigm Programming](https://www.inflearn.com/course/multi-paradigm-programming)
- [Practical Testing 가이드](https://www.inflearn.com/course/practical-testing-실용적인-테스트-가이드)
- [Readable Code 작성법](https://www.inflearn.com/course/readable-code-읽기좋은코드-작성사고법)
