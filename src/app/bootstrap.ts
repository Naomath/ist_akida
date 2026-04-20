import { Application } from "pixi.js";
import { initRenderer, type Layers } from "@/render/renderer";
import { loadWordsFromCSV } from "@/data/wordLoader";
import { initWords } from "@/game/wordSpawner";
import { getState, subscribe } from "@/core/stateStore";
import {
  startGame,
  goToTitle,
  tickTimer,
} from "@/game/gameController";
import { renderWordView } from "@/render/wordView";
import { renderUIView } from "@/render/uiView";
import {
  renderTitleScene,
  renderStartScene,
  renderResultScene,
} from "@/render/sceneManager";
import { sound } from "@/core/soundManager";

let rafId: number | null = null;
let lastTime: number | null = null;

function gameLoop(
  app: Application,
  layers: Layers,
  timestamp: number
): void {
  const delta = lastTime !== null ? timestamp - lastTime : 0;
  lastTime = timestamp;

  const state = getState();

  if (state.scene === "playing") {
    tickTimer(delta);
  }

  // 描画更新
  const w = app.screen.width;
  const h = app.screen.height;
  const cur = getState();

  if (cur.scene === "playing") {
    renderWordView(layers.word, cur, w, h);
    renderUIView(layers.ui, cur, w, h);
  }

  rafId = requestAnimationFrame((ts) => gameLoop(app, layers, ts));
}

export async function bootstrap(canvas: HTMLCanvasElement): Promise<void> {
  const words = await loadWordsFromCSV();
  if (words.length === 0) {
    console.error("CSVの読み込みに失敗しました。public/first.csv が存在するか確認してください。");
  }
  initWords(words);

  const { app, layers } = await initRenderer(canvas);

  const w = app.screen.width;
  const h = app.screen.height;

  function showTitle(): void {
    layers.word.removeChildren();
    layers.ui.removeChildren();
    renderTitleScene(layers.background, w, h, handleStart);
  }

  function handleStart(): void {
    layers.background.removeChildren();

    setTimeout(() => {
      renderStartScene(layers.word, w, h);

      const audio = new Audio("/sound_data/start.mp3");
      audio.play().catch(() => {/* 音声ファイルなし時は無視 */});

      setTimeout(() => {
        layers.word.removeChildren();
        startGame();
      }, 1000);
    }, 300);
  }

  function handleRestart(): void {
    goToTitle();
    showTitle();
  }

  // 状態変化でシーン切り替え
  subscribe((state) => {
    if (state.scene === "playing") {
      layers.background.removeChildren();
      sound.bgmPlay();
    }
    if (state.scene === "result") {
      layers.word.removeChildren();
      layers.ui.removeChildren();
      renderResultScene(layers.background, w, h, state, handleRestart);
      sound.bgmIntro();
    }
    if (state.scene === "title") {
      showTitle();
      sound.bgmIntro();
    }
  });

  // ゲームループ開始
  rafId = requestAnimationFrame((ts) => gameLoop(app, layers, ts));

  showTitle();

  // ブラウザのAutoplay制限のため、最初のユーザー操作でBGMを開始
  const startIntroBgm = () => {
    sound.bgmIntro();
    document.removeEventListener("pointerdown", startIntroBgm);
    document.removeEventListener("keydown", startIntroBgm);
  };
  document.addEventListener("pointerdown", startIntroBgm);
  document.addEventListener("keydown", startIntroBgm);
}

export function teardown(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  lastTime = null;
  sound.bgmStop();
}
