"use client";
import { useEffect, useState } from "react";

export default function SunCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) =>
      setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      style={{ left: pos.x, top: pos.y }}
      className="fixed pointer-events-none z-[9999] w-8 h-8 rounded-full
                 bg-yellow-400 blur-sm shadow-[0_0_30px_10px_rgba(250,204,21,0.6)]
                 -translate-x-1/2 -translate-y-1/2"
    />
  );
}
