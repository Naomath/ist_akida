import { Application, Container } from "pixi.js";

export type Layers = {
  background: Container;
  word: Container;
  ui: Container;
};

let app: Application | null = null;

export async function initRenderer(canvas: HTMLCanvasElement): Promise<{ app: Application; layers: Layers }> {
  app = new Application();
  await app.init({
    canvas,
    width: canvas.clientWidth,
    height: canvas.clientHeight,
    backgroundColor: 0x1a1a2e,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  const layers: Layers = {
    background: new Container(),
    word: new Container(),
    ui: new Container(),
  };

  app.stage.addChild(layers.background);
  app.stage.addChild(layers.word);
  app.stage.addChild(layers.ui);

  return { app, layers };
}

export function destroyRenderer(): void {
  if (app) {
    app.destroy(false);
    app = null;
  }
}
