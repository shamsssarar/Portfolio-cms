import { Link, Outlet, NavLink } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle.jsx";

export default function App() {
  const linkBase =
    "px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition";
  const linkActive = "font-semibold";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <header className="px-6 py-4 border-b bg-white/80 backdrop-blur dark:bg-gray-950/60 dark:border-gray-800">
        <nav className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link to="/" className="font-bold">Shams.dev</Link>
          <div className="flex items-center gap-2">
            <NavLink to="/" end className={({isActive}) => `${linkBase} ${isActive ? linkActive : ""}`}>Projects</NavLink>
            <NavLink to="/skills" className={({isActive}) => `${linkBase} ${isActive ? linkActive : ""}`}>Skills</NavLink>
            <NavLink to="/blog" className={({isActive}) => `${linkBase} ${isActive ? linkActive : ""}`}>Blog</NavLink>
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <main className="max-w-5xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
