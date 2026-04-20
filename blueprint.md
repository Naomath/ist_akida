# 寿司打風タイピングゲーム 設計書（WebGL / PixiJS版）

## 0. 実装前提

本プロジェクトは、ブラウザで動作する寿司打風タイピングゲームを実装するものである。
描画は PixiJS による WebGL レンダリングを使用する。

* 2Dゲームとして実装する（3D空間は使用しない）
* Canvas 2D API は使用せず、PixiJS（WebGL）で描画する
* PCブラウザ向け（キーボード入力前提）
* オリジナル実装とし、既存ゲームの素材や名称は使用しない
* まずは最小構成のプロトタイプを完成させ、その後に演出を追加する

---

## 1. 目的

流れてくる単語をタイピングしてスコアを稼ぐゲームを実装する。
シンプルで反応性の高いタイピング体験を提供することを目的とする。

---

## 2. 技術構成

### 2.1 使用技術

* 言語: TypeScript
* ビルドツール: Next.js
* 描画ライブラリ: PixiJS（WebGL）
* 実行環境: ブラウザ（Chrome 最新版）

### 2.2 アーキテクチャ方針

* ゲームロジックと描画ロジックを分離する
* 状態管理は一箇所に集約する
* 描画層は状態を描画するだけにする（ロジックを持たない）
* 入力、判定、スコア計算は純粋ロジックとして分離する

---

## 3. 画面構成

### 3.1 シーン一覧

* title
* countdown
* playing
* result

---

### 3.2 タイトル画面

表示:

* タイトル
* STARTボタン

操作:

* START押下で countdown に遷移

---

### 3.3 カウントダウン画面

* 3 → 2 → 1 を中央に表示
* 完了後 playing に遷移

---

### 3.4 プレイ画面

表示:

* 流れる単語
* 現在入力文字列
* 残り時間
* 正解数
* コンボ数

---

### 3.5 リザルト画面

表示:

* 正解数
* 再スタートボタン

---

## 4. ゲームフロー

1. title表示
2. START押下
3. countdown
4. playing開始
5. 制限時間終了
6. result表示
7. 再スタート or titleへ戻る

---

## 5. 基本ルール

* 単語は画面中央に表示される
* プレイヤーはローマ字入力で単語を入力する
* 正解すると単語が消えスコア加算
* 制限時間は60秒
* 間違えずに単語を入力できるとコンボ加算

---

## 6. 入力仕様

* ローマ字入力のみ対応
* Backspaceで1文字削除
* Enterは使用しない
* 前方一致で判定する

---

## 7. 単語データ

### 7.1 フォーマット

```json
[
  {
    "id": 1,
    "kana": "すし",
    "romaji": "sushi"
  }
]
```

### 7.2 出現ルール

* ランダム選択
* 同一単語連続出現を避ける
* 同時出現数に上限あり

---

## 8. スコア仕様

* 基本点 = 文字数 × 10
* コンボ倍率 = 1.0 + min(combo * 0.05, 1.0)
* 正解時:

  * score += 基本点 × コンボ倍率
  * combo++

---

## 9. ミス仕様

* combo = 0

---

## 10. 時間仕様

* 制限時間: 60秒
* 毎フレーム更新
* 0以下で終了

---

## 11. ゲームループ

毎フレーム以下を順に処理:

1. deltaTime計算
2. タイマー更新
3. 単語出現判定
4. 入力反映
5. 判定処理
6. スコア更新
7. 描画更新
8.  終了判定

---

## 12. WebGL描画仕様（PixiJS）

* requestAnimationFrameベースで更新
* Containerでレイヤー分離

  * backgroundLayer
  * wordLayer
  * uiLayer
* テキストは Pixi.Text を使用
* deltaTimeで移動量計算
* フレームレート非依存

---

## 13. 状態管理

```ts
type GameState = {
  scene: "title" | "countdown" | "playing" | "result";
  score: number;
  combo: number;
  maxCombo: number;
  timeRemaining: number;
  activeWords: ActiveWord[];
  currentInput: string;
  targetWordId: number | null;
};
```

---

## 14. データ構造

```ts
type WordMaster = {
  id: number;
  kana: string;
  romaji: string;
};

type ActiveWord = {
  instanceId: number;
  masterId: number;
  kana: string;
  romaji: string;
};
```

---

## 15. モジュール構成

```
src/
  main.ts
  app/
    bootstrap.ts
  core/
    gameLoop.ts
    inputManager.ts
    stateStore.ts
  game/
    gameController.ts
    wordSpawner.ts
    typingJudge.ts
    scoring.ts
  render/
    renderer.ts
    sceneManager.ts
    wordView.ts
    uiView.ts
  data/
    words.json
  types/
    game.ts
```

---

## 16. 責務

* GameController:
  ゲーム進行管理

* InputManager:
  キー入力管理

* TypingJudge:
  入力判定

* WordSpawner:
  単語生成

* Renderer:
  PixiJS初期化・描画更新

* UIView:
  UI表示

---

## 17. 実装ルール

* TypeScriptで実装
* any禁止
* マジックナンバー禁止
* ロジックと描画を分離
* 小さく実装して段階的に拡張

---

## 18. 受け入れ条件

* タイトル / プレイ / リザルトが動作
* タイピングで消せる
* スコア更新される
* 時間で終了する
* エラーなくブラウザで動作

---

## 19. Claude Codeへの指示

以下の順で実装すること:

1. 最小構成で動くプロトタイプを作成
2. モジュール分割して整理
3. 演出（フェード・拡大など）を追加

制約:

* 1回で全実装しない
* 動作確認可能な状態を優先
* READMEに起動手順を記載する
