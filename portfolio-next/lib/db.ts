import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

/**
 * A single SQLite file inside the project — data/portfolio.db.
 *
 * Repeated lists (stack, links, gallery, facts) are stored as JSON columns
 * rather than child tables. For a site this size that is the better trade:
 * one row is one project, an edit is one atomic write, there are no orphan
 * rows to clean up, and the admin form round-trips the whole record.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "portfolio.db");

let instance: Database.Database | null = null;

export function db(): Database.Database {
  if (instance) return instance;

  fs.mkdirSync(DATA_DIR, { recursive: true });
  const database = new Database(DB_PATH);
  database.pragma("journal_mode = WAL");
  database.pragma("foreign_keys = ON");

  migrate(database);
  instance = database;
  return database;
}

function migrate(d: Database.Database) {
  d.exec(`
    CREATE TABLE IF NOT EXISTS entries (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      slug       TEXT    NOT NULL UNIQUE,
      register   TEXT    NOT NULL,
      name       TEXT    NOT NULL,
      line       TEXT    NOT NULL DEFAULT '',
      body       TEXT    NOT NULL DEFAULT '[]',
      year       TEXT    NOT NULL DEFAULT '',
      role       TEXT    NOT NULL DEFAULT '',
      status     TEXT,
      stack      TEXT    NOT NULL DEFAULT '[]',
      links      TEXT    NOT NULL DEFAULT '[]',
      facts      TEXT    NOT NULL DEFAULT '[]',
      gallery    TEXT    NOT NULL DEFAULT '[]',
      image      TEXT,
      sort       INTEGER NOT NULL DEFAULT 0,
      published  INTEGER NOT NULL DEFAULT 1,
      updated_at TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS entries_register ON entries(register, sort);

    CREATE TABLE IF NOT EXISTS career (
      id     INTEGER PRIMARY KEY AUTOINCREMENT,
      year   TEXT NOT NULL DEFAULT '',
      role   TEXT NOT NULL DEFAULT '',
      org    TEXT NOT NULL DEFAULT '',
      detail TEXT NOT NULL DEFAULT '',
      sort   INTEGER NOT NULL DEFAULT 0
    );

    -- Placings, certificates and anything else worth listing by year.
    CREATE TABLE IF NOT EXISTS recognition (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      year     TEXT NOT NULL DEFAULT '',
      title    TEXT NOT NULL DEFAULT '',
      note     TEXT NOT NULL DEFAULT '',
      issuer   TEXT NOT NULL DEFAULT '',
      url      TEXT NOT NULL DEFAULT '',
      -- A scan or photo of the certificate, under /uploads.
      image    TEXT NOT NULL DEFAULT '',
      sort     INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS skills (
      id     INTEGER PRIMARY KEY AUTOINCREMENT,
      area   TEXT NOT NULL DEFAULT '',
      detail TEXT NOT NULL DEFAULT '',
      sort   INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS models (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      slug     TEXT NOT NULL UNIQUE,
      title    TEXT NOT NULL DEFAULT '',
      tagline  TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT '',
      model    TEXT NOT NULL DEFAULT '',
      params   TEXT NOT NULL DEFAULT '',
      sort     INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS tech (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      sort INTEGER NOT NULL DEFAULT 0
    );

    -- Single-row key/value store for the profile and hero copy.
    CREATE TABLE IF NOT EXISTS settings (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT ''
    );
  `);
}

/**
 * Folds the write-ahead log back into the .db file.
 *
 * In WAL mode recent writes live in portfolio.db-wal, which is ignored by
 * git as a transient file. Without this, committing would capture a nearly
 * empty database. Called after every mutation, so the tracked file is always
 * the whole story.
 */
export function checkpoint() {
  try {
    db().pragma("wal_checkpoint(TRUNCATE)");
  } catch {
    // A checkpoint can be refused if another connection holds a read lock.
    // The data is still safe in the WAL, so this is never fatal.
  }
}

/** Parse a JSON column, never throwing on bad data. */
export function parseJson<T>(raw: unknown, fallback: T): T {
  if (typeof raw !== "string" || raw.trim() === "") return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function getSetting(key: string, fallback = ""): string {
  const row = db().prepare("SELECT value FROM settings WHERE key = ?").get(key) as
    | { value: string }
    | undefined;
  return row?.value ?? fallback;
}

export function setSetting(key: string, value: string) {
  db()
    .prepare(
      `INSERT INTO settings (key, value) VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`
    )
    .run(key, value);
}

/** Turn a title into a URL-safe slug. */
export function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80) || "untitled"
  );
}

/** A slug that does not collide with an existing row. */
export function uniqueSlug(base: string, ignoreId?: number): string {
  const root = slugify(base);
  let candidate = root;
  let n = 2;
  for (;;) {
    const row = db()
      .prepare("SELECT id FROM entries WHERE slug = ?")
      .get(candidate) as { id: number } | undefined;
    if (!row || row.id === ignoreId) return candidate;
    candidate = `${root}-${n++}`;
  }
}
