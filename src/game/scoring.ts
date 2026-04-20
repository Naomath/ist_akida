const BASE_SCORE_PER_CHAR = 10;
const MAX_COMBO_MULTIPLIER = 1.0;
const COMBO_STEP = 0.05;

export function calcScore(romajiLength: number, combo: number): number {
  const base = romajiLength * BASE_SCORE_PER_CHAR;
  const multiplier = 1.0 + Math.min(combo * COMBO_STEP, MAX_COMBO_MULTIPLIER);
  return Math.floor(base * multiplier);
}
