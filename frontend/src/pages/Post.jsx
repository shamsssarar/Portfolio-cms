import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchJson } from "../lib/api";
import Meta from "../components/Meta.jsx";
// after you have `post`:



export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  {post && (
  <Meta title={`${post.title} — Shams`} description={post.body.slice(0, 140)} />
)}


  useEffect(() => {
    async function load() {
      try {
        const r = await fetchJson("/posts/");
        const all = await r.json();
        setPost(all.find(p => p.slug === slug) || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) return <p className="text-gray-600">Loading…</p>;
  if (!post) return <p>Not found. <Link to="/blog" className="underline">Back to blog</Link></p>;

  return (
    <article className="prose max-w-none">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-6">
        {new Date(post.published_at).toLocaleString()}
      </p>
      <p className="whitespace-pre-wrap leading-7">{post.body}</p>
    </article>
  );
}
