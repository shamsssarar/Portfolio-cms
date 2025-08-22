import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchJson } from "../lib/api";
import Meta from "../components/Meta.jsx";
import Card from "../components/Card.jsx";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchJson("/posts/");
        setPosts(Array.isArray(data) ? data : (data?.results ?? []));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-gray-600">Loading…</p>;

  return (
    <section>
      <Meta
        title="Blog — Shams"
        description="Posts about Django, React, Tailwind, and full-stack tips."
      />
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Thoughts on building with Django & React, design, and clean APIs.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <li key={p.id}>
              <BlogListItem post={p} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* ---------- Item component (keeps Blog.jsx tidy) ---------- */
function BlogListItem({ post }) {
  const title = post.title || "Untitled";
  const dateStr = useMemo(() => {
    const d = new Date(post.published_at || post.created_at || Date.now());
    return d.toLocaleDateString();
  }, [post.published_at, post.created_at]);

  const excerpt =
    (post.body || "").replace(/\s+/g, " ").trim().slice(0, 180) +
    ((post.body || "").length > 180 ? "…" : "");

  const initial = title.trim().charAt(0).toUpperCase() || "B";

  return (
    <Card
      className="
        p-5 group
        bg-white/70 dark:bg-slate-900/60 backdrop-blur
        border border-slate-200/60 dark:border-slate-800
        hover:border-[#03a0bc]/60 hover:shadow-[0_0_16px_rgba(3,160,188,0.35)]
        transition-transform hover:-translate-y-1
        rounded-xl
      "
    >
      {/* top row: avatar/thumbnail + title */}
      <div className="flex items-start gap-4">
        {/* Gradient badge using brand color */}
        <div
          aria-hidden
          className="
            shrink-0 w-12 h-12 rounded-lg grid place-items-center
            text-white font-bold
            bg-gradient-to-br from-[#03a0bc] to-cyan-400
            shadow-md
          "
        >
          {initial}
        </div>

        <div className="min-w-0">
          <Link
            to={`/blog/${post.slug}`}
            className="block text-lg font-semibold text-cyan-500 group-hover:text-cyan-400 transition-colors truncate"
            title={title}
          >
            {title}
          </Link>

          <div className="mt-1 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <time dateTime={post.published_at || post.created_at}>{dateStr}</time>
            {/* optional tag if you add `tag` later */}
            {post.tag ? (
              <span className="px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800/70">
                {post.tag}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* excerpt */}
      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
        {excerpt}
      </p>

      {/* footer: read more */}
      <div className="mt-4">
        <Link
          to={`/blog/${post.slug}`}
          className="
            inline-block px-3 py-2 rounded text-white text-sm font-medium
            bg-gradient-to-r from-[#03a0bc] to-cyan-400
            hover:from-cyan-400 hover:to-[#03a0bc]
            transition shadow-md hover:shadow-[0_0_12px_#03a0bc]
          "
        >
          Read more →
        </Link>
      </div>
    </Card>
  );
}
