"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Pill from "./Pill";

/** The index doubles as the table of contents and as the hero image. */
export type IndexRow = { id: string; title: string; count: number; unit: string };

export default function Hero({ index }: { index: IndexRow[] }) {
  const still = useReducedMotion();

  // One orchestrated sequence on load: the name settles, then a route
  // line draws down through the index and the markers land on it.
  const seq = still ? 0 : 1;

  return (
    <section className="relative mx-auto max-w-[88rem] px-5 pt-10 pb-20 sm:px-8 sm:pt-16 lg:px-12 lg:pt-24 lg:pb-32">
      <motion.h1
        className="expanded"
        style={{ fontSize: "var(--text-hero)" }}
        initial={still ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 * seq, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="block">Marco</span>
        <span className="block">Davincent</span>
        {/* The surname sits lighter and narrower, so the eye reads the
            first two lines as the mark and this one as the signature. */}
        <span
          className="block"
          style={{
            fontWeight: 400,
            fontSize: "0.42em",
            letterSpacing: "0.005em",
            marginTop: "0.16em",
            color: "var(--fg-soft)",
          }}
        >
          Dermawan
        </span>
      </motion.h1>

      <div className="mt-10 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-16">
        {/* The statement */}
        <motion.div
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 * seq, delay: 0.25 * seq }}
        >
          <p
            className="prose"
            style={{
              fontSize: "clamp(1.15rem, 2.1vw, 1.5rem)",
              lineHeight: 1.6,
              color: "var(--fg)",
              maxWidth: "38ch",
            }}
          >
            I build software that gets people to what they need — a mall
            shopper to the right shop, a shop owner to the day&rsquo;s takings,
            a patient to the right treatment.
          </p>
          <p className="prose mt-7" style={{ maxWidth: "48ch" }}>
            Full-stack developer and designer from Jakarta. I run six ventures,
            one of them the studio that funds the rest, and I have shipped for a
            bank, a student organisation of hundreds, and clients who needed a
            site their own staff could keep running.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Pill href="/contact" arrow>
              Start a project
            </Pill>
            <Pill href="/marco-davincent-dermawan-cv.pdf" size="sm" download external>
              CV
            </Pill>
          </div>
        </motion.div>

        {/* The index, threaded by a route line */}
        <nav aria-label="Work index" className="relative">
          <div
            className="sounding mb-5 pb-2"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            {`The work, in ${index.length} registers`}
          </div>

          <ol className="relative" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {/* the route */}
            <motion.span
              aria-hidden
              className="absolute"
              style={{
                left: "5px",
                top: "1.9rem",
                bottom: "1.9rem",
                width: "1.5px",
                background: "var(--accent-ink)",
                transformOrigin: "top",
              }}
              initial={still ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.9 * seq, delay: 0.4 * seq, ease: [0.65, 0, 0.35, 1] }}
            />

            {index.map((item, i) => (
              <motion.li
                key={item.id}
                initial={still ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 * seq, delay: (0.55 + i * 0.13) * seq }}
              >
                <Link
                  href={`/#${item.id}`}
                  className="group flex items-baseline gap-4 py-3.5"
                  style={{ borderBottom: "1px solid var(--rule)" }}
                >
                  <span
                    aria-hidden
                    className="relative shrink-0 transition-all duration-300"
                    style={{
                      width: "11px",
                      height: "11px",
                      marginRight: "0.35rem",
                      borderRadius: "50%",
                      border: "1.5px solid var(--accent-ink)",
                      background: "var(--bg)",
                      transform: "translateY(-1px)",
                    }}
                  />
                  <span className="ui flex-1 text-[1.15rem] font-medium sm:text-[1.3rem]">
                    {item.title}
                  </span>
                  <span className="sounding shrink-0">
                    {item.count} {item.unit}
                  </span>
                </Link>
              </motion.li>
            ))}
          </ol>
        </nav>
      </div>

      <style>{`
        nav[aria-label="Work index"] a:hover span:first-child,
        nav[aria-label="Work index"] a:focus-visible span:first-child {
          background: var(--accent-ink) !important;
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 55%, transparent);
        }
      `}</style>
    </section>
  );
}
