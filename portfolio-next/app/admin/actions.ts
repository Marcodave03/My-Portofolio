"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "node:fs/promises";
import path from "node:path";
import { db, uniqueSlug, setSetting, checkpoint } from "@/lib/db";
import { REGISTER_IDS } from "@/lib/queries";
import { requireAdmin, passwordMatches, signIn, signOut, isConfigured } from "@/lib/auth";

/** Fold the WAL into the .db file, then refresh every surface that reads it. */
function refresh() {
  checkpoint();
  revalidatePath("/", "layout");
}

const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const num = (f: FormData, k: string) => Number(f.get(k) ?? 0) || 0;

/** Split a textarea into trimmed, non-empty lines. */
function lines(f: FormData, k: string): string[] {
  return str(f, k)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Split a textarea into paragraphs on blank lines. */
function paragraphs(f: FormData, k: string): string[] {
  return str(f, k)
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
}

/** "Label | https://url" per line. */
function pairs(f: FormData, k: string): { label: string; url: string }[] {
  return lines(f, k)
    .map((l) => {
      const i = l.indexOf("|");
      if (i === -1) return { label: l, url: l };
      return { label: l.slice(0, i).trim(), url: l.slice(i + 1).trim() };
    })
    .filter((p) => p.label && p.url);
}

/** "Term | detail" per line. */
function facts(f: FormData, k: string): { term: string; detail: string }[] {
  return lines(f, k)
    .map((l) => {
      const i = l.indexOf("|");
      if (i === -1) return null;
      return { term: l.slice(0, i).trim(), detail: l.slice(i + 1).trim() };
    })
    .filter((x): x is { term: string; detail: string } => !!x && !!x.term);
}

/* ------------------------------------------------------------------ */
/* Session                                                             */
/* ------------------------------------------------------------------ */

export async function login(_prev: string | undefined, form: FormData) {
  if (!isConfigured()) {
    return "ADMIN_PASSWORD is not set. Add it to .env.local and restart the server.";
  }
  if (!passwordMatches(str(form, "password"))) {
    return "That password is not right.";
  }
  await signIn();
  redirect("/admin");
}

export async function logout() {
  await signOut();
  redirect("/admin");
}

/* ------------------------------------------------------------------ */
/* Entries                                                             */
/* ------------------------------------------------------------------ */

export async function saveEntry(form: FormData) {
  await requireAdmin();

  const id = num(form, "id");
  const name = str(form, "name") || "Untitled";
  const register = REGISTER_IDS.includes(str(form, "register"))
    ? str(form, "register")
    : "ventures";

  const wanted = str(form, "slug") || name;
  const slug = uniqueSlug(wanted, id || undefined);

  const payload = {
    slug,
    register,
    name,
    line: str(form, "line"),
    body: JSON.stringify(paragraphs(form, "body")),
    year: str(form, "year"),
    role: str(form, "role"),
    status: str(form, "status") || null,
    stack: JSON.stringify(
      str(form, "stack")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    ),
    links: JSON.stringify(pairs(form, "links")),
    facts: JSON.stringify(facts(form, "facts")),
    gallery: JSON.stringify(lines(form, "gallery")),
    image: str(form, "image") || null,
    sort: num(form, "sort"),
    published: form.get("published") ? 1 : 0,
  };

  const d = db();
  if (id) {
    d.prepare(
      `UPDATE entries SET
         slug=@slug, register=@register, name=@name, line=@line, body=@body,
         year=@year, role=@role, status=@status, stack=@stack, links=@links,
         facts=@facts, gallery=@gallery, image=@image, sort=@sort,
         published=@published, updated_at=datetime('now')
       WHERE id=@id`
    ).run({ ...payload, id });
  } else {
    d.prepare(
      `INSERT INTO entries
         (slug, register, name, line, body, year, role, status,
          stack, links, facts, gallery, image, sort, published)
       VALUES
         (@slug, @register, @name, @line, @body, @year, @role, @status,
          @stack, @links, @facts, @gallery, @image, @sort, @published)`
    ).run(payload);
  }

  refresh();
  redirect(`/admin/entries?register=${register}&saved=${encodeURIComponent(name)}`);
}

export async function deleteEntry(form: FormData) {
  await requireAdmin();
  const id = num(form, "id");
  if (id) db().prepare("DELETE FROM entries WHERE id = ?").run(id);
  refresh();
  redirect("/admin/entries");
}

/* ------------------------------------------------------------------ */
/* Simple list tables                                                  */
/* ------------------------------------------------------------------ */

export async function saveRecognition(form: FormData) {
  await requireAdmin();
  const id = num(form, "id");
  const row = {
    year: str(form, "year"),
    title: str(form, "title"),
    note: str(form, "note"),
    issuer: str(form, "issuer"),
    url: str(form, "url"),
    image: str(form, "image"),
    sort: num(form, "sort"),
  };
  const d = db();
  if (id) {
    d.prepare(
      `UPDATE recognition SET year=@year, title=@title, note=@note,
         issuer=@issuer, url=@url, image=@image, sort=@sort WHERE id=@id`
    ).run({ ...row, id });
  } else {
    d.prepare(
      `INSERT INTO recognition (year, title, note, issuer, url, image, sort)
       VALUES (@year, @title, @note, @issuer, @url, @image, @sort)`
    ).run(row);
  }
  refresh();
  redirect("/admin/recognition");
}

export async function saveCareer(form: FormData) {
  await requireAdmin();
  const id = num(form, "id");
  const row = {
    year: str(form, "year"),
    role: str(form, "role"),
    org: str(form, "org"),
    detail: str(form, "detail"),
    sort: num(form, "sort"),
  };
  const d = db();
  if (id) {
    d.prepare(
      "UPDATE career SET year=@year, role=@role, org=@org, detail=@detail, sort=@sort WHERE id=@id"
    ).run({ ...row, id });
  } else {
    d.prepare(
      "INSERT INTO career (year, role, org, detail, sort) VALUES (@year, @role, @org, @detail, @sort)"
    ).run(row);
  }
  refresh();
  redirect("/admin/career");
}

export async function saveSkill(form: FormData) {
  await requireAdmin();
  const id = num(form, "id");
  const row = { area: str(form, "area"), detail: str(form, "detail"), sort: num(form, "sort") };
  const d = db();
  if (id) {
    d.prepare("UPDATE skills SET area=@area, detail=@detail, sort=@sort WHERE id=@id").run({
      ...row,
      id,
    });
  } else {
    d.prepare("INSERT INTO skills (area, detail, sort) VALUES (@area, @detail, @sort)").run(row);
  }
  refresh();
  redirect("/admin/about");
}

/** One delete for every simple table, with the table name allow-listed. */
export async function deleteRow(form: FormData) {
  await requireAdmin();
  const table = str(form, "table");
  const id = num(form, "id");
  const allowed = ["recognition", "career", "skills", "models", "tech"];
  if (!allowed.includes(table) || !id) {
    throw new Error("Unknown table");
  }
  db().prepare(`DELETE FROM ${table} WHERE id = ?`).run(id);
  refresh();
  redirect(form.get("back") ? String(form.get("back")) : "/admin");
}

export async function saveProfile(form: FormData) {
  await requireAdmin();
  setSetting("profile.name", str(form, "name"));
  setSetting("profile.email", str(form, "email"));
  setSetting("profile.github", str(form, "github"));
  refresh();
  redirect("/admin/about?saved=1");
}

/* ------------------------------------------------------------------ */
/* Uploads                                                             */
/* ------------------------------------------------------------------ */

const ALLOWED = new Map([
  ["image/png", ".png"],
  ["image/jpeg", ".jpg"],
  ["image/webp", ".webp"],
  ["image/avif", ".avif"],
  ["image/gif", ".gif"],
  ["application/pdf", ".pdf"],
]);

const MAX_BYTES = 12 * 1024 * 1024;

/**
 * Stores a certificate scan or screenshot under public/uploads and returns
 * the public path. The extension comes from the allow-list, never from the
 * submitted filename, so a disguised upload cannot pick its own type.
 */
export async function uploadFile(
  _prev: string | undefined,
  form: FormData
): Promise<string> {
  await requireAdmin();

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) return "Choose a file first.";
  if (file.size > MAX_BYTES) return "That file is larger than 12 MB.";

  const ext = ALLOWED.get(file.type);
  if (!ext) return "Only PNG, JPEG, WebP, AVIF, GIF or PDF files are accepted.";

  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });

  const stamp = Date.now().toString(36);
  const base =
    (file.name.replace(/\.[^.]+$/, "") || "file")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || "file";

  const filename = `${base}-${stamp}${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, filename), bytes);

  refresh();
  return `/uploads/${filename}`;
}
