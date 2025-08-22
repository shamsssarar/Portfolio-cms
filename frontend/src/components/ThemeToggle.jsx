import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // icons

export default function ThemeToggle({ size = "md" }) {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const base = "relative flex items-center rounded-full border border-[#03a0bc] text-[#03a0bc] transition";
  const sizes = {
    sm: "w-12 h-7",   // mobile
    md: "w-16 h-8"    // default
  };

  return (
    <button
      onClick={() => setDark(!dark)}
      className={`${base} ${sizes[size]} bg-[#03a0bc]/10 hover:shadow-[0_0_10px_#03a0bc]`}
      aria-label="Toggle theme"
      title="Toggle dark mode"
    >
      {/* sliding circle */}
      <span
        className={`absolute left-[3px] w-5 h-5 rounded-full flex items-center justify-center bg-[#03a0bc] text-white transition-all
          ${dark ? "translate-x-5" : "translate-x-0"}
        `}
      >
        {dark ? <Moon size={16} /> : <Sun size={16} />}
      </span>
    </button>
  );
}
