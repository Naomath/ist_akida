import { Container, Text, TextStyle, Graphics, Sprite, Assets } from "pixi.js";
import type { GameState } from "@/types/game";

export async function loadSceneFonts(): Promise<void> {
  // フォントロードなし
}

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
  fontFamily: "sans-serif",
  fontSize: 36,
  fill: 0xffffff,
});

export async function renderTitleScene(
  layer: Container,
  width: number,
  height: number,
  onSelectRound: (round: 1 | 2) => void
): Promise<void> {
  layer.removeChildren();

  const cx = width / 2;
  const cy = height / 2;

  // 背景画像
  const texture = await Assets.load("/akida.png");
  const bg = new Sprite(texture);
  const scale = Math.min(width / texture.width, height / texture.height);
  bg.scale.set(scale);
  bg.anchor.set(0.5, 0.5);
  bg.position.set(cx, cy);
  bg.alpha = 0.4;
  layer.addChild(bg);

  const title = new Text({ text: "秋打 akida", style: titleStyle });
  title.anchor.set(0.5, 0.5);
  title.position.set(cx, cy - 80);
  layer.addChild(title);

  const sub = new Text({ text: "Beat akita with precise typing!!!!!!", style: subStyle });
  sub.anchor.set(0.5, 0.5);
  sub.position.set(cx, cy - 10);
  layer.addChild(sub);

  // ラウンド選択ボタン
  const btnW = 180;
  const btnH = 52;
  const gap = 20;

  const btn1 = new Graphics();
  btn1.roundRect(cx - btnW - gap / 2, cy + 50, btnW, btnH, 12).fill(0x00e5ff);
  btn1.interactive = true;
  btn1.cursor = "pointer";
  btn1.on("pointerdown", () => onSelectRound(1));
  layer.addChild(btn1);

  const label1 = new Text({ text: "第一回", style: btnLabelStyle });
  label1.anchor.set(0.5, 0.5);
  label1.position.set(cx - btnW / 2 - gap / 2, cy + 50 + btnH / 2);
  label1.interactive = false;
  layer.addChild(label1);

  const btn2 = new Graphics();
  btn2.roundRect(cx + gap / 2, cy + 50, btnW, btnH, 12).fill(0x00e5ff);
  btn2.interactive = true;
  btn2.cursor = "pointer";
  btn2.on("pointerdown", () => onSelectRound(2));
  layer.addChild(btn2);

  const label2 = new Text({ text: "第二回", style: btnLabelStyle });
  label2.anchor.set(0.5, 0.5);
  label2.position.set(cx + btnW / 2 + gap / 2, cy + 50 + btnH / 2);
  label2.interactive = false;
  layer.addChild(label2);
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

  const roundLabel = new Text({
    text: `第${state.round === 1 ? "一" : "二"}回`,
    style: subStyle,
  });
  roundLabel.anchor.set(0.5, 0.5);
  roundLabel.position.set(cx, cy - 140);
  layer.addChild(roundLabel);

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
