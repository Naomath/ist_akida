import { Container, Text, TextStyle, Graphics } from "pixi.js";
import type { GameState } from "@/types/game";

const labelStyle = new TextStyle({
  fontFamily: "sans-serif",
  fontSize: 20,
  fill: 0xcccccc,
});

const valueStyle = new TextStyle({
  fontFamily: "monospace",
  fontSize: 24,
  fill: 0xffffff,
  fontWeight: "bold",
});

const timerStyle = new TextStyle({
  fontFamily: "monospace",
  fontSize: 32,
  fill: 0xffdd57,
  fontWeight: "bold",
});

export function renderUIView(
  layer: Container,
  state: GameState,
  width: number,
  height: number
): void {
  layer.removeChildren();

  if (state.scene !== "playing") return;

  const pad = 20;

  // タイマー（中央上）
  const timeText = new Text({
    text: Math.ceil(state.timeRemaining).toString(),
    style: timerStyle,
  });
  timeText.anchor.set(0.5, 0);
  timeText.position.set(width / 2, pad);
  layer.addChild(timeText);

  // タイマーバー
  const barWidth = width - pad * 2;
  const barHeight = 6;
  const ratio = Math.max(state.timeRemaining / 60, 0);
  const bar = new Graphics();
  bar.rect(pad, pad + timeText.height + 4, barWidth, barHeight).fill(0x333355);
  bar.rect(pad, pad + timeText.height + 4, barWidth * ratio, barHeight).fill(0xffdd57);
  layer.addChild(bar);

  // スコア（左上）
  const scoreLabel = new Text({ text: "SCORE", style: labelStyle });
  scoreLabel.position.set(pad, pad);
  layer.addChild(scoreLabel);

  const scoreVal = new Text({ text: state.score.toString(), style: valueStyle });
  scoreVal.position.set(pad, pad + scoreLabel.height + 2);
  layer.addChild(scoreVal);

  // コンボ（右上）
  const comboLabel = new Text({ text: "COMBO", style: labelStyle });
  comboLabel.anchor.set(1, 0);
  comboLabel.position.set(width - pad, pad);
  layer.addChild(comboLabel);

  const comboVal = new Text({ text: `×${state.combo}`, style: valueStyle });
  comboVal.anchor.set(1, 0);
  comboVal.position.set(width - pad, pad + comboLabel.height + 2);
  layer.addChild(comboVal);

  // 正解数（左下）
  const correctLabel = new Text({ text: `正解数: ${state.correctCount}`, style: labelStyle });
  correctLabel.position.set(pad, height - pad - correctLabel.height);
  layer.addChild(correctLabel);
}
