import { useEffect, useRef, useState } from "react";

export default function RGBFlareCursor({
  size = 220,
  intensity = "opacity-30",
  color = "#03a0bc",
}) {
  const wrapRef = useRef(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (coarse || reduced) {
      setEnabled(false);
      return;
    }

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let rafId = 0;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const tick = () => {
      const k = 0.12; // smoothing
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${pos.x - size / 2}px, ${
          pos.y - size / 2
        }px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [size]);

  if (!enabled) return null;

  return (
    // WRAPPER: only handles translation (position)
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* INNER: visual look & pulse (scale/blur) */}
      <div
        className={[
          "w-full h-full rounded-full",
          "mix-blend-screen blur-3xl",
          intensity,
          "flare-pulse", // only scales/blur — no translate here
        ].join(" ")}
        style={{
          backgroundColor: color,
          boxShadow: `0 0px 60px 60px ${color}33`,
        }}
      />
    </div>
  );
}
