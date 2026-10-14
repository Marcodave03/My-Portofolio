"use client";

import { useEffect, useRef } from "react";

/**
 * The dot-and-ring cursor from the original portfolio. The dot keeps up
 * with the pointer; the ring lags and opens over anything clickable.
 * Driven by a single rAF lerp rather than a tween library.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip entirely on touch devices and for readers who want less motion.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let dx = x;
    let dy = y;
    let rx = x;
    let ry = y;
    let frame = 0;

    let shown = false;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;

      if (!shown) {
        shown = true;
        // Jump straight to the pointer the first time rather than gliding
        // in from the middle of the screen.
        dx = rx = x;
        dy = ry = y;
        if (dot.current) dot.current.style.opacity = "1";
        if (ring.current) ring.current.style.opacity = "1";
      }

      // Open the ring over anything the reader can actually act on.
      const el = e.target as Element | null;
      const over = !!el?.closest?.("a, button, [role='button'], input, summary");
      ring.current?.setAttribute("data-over", over ? "true" : "false");
    };

    const tick = () => {
      dx += (x - dx) * 0.35;
      dy += (y - dy) * 0.35;
      rx += (x - rx) * 0.14;
      ry += (y - ry) * 0.14;

      if (dot.current) dot.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;

      frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (dot.current) dot.current.style.opacity = "1";
      if (ring.current) ring.current.style.opacity = "1";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return (
    <div aria-hidden>
      <div ref={dot} className="cursor-dot" style={{ opacity: 0 }} />
      <div ref={ring} className="cursor-ring" data-over="false" style={{ opacity: 0 }} />
    </div>
  );
}
