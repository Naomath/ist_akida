import type { WordMaster, ActiveWord } from "@/types/game";

let words: WordMaster[] = [];
let instanceCounter = 0;

export function initWords(loaded: WordMaster[]): void {
  words = loaded;
}

/** ランダムに単語を選ぶ（前回と同じ単語は避ける） */
export function spawnWord(lastMasterId: number | null): ActiveWord {
  if (words.length === 0) {
    throw new Error("単語データが空です。public/first.csv を確認してください。");
  }
  let candidates = words;
  if (lastMasterId !== null && words.length > 1) {
    candidates = words.filter((w) => w.id !== lastMasterId);
  }
  if (candidates.length === 0) candidates = words;
  const word = candidates[Math.floor(Math.random() * candidates.length)];
  instanceCounter++;
  return {
    instanceId: instanceCounter,
    masterId: word.id,
    kana: word.kana,
    romaji: word.romaji,
  };
}
