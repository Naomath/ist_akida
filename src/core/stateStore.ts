import type { GameState } from "@/types/game";

const INITIAL_TIME = 90;

function createInitialState(): GameState {
  return {
    scene: "title",
    round: 1,
    score: 0,
    combo: 0,
    maxCombo: 0,
    timeRemaining: INITIAL_TIME,
    activeWords: [],
    currentInput: "",
    targetWordId: null,
    correctCount: 0,
  };
}

let state: GameState = createInitialState();

type Listener = (state: GameState) => void;
const listeners: Listener[] = [];

export function getState(): GameState {
  return state;
}

export function setState(updater: (prev: GameState) => GameState): void {
  state = updater(state);
  listeners.forEach((fn) => fn(state));
}

export function subscribe(fn: Listener): () => void {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export function resetState(): void {
  state = createInitialState();
  listeners.forEach((fn) => fn(state));
}
