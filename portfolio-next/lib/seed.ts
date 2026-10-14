import { db, setSetting } from "./db";
import {
  registers as seedRegisters,
  models as seedModels,
  career as seedCareer,
  recognition as seedRecognition,
  skills as seedSkills,
  stackList as seedStack,
  profile as seedProfile,
} from "./content";

/**
 * Copies the hand-written content into the database the first time it runs,
 * so nothing is lost in the move from a TypeScript file to a CMS. After that
 * the database is the source of truth and this is a no-op — it keys off a
 * flag, not off row counts, so deleting everything does not re-seed.
 */
export function seedIfEmpty() {
  const d = db();

  const done = d
    .prepare("SELECT value FROM settings WHERE key = 'seeded'")
    .get() as { value: string } | undefined;
  if (done?.value === "1") return;

  const insertEntry = d.prepare(`
    INSERT INTO entries
      (slug, register, name, line, body, year, role, status,
       stack, links, facts, gallery, image, sort, published)
    VALUES
      (@slug, @register, @name, @line, @body, @year, @role, @status,
       @stack, @links, @facts, @gallery, @image, @sort, 1)
    ON CONFLICT(slug) DO NOTHING
  `);

  const insertCareer = d.prepare(
    "INSERT INTO career (year, role, org, detail, sort) VALUES (?, ?, ?, ?, ?)"
  );
  const insertRecognition = d.prepare(
    `INSERT INTO recognition (year, title, note, issuer, url, image, sort)
     VALUES (?, ?, ?, '', '', '', ?)`
  );
  const insertSkill = d.prepare(
    "INSERT INTO skills (area, detail, sort) VALUES (?, ?, ?)"
  );
  const insertModel = d.prepare(
    `INSERT INTO models (slug, title, tagline, category, model, params, sort)
     VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(slug) DO NOTHING`
  );
  const insertTech = d.prepare(
    "INSERT INTO tech (name, sort) VALUES (?, ?) ON CONFLICT(name) DO NOTHING"
  );

  const run = d.transaction(() => {
    for (const register of seedRegisters) {
      register.entries.forEach((entry, i) => {
        insertEntry.run({
          slug: entry.slug,
          register: register.id,
          name: entry.name,
          line: entry.line,
          body: JSON.stringify(entry.body ?? []),
          year: entry.year,
          role: entry.role,
          status: entry.status ?? null,
          stack: JSON.stringify(entry.stack ?? []),
          links: JSON.stringify(entry.links ?? []),
          facts: JSON.stringify(entry.facts ?? []),
          gallery: JSON.stringify(entry.gallery ?? []),
          image: entry.image ?? null,
          sort: i,
        });
      });
    }

    seedCareer.forEach((c, i) => insertCareer.run(c.year, c.role, c.org, c.detail, i));
    seedRecognition.forEach((r, i) => insertRecognition.run(r.year, r.title, r.note, i));
    seedSkills.forEach((s, i) => insertSkill.run(s.area, s.detail, i));
    seedModels.forEach((m, i) =>
      insertModel.run(m.slug, m.title, m.tagline, m.category, m.model, m.params, i)
    );
    seedStack.forEach((t, i) => insertTech.run(t, i));

    setSetting("profile.name", seedProfile.name);
    setSetting("profile.email", seedProfile.email);
    setSetting("profile.github", seedProfile.github);
    setSetting("seeded", "1");
  });

  run();
}
