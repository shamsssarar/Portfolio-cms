import { Link } from "react-router-dom";
// using lucide-react icons (already available via shadcn/lucide)
// If you prefer react-icons, swap these imports.
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-16">
      {/* Glow border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#03a0bc] to-transparent opacity-40" />
      
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
          {/* Brand/summary */}
          <div className="text-center md:text-left">
            <Link to="/" className="font-bold">Shams.dev</Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Building fast, clean apps with Django & React.
            </p>
          </div>

          {/* Socials */}
          <div className="md:ml-auto flex items-center gap-3">
            <IconLink href="https://github.com/your-username" label="GitHub">
              <FaGithub className="w-5 h-5" />
            </IconLink>
            <IconLink href="https://www.linkedin.com/in/your-handle" label="LinkedIn">
              <FaLinkedin className="w-5 h-5" />
            </IconLink>
            <IconLink href="https://wa.me/yourNumberWithoutPlus" label="WhatsApp">
              <FaWhatsapp className="w-5 h-5" />
            </IconLink>
            <IconLink href="https://instagram.com/your-handle" label="Instagram">
              <FaInstagram className="w-5 h-5" />
            </IconLink>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-6 flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span>© {new Date().getFullYear()} Shams Sarar</span>
          <span className="hidden md:inline">•</span>
          <span>
            Built with <span className="text-[#03a0bc] font-medium">Django</span> &{" "}
            <span className="text-[#03a0bc] font-medium">React</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* Reusable neon icon button */
function IconLink({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="
        group relative inline-flex items-center justify-center
        w-10 h-10 rounded-md border border-[#03a0bc]/70 text-[#03a0bc]
        bg-[#03a0bc]/10 hover:bg-[#03a0bc]/20
        transition shadow-[0_0_8px_rgba(3,160,188,0.25)]
        hover:shadow-[0_0_14px_rgba(3,160,188,0.45)]
      "
    >
      {children}
      <span
        className="pointer-events-none absolute -bottom-6 text-[10px] text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition"
      >
        {label}
      </span>
    </a>
  );
}
