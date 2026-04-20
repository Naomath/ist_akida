export type Scene = "title" | "countdown" | "playing" | "result";

export type WordMaster = {
  id: number;
  kana: string;
  romaji: string;
};

export type ActiveWord = {
  instanceId: number;
  masterId: number;
  kana: string;
  romaji: string;
};

export type GameState = {
  scene: Scene;
  score: number;
  combo: number;
  maxCombo: number;
  timeRemaining: number;
  activeWords: ActiveWord[];
  currentInput: string;
  targetWordId: number | null;
  correctCount: number;
};
