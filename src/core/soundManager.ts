const cache: Record<string, HTMLAudioElement> = {};

function load(path: string): HTMLAudioElement {
  if (!cache[path]) {
    cache[path] = new Audio(path);
  }
  return cache[path];
}

function play(name: string): void {
  const audio = load(`/sound_data/${name}.mp3`);
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

// BGM
let currentBgm: HTMLAudioElement | null = null;

function playBgm(filename: string): void {
  const next = load(`/sound_data/${filename}`);
  if (currentBgm === next) return; // すでに再生中
  if (currentBgm) {
    currentBgm.pause();
    currentBgm.currentTime = 0;
  }
  next.loop = true;
  next.play().catch(() => {});
  currentBgm = next;
}

function stopBgm(): void {
  if (currentBgm) {
    currentBgm.pause();
    currentBgm.currentTime = 0;
    currentBgm = null;
  }
}

export const sound = {
  ok: () => play("ok"),
  miss: () => play("miss"),
  pass: () => play("pass"),
  finish: () => play("finish"),
  bgmIntro: () => playBgm("intro.wav"),
  bgmPlay: () => playBgm("play.wav"),
  bgmStop: stopBgm,
};
