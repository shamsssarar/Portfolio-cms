// App.jsx
import { Link, Outlet, NavLink } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle.jsx";
import LetterGlitchBackground from "./components/LetterGlitchBackground.jsx";

export default function App() {
  const linkBase =
    "px-2 py-1 rounded transition border border-transparent hover:bg-[#03a0bc] font-bold";
  const linkActive = "font-semibold text-[#03a0bc] hover:bg-transparent ";

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 ">
      {/* site-wide background */}
      <LetterGlitchBackground
        cellSize={18}
        speed={55}
        flipChance={0.1}
        opacity={1}
        bgLight="#ffffff"
        bgDark="#22303d"
      />

      <header className="px-6 py-4 bg-transparent dark:bg-transparent ">
        <nav className="max-w-5xl mx-auto flex flex-wrap items-center gap-3">
          <Link to="/" className="font-bold mr-auto">
            Shams.dev
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="/skills"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              Skills
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              Blog
            </NavLink>
          </div>
          <div className="ml-2 flex-shrink-0">
            <ThemeToggle size="sm" />
          </div>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        {/* make panels translucent so background shows through */}
        <Outlet />
      </main>
    </div>
  );
}
