import { Link } from "react-router-dom";
import Meta from "../components/Meta.jsx";

export default function NotFound() {
  return (
    <div>
      <Meta title="404 — Page not found" description="The page you requested was not found." />
      <h1 className="text-2xl font-bold mb-2">404 — Not found</h1>
      <p className="text-gray-600">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="inline-block mt-4 underline">Back to home</Link>
    </div>
  );
}
