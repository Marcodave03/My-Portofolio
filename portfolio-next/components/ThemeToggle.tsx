"use client";

import { useEffect, useState } from "react";

type Choice = "light" | "dark" | "system";

/** Kept in step with the no-flash script in the layout. */
function apply(choice: Choice) {
  const root = document.documentElement;
  if (choice === "system") {
    root.removeAttribute("data-theme");
    localStorage.removeItem("theme");
  } else {
    root.setAttribute("data-theme", choice);
    localStorage.setItem("theme", choice);
  }
}

const order: Choice[] = ["light", "dark", "system"];
const label: Record<Choice, string> = {
  light: "Light",
  dark: "Dark",
  system: "Following the system setting",
};

/**
 * One button cycling light → dark → system. A single control means the
 * header never changes width, so nothing shifts when the theme changes.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [choice, setChoice] = useState<Choice>("system");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Choice | null;
    setChoice(stored === "light" || stored === "dark" ? stored : "system");
    setReady(true);
  }, []);

  const next = order[(order.indexOf(choice) + 1) % order.length];

  const cycle = () => {
    apply(next);
    setChoice(next);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${label[choice]}. Switch to ${label[next].toLowerCase()}.`}
      title={`Theme: ${label[choice]} — click for ${next}`}
      className={`ui flex shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${className}`}
      style={{
        width: 38,
        height: 38,
        border: "2px solid var(--fg)",
        color: "var(--fg)",
        // Render neutral until the stored choice is known, so the icon
        // does not flip on hydration.
        opacity: ready ? 1 : 0,
      }}
    >
      {choice === "light" ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 2.6v2.2M12 19.2v2.2M21.4 12h-2.2M4.8 12H2.6M18.6 5.4l-1.6 1.6M7 17l-1.6 1.6M18.6 18.6L17 17M7 7 5.4 5.4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : choice === "dark" ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // system — a display, meaning "whatever this device says"
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect
            x="3"
            y="4.5"
            width="18"
            height="12"
            rx="1.8"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M9 20h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
