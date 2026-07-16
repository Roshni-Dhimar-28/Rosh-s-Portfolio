import { useEffect, useRef } from "react";

export function CursorTrail() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const container = ref.current!;
    let last = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 55) return;
      last = now;
      const s = document.createElement("span");
      const symbols = ["✦", "✧", "✩", "・", "⋆", "♡", "✧"];
      const text = symbols[Math.floor(Math.random() * symbols.length)];
      const colors = [
        "var(--rose-deep)",
        "var(--sage)",
        "var(--butter-deep)",
        "var(--clay)",
        "var(--ink-soft)",
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];

      s.textContent = text;
      s.style.cssText = `
        position: fixed; left: ${e.clientX}px; top: ${e.clientY}px;
        pointer-events: none; z-index: 9999;
        font-size: ${10 + Math.random() * 12}px;
        color: color-mix(in oklab, ${color} 85%, transparent);
        transform: translate(-50%, -50%) rotate(${(Math.random() - 0.5) * 30}deg);
        transition: transform 1100ms cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1100ms ease-out;
      `;
      container.appendChild(s);
      requestAnimationFrame(() => {
        s.style.transform = `translate(-50%, -50%) translate(${(Math.random() - 0.5) * 60}px, ${-30 - Math.random() * 40}px) rotate(${(Math.random() - 0.5) * 120}deg)`;
        s.style.opacity = "0";
      });
      setTimeout(() => s.remove(), 1200);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div ref={ref} aria-hidden />;
}
