import type { ActiveWord } from "@/types/game";

/** 入力文字列がローマ字の前方一致かを判定する */
export function isPrefix(input: string, romaji: string): boolean {
  return romaji.startsWith(input);
}

/** 入力が単語と完全一致かを判定する */
export function isComplete(input: string, romaji: string): boolean {
  return input === romaji;
}

/** 対象単語を選ぶ（前方一致する最初の単語） */
export function findTargetWord(
  input: string,
  words: ActiveWord[]
): ActiveWord | null {
  if (input.length === 0) return null;
  return words.find((w) => isPrefix(input, w.romaji)) ?? null;
}
