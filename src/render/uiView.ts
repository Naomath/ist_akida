import { Container, Text, TextStyle, Graphics } from "pixi.js";
import type { GameState } from "@/types/game";

const labelStyle = new TextStyle({
  fontFamily: "sans-serif",
  fontSize: 18,
  fill: 0xaaaaaa,
});

const valueStyle = new TextStyle({
  fontFamily: "monospace",
  fontSize: 26,
  fill: 0xffffff,
  fontWeight: "bold",
});

const timerStyle = new TextStyle({
  fontFamily: "monospace",
  fontSize: 28,
  fill: 0xffdd57,
  fontWeight: "bold",
});

const roundStyle = new TextStyle({
  fontFamily: "sans-serif",
  fontSize: 18,
  fill: 0xaaaaaa,
});

export function renderUIView(
  layer: Container,
  state: GameState,
  width: number,
  height: number
): void {
  layer.removeChildren();

  if (state.scene !== "playing") return;

  const cx = width / 2;
  const cy = height / 2;

  // ── タイマーエリア（中央上寄り、単語より上） ──
  const timerY = cy - 170;

  const roundText = new Text({
    text: `第${state.round === 1 ? "一" : "二"}回`,
    style: roundStyle,
  });
  roundText.anchor.set(0.5, 0.5);
  roundText.position.set(cx, timerY - 24);
  layer.addChild(roundText);

  const timeText = new Text({
    text: Math.ceil(state.timeRemaining).toString(),
    style: timerStyle,
  });
  timeText.anchor.set(0.5, 0.5);
  timeText.position.set(cx, timerY + 8);
  layer.addChild(timeText);

  const barW = 320;
  const barH = 6;
  const ratio = Math.max(state.timeRemaining / 90, 0);
  const bar = new Graphics();
  bar.rect(cx - barW / 2, timerY + 30, barW, barH).fill(0x333355);
  bar.rect(cx - barW / 2, timerY + 30, barW * ratio, barH).fill(0xffdd57);
  layer.addChild(bar);

  // ── スコア・コンボ・正解数（中央下寄り、入力より下） ──
  const statsY = cy + 120;
  const colW = 120;

  // SCORE
  const scoreLabel = new Text({ text: "SCORE", style: labelStyle });
  scoreLabel.anchor.set(0.5, 0.5);
  scoreLabel.position.set(cx - colW, statsY);
  layer.addChild(scoreLabel);

  const scoreVal = new Text({ text: state.score.toString(), style: valueStyle });
  scoreVal.anchor.set(0.5, 0.5);
  scoreVal.position.set(cx - colW, statsY + 26);
  layer.addChild(scoreVal);

  // COMBO
  const comboLabel = new Text({ text: "COMBO", style: labelStyle });
  comboLabel.anchor.set(0.5, 0.5);
  comboLabel.position.set(cx, statsY);
  layer.addChild(comboLabel);

  const comboVal = new Text({ text: `×${state.combo}`, style: valueStyle });
  comboVal.anchor.set(0.5, 0.5);
  comboVal.position.set(cx, statsY + 26);
  layer.addChild(comboVal);

  // 正解数
  const correctLabel = new Text({ text: "正解数", style: labelStyle });
  correctLabel.anchor.set(0.5, 0.5);
  correctLabel.position.set(cx + colW, statsY);
  layer.addChild(correctLabel);

  const correctVal = new Text({ text: state.correctCount.toString(), style: valueStyle });
  correctVal.anchor.set(0.5, 0.5);
  correctVal.position.set(cx + colW, statsY + 26);
  layer.addChild(correctVal);
}
