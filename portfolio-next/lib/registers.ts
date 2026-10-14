/**
 * Register metadata is structure, not content: the page layout is written
 * against these ids, so they stay in code rather than the database. Kept in
 * its own module with no server-only import, so client components (the
 * header, the hero) can read it too.
 */
export type RegisterMeta = { id: string; title: string; blurb: string };

export const REGISTERS: RegisterMeta[] = [
  {
    id: "ventures",
    title: "Ventures",
    blurb:
      "Products I own end to end — from the first line of the schema to the person paying for it.",
  },
  {
    id: "clients",
    title: "Client work",
    blurb: "Sites built through the studio for clinics, retailers, operators and non-profits.",
  },
  {
    id: "ai",
    title: "AI",
    blurb:
      "Models pulled apart and made runnable — documented down to the memory they need.",
  },
  {
    id: "systems",
    title: "Organisation systems",
    blurb:
      "Platforms running competitions, intakes and correspondence for a student organisation of hundreds.",
  },
  {
    id: "hackathons",
    title: "Hackathons and recognition",
    blurb: "What got built under a deadline, and where it placed.",
  },
];

export const REGISTER_IDS = REGISTERS.map((r) => r.id);

/** Short labels for the header bar. */
export const SHORT_LABEL: Record<string, string> = {
  ventures: "Ventures",
  clients: "Client work",
  ai: "AI",
  systems: "Systems",
  hackathons: "Hackathons",
};
