"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { REGISTERS } from "@/lib/registers";

/** What the cover announces for a given route. */
function labelFor(pathname: string) {
  if (pathname === "/") return "HOME";
  if (pathname.startsWith("/work/")) {
    // The cover is decorative and this runs on the client, so the slug is
    // spelled out rather than looked up against the database.
    const slug = pathname.split("/")[2] ?? "";
    return slug.replace(/-/g, " ").toUpperCase();
  }
  const id = pathname.replace(/^\//, "");
  const register = REGISTERS.find((r) => r.id === id);
  return (register?.title ?? id).toUpperCase();
}

/**
 * The #333 panel that wipes away to reveal the page you just moved to —
 * the original's page transition, rebuilt for the App Router. It plays on
 * arrival rather than on click, since navigation here is instant.
 */
export default function PageCover() {
  const pathname = usePathname();
  const [run, setRun] = useState<{ key: string; label: string } | null>(null);
  const first = useRef(true);

  useEffect(() => {
    // Don't cover the very first paint — that would just be a loading screen.
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setRun({ key: pathname, label: labelFor(pathname) });
    const t = setTimeout(() => setRun(null), 900);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!run) return null;

  return (
    <div key={run.key} className="page-cover" aria-hidden>
      <span
        className="expanded px-5 text-center"
        style={{ fontSize: "clamp(1.75rem, 6vw, 4rem)" }}
      >
        {run.label}
      </span>
    </div>
  );
}
