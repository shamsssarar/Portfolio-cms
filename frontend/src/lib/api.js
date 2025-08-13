export const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

export async function fetchJson(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.detail || "Request failed");
  }
  return data;
}
