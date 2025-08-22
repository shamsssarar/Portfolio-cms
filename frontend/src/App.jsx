// App.jsx
import { Link, Outlet, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeToggle from "./components/ThemeToggle.jsx";
import LetterGlitchBackground from "./components/LetterGlitchBackground.jsx";

export default function App() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // close menu on route change
  useEffect(() => setOpen(false), [location.pathname]);

  const linkBase =
    "px-2 py-1 rounded transition border border-transparent hover:bg-[#03a0bc] font-bold";
  const linkActive = "font-semibold text-[#03a0bc] hover:bg-transparent";

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* site-wide background */}
      <LetterGlitchBackground
        cellSize={18}
        speed={55}
        flipChance={0.1}
        opacity={1}
        bgLight="#ffffff"
        bgDark="#22303d"
      />

      <header className="px-6 py-4 bg-transparent dark:bg-transparent z-50">
        {/* relative wrapper so the dropdown can be absolutely positioned */}
        <div className="max-w-5xl mx-auto relative">
          <nav className="flex flex-wrap items-center gap-3">
            <Link to="/" className="font-bold mr-auto">
              Shams.dev
            </Link>

            {/* desktop links as you had */}
            <div className="hidden md:flex items-center gap-3 text-sm">
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
              <div className="ml-2 flex-shrink-0">
                <ThemeToggle size="sm" />
              </div>
            </div>

            {/* mobile right side: toggle + hamburger */}
            {/* mobile right side: toggle + hamburger */}
            <div className="md:hidden ml-2 flex items-center gap-2">
              <ThemeToggle size="sm" />
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="w-10 h-10 grid place-items-center rounded border border-[#03a0bc] text-[#03a0bc]"
              >
                {/* show burger when closed, X when open */}
                {!open ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 6h16M4 12h16M4 18h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 6l12 12M18 6l-12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </nav>

          {/* MOBILE MENU AS OVERLAY (doesn't push content) */}
          {open && (
            <>
              {/* optional dim background; click to close */}
              <button
                className="fixed inset-0 md:hidden bg-black/30 backdrop-blur-sm z-40"
                onClick={() => setOpen(false)}
                aria-label="Close menu backdrop"
              />
              <div
                className="
            absolute left-0 right-0 top-full mt-2 md:hidden z-50
            origin-top transform transition
          "
              >
                <div className="rounded-xl border border-[#03a0bc]/30 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-3 shadow-lg">
                  <div className="flex flex-col gap-2 text-sm">
                    <NavLink
                      to="/"
                      end
                      className={({ isActive }) =>
                        `${linkBase} block ${isActive ? linkActive : ""}`
                      }
                    >
                      Projects
                    </NavLink>
                    <NavLink
                      to="/skills"
                      className={({ isActive }) =>
                        `${linkBase} block ${isActive ? linkActive : ""}`
                      }
                    >
                      Skills
                    </NavLink>
                    <NavLink
                      to="/blog"
                      className={({ isActive }) =>
                        `${linkBase} block ${isActive ? linkActive : ""}`
                      }
                    >
                      Blog
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
