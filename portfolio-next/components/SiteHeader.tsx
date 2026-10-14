"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { REGISTERS, SHORT_LABEL } from "@/lib/registers";
import Pill from "./Pill";
import ThemeToggle from "./ThemeToggle";

const nav = [
  ...REGISTERS.map((r) => ({ href: `/#${r.id}`, label: SHORT_LABEL[r.id] ?? r.title })),
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 transition-colors duration-300"
      style={{
        background: lifted ? "color-mix(in srgb, var(--bg) 88%, transparent)" : "transparent",
        backdropFilter: lifted ? "blur(10px)" : "none",
        borderBottom: `1px solid ${lifted ? "var(--rule)" : "transparent"}`,
      }}
    >
      <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="ui text-[0.95rem] font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          Marco Davincent
          <span style={{ color: "var(--accent-ink)" }}>.</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Sections">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="ui trace text-[0.875rem]"
              style={{ color: "var(--fg-soft)" }}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
          <Pill href="/contact" size="sm">
            Get in touch
          </Pill>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
        <ThemeToggle />
        <button
          type="button"
          className="ui flex items-center gap-2 text-[0.875rem]"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            aria-hidden
            className="relative block h-[10px] w-[22px]"
            style={{ color: "var(--fg)" }}
          >
            <span
              className="absolute left-0 block h-[1.5px] w-full transition-transform duration-300"
              style={{
                background: "currentColor",
                top: 0,
                transform: open ? "translateY(4.25px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="absolute left-0 block h-[1.5px] w-full transition-transform duration-300"
              style={{
                background: "currentColor",
                bottom: 0,
                transform: open ? "translateY(-4.25px) rotate(-45deg)" : "none",
              }}
            />
          </span>
          {open ? "Close" : "Menu"}
        </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="lg:hidden"
        style={{
          borderTop: "1px solid var(--rule)",
          background: "var(--bg)",
          maxHeight: "calc(100dvh - 4rem)",
          overflowY: "auto",
        }}
      >
        <nav className="px-5 py-3 sm:px-8" aria-label="Sections">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="ui block py-3.5 text-[1.35rem] font-medium"
              style={{ borderBottom: "1px solid var(--rule)" }}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6 mb-4" onClick={() => setOpen(false)}>
            <Pill href="/contact" arrow>
              Get in touch
            </Pill>
          </div>
        </nav>
      </div>
    </header>
  );
}
