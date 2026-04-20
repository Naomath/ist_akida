import { Container, Text, TextStyle } from "pixi.js";
import type { GameState } from "@/types/game";

const kanaStyle = new TextStyle({
  fontFamily: "sans-serif",
  fontSize: 72,
  fill: 0xffffff,
  fontWeight: "bold",
});

const spellingStyle = new TextStyle({
  fontFamily: "monospace",
  fontSize: 36,
  fill: 0x888888,
});

const romajiTypedStyle = new TextStyle({
  fontFamily: "monospace",
  fontSize: 52,
  fill: 0x00e5ff,
  fontWeight: "bold",
});

const romajiRemainStyle = new TextStyle({
  fontFamily: "monospace",
  fontSize: 52,
  fill: 0xaaaaaa,
});

export function renderWordView(
  layer: Container,
  state: GameState,
  width: number,
  height: number
): void {
  layer.removeChildren();

  const word = state.activeWords[0];
  if (!word) return;

  const cx = width / 2;
  const cy = height / 2;

  // かな
  const kanaText = new Text({ text: word.kana, style: kanaStyle });
  kanaText.anchor.set(0.5, 0.5);
  kanaText.position.set(cx, cy - 80);
  layer.addChild(kanaText);

  // 英語の綴り
  const spellingText = new Text({ text: word.romaji, style: spellingStyle });
  spellingText.anchor.set(0.5, 0.5);
  spellingText.position.set(cx, cy - 10);
  layer.addChild(spellingText);

  // 入力済み + アンダーバー
  const typed = state.currentInput;
  const underscores = "_".repeat(Math.max(word.romaji.length - typed.length, 0));

  const typedText = new Text({ text: typed, style: romajiTypedStyle });
  const remainText = new Text({ text: underscores, style: romajiRemainStyle });

  const totalWidth = typedText.width + remainText.width;
  typedText.position.set(cx - totalWidth / 2, cy + 40);
  remainText.position.set(cx - totalWidth / 2 + typedText.width, cy + 40);

  layer.addChild(typedText);
  layer.addChild(remainText);
}
