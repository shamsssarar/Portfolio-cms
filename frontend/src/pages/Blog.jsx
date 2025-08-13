import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchJson } from "../lib/api";
import Meta from "../components/Meta.jsx";
import Card from "../components/Card.jsx";
// in render:

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const r = await fetchJson("/posts/");
        setPosts(r);
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
      <Meta
        title="Blog — Shams"
        description="Posts about Django, React, Tailwind, and full-stack tips."
      />
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((p) => (
            <Card key={p.id} className="p-4">
              <Link
                to={`/blog/${p.slug}`}
                className="text-lg font-semibold underline decoration-solid"
              >
                {p.title}
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(p.published_at).toLocaleString()}
              </p>
            </Card>
          ))}
        </ul>
      )}
    </section>
  );
}
