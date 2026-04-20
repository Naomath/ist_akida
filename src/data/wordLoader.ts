import type { WordMaster } from "@/types/game";

export async function loadWordsFromCSV(): Promise<WordMaster[]> {
  const res = await fetch("/first.csv");
  const text = await res.text();

  const lines = text.replace(/\r/g, "").trim().split("\n");

  const words: WordMaster[] = [];
  for (const line of lines) {
    const [rawId, rawKana, rawRomaji] = line.split(",");
    const id = parseInt(rawId?.trim() ?? "", 10);
    if (isNaN(id)) continue; // ヘッダー行や空行をスキップ
    words.push({
      id,
      kana: rawKana?.trim() ?? "",
      romaji: rawRomaji?.trim() ?? "",
    });
  }
  return words;
}
