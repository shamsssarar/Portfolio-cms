import React from "react";

export const stroke = "currentColor";
 // Tailwind gray-400
const teal = "#03a0bc";   // Your portfolio teal

function baseSvg(children) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function JsIcon() {
  return baseSvg(
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" fill="#111827" />
      <path d="M10 8v7c0 1.8-2 1.8-2 0" stroke={teal} strokeWidth="1.5" />
      <path
        d="M13 8h3c1.5 0 2 1.2 2 2 0 .8-.5 1.5-1.4 1.7 1 .2 1.4.9 1.4 1.8 0 1-.7 2-2.3 2H13"
        stroke={teal}
        strokeWidth="1.5"
      />
    </>
  );
}

export function PyIcon() {
  return baseSvg(
    <>
      <path
        d="M7 11a4 4 0 014-4h3v2H11a2 2 0 00-2 2v4H7v-4Z"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path
        d="M17 13a4 4 0 01-4 4h-3v-2h3a2 2 0 002-2V9h2v4Z"
        stroke={teal}
        strokeWidth="1.5"
      />
      <circle cx="9.5" cy="8.5" r="1" fill={teal} />
      <circle cx="14.5" cy="15.5" r="1" fill={stroke} />
    </>
  );
}

export function ReactIcon() {
  return baseSvg(
    <>
      <circle cx="12" cy="12" r="1.6" fill={teal} />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.6"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.6"
        transform="rotate(60 12 12)"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.6"
        transform="rotate(120 12 12)"
        stroke={stroke}
        strokeWidth="1.2"
      />
    </>
  );
}

export function TailwindIcon() {
  return baseSvg(
    <>
      <path
        d="M5 13c1.5-3 3.5-4.5 6-4.5 3.5 0 3.5 2.5 5.5 2.5 1.3 0 2.4-.7 3.5-2-1.5 3-3.5 4.5-6 4.5-3.5 0-3.5-2.5-5.5-2.5-1.3 0-2.4.7-3.5 2Z"
        fill={teal}
      />
    </>
  );
}

export function DjangoIcon() {
  return baseSvg(
    <>
      <path
        d="M9 6v11c0 1.7-2 1.7-2 0"
        stroke={teal}
        strokeWidth="1.5"
      />
      <path
        d="M12 6h3.5A2.5 2.5 0 0118 8.5 2.5 2.5 0 0115.5 11H12"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path
        d="M12 11h3v6"
        stroke={teal}
        strokeWidth="1.5"
      />
    </>
  );
}

export function ApiIcon() {
  return baseSvg(
    <>
      <rect
        x="4"
        y="6"
        width="16"
        height="12"
        rx="2"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path d="M8 12h8" stroke={teal} strokeWidth="1.5" />
      <circle cx="9" cy="9" r="1" fill={teal} />
      <circle cx="12" cy="9" r="1" fill={teal} />
      <circle cx="15" cy="9" r="1" fill={teal} />
    </>
  );
}

export function PostgresIcon() {
  return baseSvg(
    <>
      <path
        d="M6 10c0-4 12-4 12 0v3c0 4-12 4-12 0v-3Z"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path d="M9 11v4m6-4v4" stroke={teal} strokeWidth="1.5" />
    </>
  );
}

export function DbPanelIcon() {
  return baseSvg(
    <>
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path d="M4 9h16" stroke={teal} strokeWidth="1.5" />
      <circle cx="8" cy="7" r="1" fill={teal} />
      <circle cx="11" cy="7" r="1" fill={teal} />
      <circle cx="14" cy="7" r="1" fill={teal} />
    </>
  );
}

export function GitHubIcon() {
  return baseSvg(
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.58 2 12.15c0 4.47 2.87 8.25 6.84 9.6.5.09.68-.22.68-.49v-1.71c-2.78.61-3.37-1.35-3.37-1.35-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.54 2.34 1.1 2.91.84.09-.66.35-1.1.64-1.35-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.04 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.04a9.38 9.38 0 015 0c1.91-1.31 2.75-1.04 2.75-1.04.55 1.4.2 2.44.1 2.7.64.71 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.31.69.92.69 1.85v2.75c0 .27.18.59.69.49A10.15 10.15 0 0022 12.15C22 6.58 17.52 2 12 2z"
        fill={teal}
      />
    </>
  );
}

export function GitIcon() {
  return baseSvg(
    <>
      <path
        d="M20.49 11.18l-7.67-7.67a1.5 1.5 0 00-2.12 0l-1.71 1.71 2.12 2.12a1.08 1.08 0 011.44 1.44l2.12 2.12a1.08 1.08 0 11-.5.5l-2.12-2.12a1.08 1.08 0 11-1.44-1.44l-2.12-2.12-5.14 5.14a1.5 1.5 0 000 2.12l7.67 7.67a1.5 1.5 0 002.12 0l7.67-7.67a1.5 1.5 0 000-2.12z"
        fill={teal}
      />
    </>
  );
}

export function ThunderClientIcon() {
  return baseSvg(
    <>
      <path
        d="M12 2l4 8h-3l1 6-4-8h3l-1-6z"
        fill={teal}
      />
      <path
        d="M4 12h16v2H4v-2z"
        fill={stroke}
      />
    </>
  );
}

export function TypeScriptIcon() {
  return baseSvg(
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" fill="#111827" />
      <text
        x="7"
        y="16"
        fontSize="9"
        fontWeight="bold"
        fill={teal}
        fontFamily="Arial, sans-serif"
      >
        TS
      </text>
    </>
  );
}
