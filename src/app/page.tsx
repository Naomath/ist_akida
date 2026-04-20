"use client";

import { useEffect, useRef } from "react";
import { bootstrap, teardown } from "@/app/bootstrap";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    bootstrap(canvas).catch(console.error);

    return () => {
      teardown();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}
