import "server-only";
import { db, parseJson, getSetting } from "./db";
import { seedIfEmpty } from "./seed";
import type { Entry, Link, Model, Register } from "./content";

export { REGISTERS, REGISTER_IDS } from "./registers";
import { REGISTERS } from "./registers";

type Row = Record<string, unknown>;

function ready() {
  seedIfEmpty();
  return db();
}

function toEntry(row: Row): Entry {
  return {
    slug: String(row.slug),
    name: String(row.name),
    line: String(row.line ?? ""),
    body: parseJson<string[]>(row.body, []),
    year: String(row.year ?? ""),
    role: String(row.role ?? ""),
    status: (row.status as string) || undefined,
    stack: parseJson<string[]>(row.stack, []),
    links: parseJson<Link[]>(row.links, []),
    facts: parseJson<{ term: string; detail: string }[]>(row.facts, []),
    gallery: parseJson<string[]>(row.gallery, []),
    image: (row.image as string) || undefined,
  };
}

/* ------------------------------------------------------------------ */
/* Public reads                                                        */
/* ------------------------------------------------------------------ */

export function getRegisters(): Register[] {
  const d = ready();
  const rows = d
    .prepare(
      `SELECT * FROM entries WHERE published = 1
       ORDER BY sort ASC, id ASC`
    )
    .all() as Row[];

  return REGISTERS.map((meta) => ({
    ...meta,
    entries: rows.filter((r) => r.register === meta.id).map(toEntry),
  }));
}

export function getAllEntries(): Entry[] {
  return getRegisters().flatMap((r) => r.entries);
}

export function getEntry(slug: string): { entry: Entry; register: Register } | null {
  const registers = getRegisters();
  for (const register of registers) {
    const entry = register.entries.find((e) => e.slug === slug);
    if (entry) return { entry, register };
  }
  return null;
}

export function getModels(): Model[] {
  const rows = ready()
    .prepare("SELECT * FROM models ORDER BY sort ASC, id ASC")
    .all() as Row[];
  return rows.map((r) => ({
    slug: String(r.slug),
    title: String(r.title),
    tagline: String(r.tagline),
    category: String(r.category) as Model["category"],
    model: String(r.model),
    params: String(r.params),
  }));
}

export type RecognitionRow = {
  id: number;
  year: string;
  title: string;
  note: string;
  issuer: string;
  url: string;
  image: string;
  sort: number;
};

export function getRecognition(): RecognitionRow[] {
  return ready()
    .prepare("SELECT * FROM recognition ORDER BY sort ASC, id ASC")
    .all() as RecognitionRow[];
}

export type CareerRow = {
  id: number;
  year: string;
  role: string;
  org: string;
  detail: string;
  sort: number;
};

export function getCareer(): CareerRow[] {
  return ready()
    .prepare("SELECT * FROM career ORDER BY sort ASC, id ASC")
    .all() as CareerRow[];
}

export type SkillRow = { id: number; area: string; detail: string; sort: number };

export function getSkills(): SkillRow[] {
  return ready()
    .prepare("SELECT * FROM skills ORDER BY sort ASC, id ASC")
    .all() as SkillRow[];
}

export function getTech(): string[] {
  const rows = ready()
    .prepare("SELECT name FROM tech ORDER BY sort ASC, id ASC")
    .all() as { name: string }[];
  return rows.map((r) => r.name);
}

export function getProfile() {
  ready();
  return {
    name: getSetting("profile.name", "Marco Davincent Dermawan"),
    email: getSetting("profile.email", "marcodave03@gmail.com"),
    github: getSetting("profile.github", "https://github.com/Marcodave03"),
  };
}

/* ------------------------------------------------------------------ */
/* Admin reads — includes unpublished rows                             */
/* ------------------------------------------------------------------ */

export type AdminEntry = Entry & {
  id: number;
  register: string;
  sort: number;
  published: boolean;
};

export function adminListEntries(register?: string): AdminEntry[] {
  const d = ready();
  const rows = (
    register
      ? d
          .prepare("SELECT * FROM entries WHERE register = ? ORDER BY sort ASC, id ASC")
          .all(register)
      : d.prepare("SELECT * FROM entries ORDER BY register ASC, sort ASC, id ASC").all()
  ) as Row[];

  return rows.map((r) => ({
    ...toEntry(r),
    id: Number(r.id),
    register: String(r.register),
    sort: Number(r.sort),
    published: Number(r.published) === 1,
  }));
}

export function adminGetEntry(id: number): AdminEntry | null {
  const row = ready().prepare("SELECT * FROM entries WHERE id = ?").get(id) as
    | Row
    | undefined;
  if (!row) return null;
  return {
    ...toEntry(row),
    id: Number(row.id),
    register: String(row.register),
    sort: Number(row.sort),
    published: Number(row.published) === 1,
  };
}

export function counts() {
  const d = ready();
  const one = (sql: string) => (d.prepare(sql).get() as { n: number }).n;
  return {
    entries: one("SELECT COUNT(*) n FROM entries"),
    published: one("SELECT COUNT(*) n FROM entries WHERE published = 1"),
    career: one("SELECT COUNT(*) n FROM career"),
    recognition: one("SELECT COUNT(*) n FROM recognition"),
    skills: one("SELECT COUNT(*) n FROM skills"),
    models: one("SELECT COUNT(*) n FROM models"),
  };
}
