import { useEffect, useState } from "react";
import { fetchJson } from "../lib/api";
import Meta from "../components/Meta.jsx";
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
    <section>
      <Meta title="Skills — Shams" description="Tech stack and proficiency levels." />
      <h1 className="text-2xl font-bold mb-4">Skills</h1>
      <ul className="space-y-3">
        {skills.map(s => (
          <li key={s.id}>
            <div className="flex items-center justify-between">
              <span className="font-medium">{s.name}</span>
              <span className="text-sm text-gray-600">{s.level}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded">
              <div className="h-2 bg-black rounded" style={{ width: `${s.level}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
