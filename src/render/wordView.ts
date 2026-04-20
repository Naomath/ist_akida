import { Container, Text, TextStyle } from "pixi.js";
import type { GameState } from "@/types/game";

const kanaStyle = new TextStyle({
  fontFamily: "sans-serif",
  fontSize: 36,
  fill: 0xffffff,
  fontWeight: "bold",
});

const spellingStyle = new TextStyle({
  fontFamily: "monospace",
  fontSize: 22,
  fill: 0x888888,
});

const romajiTypedStyle = new TextStyle({
  fontFamily: "monospace",
  fontSize: 28,
  fill: 0x00e5ff,
  fontWeight: "bold",
});

const romajiRemainStyle = new TextStyle({
  fontFamily: "monospace",
  fontSize: 28,
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

  const centerX = width / 2;
  const centerY = height / 2;

  // かな表示
  const kanaText = new Text({ text: word.kana, style: kanaStyle });
  kanaText.anchor.set(0.5, 0.5);
  kanaText.position.set(centerX, centerY - 70);
  layer.addChild(kanaText);

  // 英語の綴り（かなの下）
  const spellingText = new Text({ text: word.romaji, style: spellingStyle });
  spellingText.anchor.set(0.5, 0.5);
  spellingText.position.set(centerX, centerY - 35);
  layer.addChild(spellingText);

  // ローマ字（入力済み文字 + 残りはアンダーバー）
  const typed = state.currentInput;
  const underscores = "_".repeat(Math.max(word.romaji.length - typed.length, 0));

  const typedText = new Text({ text: typed, style: romajiTypedStyle });
  const remainText = new Text({ text: underscores, style: romajiRemainStyle });

  const totalWidth = typedText.width + remainText.width;
  typedText.position.set(centerX - totalWidth / 2, centerY - 20);
  remainText.position.set(centerX - totalWidth / 2 + typedText.width, centerY - 20);

  layer.addChild(typedText);
  layer.addChild(remainText);
}
