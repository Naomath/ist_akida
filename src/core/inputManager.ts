type KeyHandler = (key: string) => void;

let handler: KeyHandler | null = null;

function onKeyDown(e: KeyboardEvent): void {
  if (!handler) return;
  if (e.key === "Escape") {
    handler("Escape");
    return;
  }
  if (e.key === "Backspace") {
    handler("Backspace");
    return;
  }
  if (e.key.length === 1) {
    handler(e.key);
  }
}

export function startListening(fn: KeyHandler): void {
  handler = fn;
  window.addEventListener("keydown", onKeyDown);
}

export function stopListening(): void {
  handler = null;
  window.removeEventListener("keydown", onKeyDown);
}
