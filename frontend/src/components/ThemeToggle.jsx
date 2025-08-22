import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // icons

export default function ThemeToggle() {
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

  return (
    <button
      onClick={() => setDark(!dark)}
      className={`relative flex items-center w-16 h-8 rounded-full border border-[#03a0bc] transition-colors 
        ${dark ? "bg-[#03a0bc]/20" : "bg-[#03a0bc]/10"} 
      `}
      aria-label="Toggle theme"
      title="Toggle dark mode"
    >
      {/* sliding circle */}
      <span
        className={`absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center bg-[#03a0bc] text-white transition-all
          ${dark ? "translate-x-8" : "translate-x-0"}
        `}
      >
        {dark ? <Moon size={16} /> : <Sun size={16} />}
      </span>
    </button>
  );
}
