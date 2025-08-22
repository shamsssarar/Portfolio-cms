import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchJson } from "../lib/api";
import Meta from "../components/Meta.jsx";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        // Try detail by slug first (works if DRF: lookup_field = "slug")
        let data = null;
        try {
          data = await fetchJson(`/posts/${slug}/`);
        } catch {
          // Fallback: filter list by slug (works if detail not configured)
          const list = await fetchJson(
            `/posts/?slug=${encodeURIComponent(slug)}`
          );
          data = Array.isArray(list?.results)
            ? list.results[0]
            : Array.isArray(list)
            ? list[0]
            : list;
        }
        if (alive) setPost(data || null);
      } catch (e) {
        console.error(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) return <p className="text-gray-600">Loading…</p>;
  if (!post) {
    return (
      <p>
        Not found.{" "}
        <Link to="/blog" className="underline text-[#03a0bc]">
          Back to blog
        </Link>
      </p>
    );
  }

  const when = new Date(
    post.published_at || post.created_at || Date.now()
  ).toLocaleString();

  return (
    <>
      <Meta
        title={`${post.title} — Shams`}
        description={(post.body || "").slice(0, 140)}
      />
      <article className="prose prose-invert max-w-none bg-white border dark:bg-slate-900/70 border-[#03a0bc]/20 rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-xs opacity-70 mb-6">{when}</p>
        {/* If your API returns HTML use dangerouslySetInnerHTML; if it's Markdown, render via a MD component */}
        <div className="whitespace-pre-wrap leading-7">{post.body}</div>
      </article>
      <div className="mt-6">
        <Link
          to="/blog"
          className="inline-block px-4 py-2 rounded text-white font-medium
               bg-gradient-to-r from-[#03a0bc] to-cyan-400
               hover:from-cyan-400 hover:to-[#03a0bc]
               transition shadow-md hover:shadow-[0_0_12px_#03a0bc]"
        >
          ← Back to blog
        </Link>
      </div>
    </>
  );
}
