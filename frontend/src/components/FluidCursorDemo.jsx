import React, { useEffect, useRef, useState } from "react";

// Single-file demo: exports a page with a fluid, springy cursor that trails the mouse.
// JSX only (no TypeScript). Tailwind-first; no external libs.
// Shortcuts: Press "C" to toggle custom cursor on/off.

export default function FluidCursorDemo() {
  const enabledRef = useRef(true);
  const [enabled, setEnabled] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

  // Target and simulated state
  const targetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const curRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const velRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const rafRef = useRef(0);

  // El refs
  const blobRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    enabledRef.current = enabled;
    if (enabled) {
      document.documentElement.classList.add("cursor-none");
    } else {
      document.documentElement.classList.remove("cursor-none");
    }
  }, [enabled]);

  useEffect(() => {
    // pointer move handlers (mouse + touch)
    const onMouseMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      if (reducedMotion) moveInstant();
    };
    const onTouchMove = (e) => {
      const t = e.touches[0];
      if (!t) return;
      targetRef.current.x = t.clientX;
      targetRef.current.y = t.clientY;
      if (reducedMotion) moveInstant();
    };

    const onKey = (e) => {
      if (e.key.toLowerCase() === "c") {
        setEnabled((v) => !v);
      }
    };

    const onOver = (e) => {
      const el = e.target;
      if (isInteractive(el)) scaleRef.current = 1.2;
    };
    const onOut = () => {
      scaleRef.current = 1;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKey);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    // start/stop RAF
    if (!reducedMotion) startRAF();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  const moveInstant = () => {
    // Minimal motion for reduced-motion users
    if (!blobRef.current || !coreRef.current) return;
    const { x, y } = targetRef.current;
    blobRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scaleRef.current})`;
    coreRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  };

  const startRAF = () => {
    const stiffness = 0.18; // spring pull (0..1)
    const damping = 0.80;   // velocity decay (0..1)
    const step = () => {
      if (!enabledRef.current) {
        // keep elements hidden when disabled
        if (blobRef.current && coreRef.current) {
          blobRef.current.style.opacity = "0";
          coreRef.current.style.opacity = "0";
        }
        rafRef.current = requestAnimationFrame(step);
        return;
      } else {
        if (blobRef.current && coreRef.current) {
          blobRef.current.style.opacity = "1";
          coreRef.current.style.opacity = "1";
        }
      }

      const tgt = targetRef.current;
      const cur = curRef.current;
      const vel = velRef.current;

      // critically-damped-ish discrete spring: add pull toward target then damp velocity
      vel.x += (tgt.x - cur.x) * stiffness;
      vel.y += (tgt.y - cur.y) * stiffness;
      vel.x *= damping;
      vel.y *= damping;
      cur.x += vel.x;
      cur.y += vel.y;

      if (blobRef.current && coreRef.current) {
        blobRef.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%) scale(${scaleRef.current})`;
        coreRef.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800">
      {/* Custom cursor visuals */}
      <div
        ref={blobRef}
        aria-hidden
        className="fixed left-0 top-0 z-[100] pointer-events-none select-none"
        style={{
          width: 80,
          height: 80,
          borderRadius: 9999,
          filter: "blur(8px)",
          background:
            "radial-gradient(40% 40% at 50% 50%, rgba(3,160,188,0.40) 0%, rgba(45,212,191,0.32) 35%, rgba(125,211,252,0.28) 100%)",
          mixBlendMode: "multiply",
          transform: "translate3d(-9999px,-9999px,0)",
          transition: "opacity 200ms",
        }}
      />
      <div
        ref={coreRef}
        aria-hidden
        className="fixed left-0 top-0 z-[101] pointer-events-none select-none bg-[#03a0bc] rounded-full shadow-md"
        style={{
          width: 8,
          height: 8,
          transform: "translate3d(-9999px,-9999px,0)",
          transition: "opacity 200ms",
        }}
      />
  
      {/* Optional tiny global style adjustments (kept minimal) */}
      <style>{`
        /* Respect reduced motion by disabling the trailing effect (handled in JS too) */
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
        }
      `}</style>
    </div>
  );
}

function isInteractive(el) {
  if (!el || el.nodeType !== 1) return false;
  const tag = el.tagName.toLowerCase();
  if (["a", "button", "input", "select", "textarea", "label", "summary"].includes(tag)) return true;
  if (el.getAttribute && el.getAttribute("role")) {
    const role = el.getAttribute("role");
    if (["button", "link", "menuitem", "tab", "switch", "checkbox"].includes(role)) return true;
  }
  if (el.closest && el.closest("[data-hoverable]")) return true;
  return false;
}

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefers(!!mql.matches);
    onChange();
    mql.addEventListener ? mql.addEventListener("change", onChange) : mql.addListener(onChange);
    return () => {
      mql.removeEventListener ? mql.removeEventListener("change", onChange) : mql.removeListener(onChange);
    };
  }, []);
  return prefers;
}
