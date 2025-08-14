import { useEffect, useState } from "react";
import { fetchJson } from "../lib/api";
import Meta from "../components/Meta.jsx";
import {
  JsIcon,
  PyIcon,
  ReactIcon,
  TailwindIcon,
  DjangoIcon,
  ApiIcon,
  PostgresIcon,
  DbPanelIcon,
  GitHubIcon,
  GitIcon,
  ThunderClientIcon,
  TypeScriptIcon,
} from "../components/SkillIcons.jsx";
// in render:

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const r = await fetchJson("/skills/");
        setSkills(r);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="text-gray-600">Loading…</p>;

  return (
    <section className="space-y-8 dark:text-slate-100">
      <Meta
        title="Skills — Shams"
        description="Tech stack and proficiency levels."
      />

      <h1 className="text-2xl font-bold mb-4 dark:text-slate-100">Skills</h1>

      {/* CONFIG */}
      {/*
      Add/remove skills or icons here.
      "icon" can be an inline SVG, emoji, or <img />.
    */}
      {[
        {
          title: "Programming Languages",
          items: [
            { name: "JavaScript", icon: <JsIcon /> },
            { name: "TypeScript", icon: <TypeScriptIcon /> },
            { name: "Python", icon: <PyIcon /> },
          ],
        },
        {
          title: "Frameworks & Libraries",
          items: [
            { name: "React", icon: <ReactIcon /> },
            { name: "Tailwind CSS", icon: <TailwindIcon /> },
            { name: "Django", icon: <DjangoIcon /> },
            { name: "DRF", icon: <ApiIcon /> }, // Django REST Framework
          ],
        },
        {
          title: "Databases",
          items: [
            { name: "PostgreSQL", icon: <PostgresIcon /> },
            { name: "phpMyAdmin", icon: <DbPanelIcon /> },
          ],
        },
        {
          title: "Version Control & Tools",
          items: [
            { name: "GitHub", icon: <GitHubIcon /> },
            { name: "Git", icon: <GitIcon /> },
            { name: "Thunder Client", icon: <ThunderClientIcon /> },
          ],
        },
      ].map((group) => (
        <div key={group.title} className="space-y-4">
          <h2 className="text-lg font-semibold tracking-wide text-slate-700 dark:text-gray-200">
            {group.title}
          </h2>

          {/* Responsive grid */}
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {group.items.map((s) => (
              <li key={s.name}>
                {/* Card / pill with hover effects */}
                <div
                  className="
                  group relative overflow-hidden rounded-xl transition-all duration-200
                  bg-white/80 dark:bg-slate-800/60 
                  ring-1 ring-slate-200 dark:ring-white/5
                  hover:ring-[2px] hover:ring-[#03a0bc]/70
                  hover:scale-[1.02] dark:hover:ring-[#03a0bc]/70
                  shadow-sm dark:shadow-none
                  hover:shadow-[0_8px_30px_rgba(2,132,199,0.18)]
                  dark:hover:shadow-[0_0_40px_-8px_rgba(3,160,188,0.45)]
                  hover:bg-teal-50/40
                  dark:hover:bg-transparent
                  backdrop-blur-[2px] dark:backdrop-blur-sm
                "
                >
                  {/* Light mode overlay */}
                  <div
                    className="
    pointer-events-none absolute inset-0 opacity-0
    group-hover:opacity-100 transition-opacity duration-200
    block dark:hidden mix-blend-multiply
  "
                    style={{
                      background:
                        "radial-gradient(120px 80px at 30% 20%, rgba(3,160,188,0.10), transparent 60%)",
                    }}
                  />

                  {/* Dark mode overlay */}
                  <div
                    className="
    pointer-events-none absolute inset-0 opacity-0
    group-hover:opacity-100 transition-opacity duration-200
    hidden dark:block mix-blend-screen
  "
                    style={{
                      background:
                        "radial-gradient(120px 80px at 30% 20%, rgba(3,160,188,0.18), transparent 60%)",
                    }}
                  />

                  <div className="relative flex items-center gap-3 px-4 py-3">
                    <span className="shrink-0 text-slate-600 dark:text-slate-300">
                      {s.icon}
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-100">
                      {s.name}
                    </span>
                    <span
                      className="
    ml-auto h-px w-8
    bg-[#03a0bc]/50 dark:bg-[#03a0bc]/30
    group-hover:w-12
    group-hover:bg-[#03a0bc]/70 dark:group-hover:bg-[#03a0bc]/60
    transition-all duration-200
  "
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
