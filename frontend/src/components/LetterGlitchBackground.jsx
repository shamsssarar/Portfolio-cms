import { useEffect, useRef } from "react";

export default function LetterGlitchBackground({
  charSet = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*@{}[]<>/\\:=+?-",
  cellSize = 16,          // size of each cell (px)
  speed = 55,             // ms between flips
  flipChance = 0.08,      // probability a cell changes per tick
  opacity = 1  ,
  bgLight = "#ffffff" ,
  bgDark = "#22303d" ,       // overall strength
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const timerRef = useRef(null);
  const runningRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dark = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark = () => document.documentElement.classList.contains("dark");

    // grid dims
    let cols = Math.ceil(width / cellSize);
    let rows = Math.ceil(height / cellSize);

    // initialize grid with random characters
    let grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => rndChar())
    );

    function rndChar() {
      return charSet[Math.floor(Math.random() * charSet.length)];
    }

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);
      grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => rndChar())
      );
    }

    function drawScanline(t) {
      // subtle moving scanline
      const y = (t / 18) % height;
      const grad = ctx.createLinearGradient(0, y - 10, 0, y + 10);
      grad.addColorStop(0, "rgba(255,255,255,0)");
      grad.addColorStop(0.5, isDark() ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, y - 10, width, 20);
    }

    function render(t) {
      if (!runningRef.current) return;
      // base tint so letters show on both themes
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = opacity;
     ctx.fillStyle = (isDark() ? bgDark : bgLight);
 // slate-900 / slate-50 tint
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;

      // text style
      ctx.font = `${Math.floor(cellSize * 0.9)}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
      ctx.textBaseline = "top";
      ctx.shadowColor = isDark() ? "rgba(67, 56, 202, 0.25)" : "rgba(30, 64, 175, 0.2)";
      ctx.shadowBlur = 6;
      ctx.fillStyle = "rgba(3, 160, 188, 0.3)";
 // light blue in dark, blue in light

      // draw grid
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx.fillText(grid[r][c], c * cellSize, r * cellSize);
        }
      }

      // overlay scanline + vignette for depth
      drawScanline(t);
      const v = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.8);
      v.addColorStop(0, "rgba(0,0,0,0)");
      v.addColorStop(1, isDark() ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.15)");
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, width, height);

      rafRef.current = requestAnimationFrame(render);
    }

    function flipSome() {
      // randomly flip a portion of characters each tick
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() < flipChance) grid[r][c] = rndChar();
        }
      }
    }

    function start() {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(render);
      if (!timerRef.current) timerRef.current = setInterval(flipSome, speed);
    }

    function stop() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    }

    function onVisibility() {
      runningRef.current = !document.hidden;
      runningRef.current ? start() : stop();
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    dark.addEventListener?.("change", () => {}); // palette updates next frame

    resize();

    if (reduce) {
      // static frame for accessibility
      flipSome();
      render(0);
    } else {
      start();
    }

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      dark.removeEventListener?.("change", () => {});
    };
  }, [charSet, cellSize, speed, flipChance, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        mixBlendMode: "normal"
      }}
    />
  );
}
