import { Container, Text, TextStyle, Graphics } from "pixi.js";
import type { GameState } from "@/types/game";

const titleStyle = new TextStyle({
  fontFamily: "sans-serif",
  fontSize: 56,
  fill: 0xffffff,
  fontWeight: "bold",
  dropShadow: { color: 0x00e5ff, blur: 16, distance: 0 },
});

const subStyle = new TextStyle({
  fontFamily: "sans-serif",
  fontSize: 24,
  fill: 0xaaaaaa,
});

const btnLabelStyle = new TextStyle({
  fontFamily: "sans-serif",
  fontSize: 28,
  fill: 0x1a1a2e,
  fontWeight: "bold",
});

const countdownStyle = new TextStyle({
  fontFamily: "sans-serif",
  fontSize: 120,
  fill: 0xffffff,
  fontWeight: "bold",
  dropShadow: { color: 0x00e5ff, blur: 24, distance: 0 },
});

const resultTitleStyle = new TextStyle({
  fontFamily: "sans-serif",
  fontSize: 48,
  fill: 0xffd700,
  fontWeight: "bold",
});

const resultValueStyle = new TextStyle({
  fontFamily: "monospace",
  fontSize: 36,
  fill: 0xffffff,
});

export function renderTitleScene(
  layer: Container,
  width: number,
  height: number,
  onStart: () => void
): void {
  layer.removeChildren();

  const cx = width / 2;
  const cy = height / 2;

  const title = new Text({ text: "タイピング道場", style: titleStyle });
  title.anchor.set(0.5, 0.5);
  title.position.set(cx, cy - 80);
  layer.addChild(title);

  const sub = new Text({ text: "ローマ字で単語を打とう！", style: subStyle });
  sub.anchor.set(0.5, 0.5);
  sub.position.set(cx, cy - 10);
  layer.addChild(sub);

  // START ボタン
  const btnW = 200;
  const btnH = 52;
  const btn = new Graphics();
  btn.roundRect(cx - btnW / 2, cy + 50, btnW, btnH, 12).fill(0x00e5ff);
  btn.interactive = true;
  btn.cursor = "pointer";
  btn.on("pointerdown", onStart);
  layer.addChild(btn);

  const btnLabel = new Text({ text: "START", style: btnLabelStyle });
  btnLabel.anchor.set(0.5, 0.5);
  btnLabel.position.set(cx, cy + 50 + btnH / 2);
  btnLabel.interactive = false;
  layer.addChild(btnLabel);
}

export function renderStartScene(
  layer: Container,
  width: number,
  height: number
): void {
  layer.removeChildren();

  const text = new Text({ text: "スタート", style: countdownStyle });
  text.anchor.set(0.5, 0.5);
  text.position.set(width / 2, height / 2);
  layer.addChild(text);
}

export function renderResultScene(
  layer: Container,
  width: number,
  height: number,
  state: GameState,
  onRestart: () => void
): void {
  layer.removeChildren();

  const cx = width / 2;
  const cy = height / 2;

  const title = new Text({ text: "RESULT", style: resultTitleStyle });
  title.anchor.set(0.5, 0.5);
  title.position.set(cx, cy - 100);
  layer.addChild(title);

  const scoreText = new Text({
    text: `スコア: ${state.score}`,
    style: resultValueStyle,
  });
  scoreText.anchor.set(0.5, 0.5);
  scoreText.position.set(cx, cy - 30);
  layer.addChild(scoreText);

  const correctText = new Text({
    text: `正解数: ${state.correctCount}`,
    style: resultValueStyle,
  });
  correctText.anchor.set(0.5, 0.5);
  correctText.position.set(cx, cy + 20);
  layer.addChild(correctText);

  const comboText = new Text({
    text: `最大コンボ: ${state.maxCombo}`,
    style: resultValueStyle,
  });
  comboText.anchor.set(0.5, 0.5);
  comboText.position.set(cx, cy + 70);
  layer.addChild(comboText);

  // 再スタートボタン
  const btnW = 240;
  const btnH = 52;
  const btn = new Graphics();
  btn.roundRect(cx - btnW / 2, cy + 120, btnW, btnH, 12).fill(0x00e5ff);
  btn.interactive = true;
  btn.cursor = "pointer";
  btn.on("pointerdown", onRestart);
  layer.addChild(btn);

  const btnLabel = new Text({ text: "もう一度", style: btnLabelStyle });
  btnLabel.anchor.set(0.5, 0.5);
  btnLabel.position.set(cx, cy + 120 + btnH / 2);
  layer.addChild(btnLabel);
}
