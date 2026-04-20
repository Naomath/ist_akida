import { getState, setState, resetState } from "@/core/stateStore";
import { startListening, stopListening } from "@/core/inputManager";
import { spawnWord } from "@/game/wordSpawner";
import { findTargetWord, isComplete, isPrefix } from "@/game/typingJudge";
import { calcScore } from "@/game/scoring";
import { sound } from "@/core/soundManager";


export function startGame(): void {
  resetState();
  setState((s) => ({
    ...s,
    scene: "playing",
    activeWords: [spawnWord(null)],
  }));
  startListening(handleKey);
}

export function endGame(): void {
  stopListening();
  sound.finish();
  setState((s) => ({ ...s, scene: "result" }));
}

export function goToTitle(): void {
  resetState();
}

function handleKey(key: string): void {
  const s = getState();
  if (s.scene !== "playing") return;

  if (key === "Escape") {
    stopListening();
    resetState(); // scene: "title" を subscriber に通知
    return;
  }

  if (key === "Backspace") {
    setState((prev) => {
      const next = prev.currentInput.slice(0, -1);
      return { ...prev, currentInput: next, targetWordId: null };
    });
    return;
  }

  const nextInput = s.currentInput + key;

  // ターゲットが確定していない場合は前方一致で探す
  const target = findTargetWord(nextInput, s.activeWords);

  if (target === null || !isPrefix(nextInput, target.romaji)) {
    // ミス：コンボリセットのみ、入力はそのまま維持
    sound.miss();
    setState((prev) => ({ ...prev, combo: 0 }));
    return;
  }

  if (isComplete(nextInput, target.romaji)) {
    // 単語クリア
    sound.pass();
    const newCombo = s.combo + 1;
    const gained = calcScore(target.romaji.length, s.combo);
    const newMaxCombo = Math.max(s.maxCombo, newCombo);
    const remaining = s.activeWords.filter((w) => w.instanceId !== target.instanceId);
    const lastId = target.masterId;
    const next = spawnWord(lastId);

    setState((prev) => ({
      ...prev,
      score: prev.score + gained,
      combo: newCombo,
      maxCombo: newMaxCombo,
      correctCount: prev.correctCount + 1,
      currentInput: "",
      targetWordId: null,
      activeWords: [...remaining, next],
    }));
  } else {
    // 前方一致中（正しい入力）
    sound.ok();
    setState((prev) => ({
      ...prev,
      currentInput: nextInput,
      targetWordId: target.instanceId,
    }));
  }
}

export function tickTimer(deltaMs: number): void {
  const s = getState();
  if (s.scene !== "playing") return;

  const nextTime = s.timeRemaining - deltaMs / 1000;
  if (nextTime <= 0) {
    setState((prev) => ({ ...prev, timeRemaining: 0 }));
    endGame();
  } else {
    setState((prev) => ({ ...prev, timeRemaining: nextTime }));
  }
}
