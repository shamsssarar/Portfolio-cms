import { useEffect, useState } from "react";
import { fetchJson } from "../lib/api";
import Meta from "../components/Meta.jsx";
import Card from "../components/Card.jsx";
import MouseGlow from "../components/RGBFlareCursor.jsx";
import RGBFlareCursor from "../components/RGBFlareCursor.jsx";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // contact form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // { ok: boolean, text: string }

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchJson("/projects/"); // parsed JSON already
        setProjects(data);
      } catch (e) {
        console.error("Failed to fetch projects", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function submitContact(e) {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const data = await fetchJson("/contact/", {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
      }); // returns parsed JSON or throws
      setStatus({ ok: true, text: data.message || "Sent!" });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus({ ok: false, text: err.message || "Something went wrong." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page meta */}
      <Meta
        title="Shams — Django & React Developer"
        description="Portfolio of Django REST + React projects. Clean APIs, tidy UIs, and a working contact form."
      />

      {/* Hero */}

      <section className="bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        
        <div className="max-w-5xl mx-auto px-6 py-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold">
            Hi, I'm Shams — Django & React Developer
          </h1>
          <p className="mt-3 text-gray-600">
            I build fast, clean web apps with Django REST, React, and Tailwind.
            Here are some things I’ve worked on.
          </p>
          <div className="mt-6 flex gap-3 justify-center md:justify-start">
            <a href="#projects" className="px-4 py-2 border rounded">
              View Projects
            </a>
            <a
              href="#contact"
              className="px-4 py-2 bg-black text-white rounded"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-5xl mx-auto px-6 py-10 dark:bg-gray-950">
        <h2 className="text-2xl font-bold mb-3 ">About</h2>
        <p className="text-gray-700 dark:text-gray-300">
          I’m a full-stack developer focused on Python (Django) and React. I
          love clean APIs, tidy UIs, and shipping useful features. I’m currently
          available for freelance and small team projects.
        </p>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-5xl mx-auto px-6 pb-10">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4"
              >
                <div className="h-36 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="mt-3 h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="mt-2 h-3 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="mt-2 h-3 w-2/3 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No projects yet. Add some in /admin.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Card key={p.id} className="p-4">
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="w-full h-36 object-cover rounded"
                  />
                )}
                <h3 className="mt-3 font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {p.description}
                </p>
                {p.tech && (
                  <p className="mt-2 text-xs text-gray-500">{p.tech}</p>
                )}
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 text-sm underline decoration-solid"
                  >
                    View project →
                  </a>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="bg-white dark:bg-gray-950 border-t dark:border-gray-800"
      >
        <div className="max-w-5xl mx-auto px-6 py-10">
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <form
            onSubmit={submitContact}
            className="grid gap-3 max-w-xl dark:text-black"
          >
            <input
              className="border px-3 py-2 rounded"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className="border px-3 py-2 rounded"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              className="border px-3 py-2 rounded min-h-[120px]"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button
              disabled={sending}
              className="px-4 py-2 bg-black text-white rounded disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send message"}
            </button>
            {status && (
              <p className={status.ok ? "text-green-700" : "text-red-700"}>
                {status.text}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
