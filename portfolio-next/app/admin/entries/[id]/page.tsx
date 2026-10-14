import Link from "next/link";
import { notFound } from "next/navigation";
import { adminGetEntry, REGISTERS } from "@/lib/queries";
import { saveEntry, deleteEntry } from "@/app/admin/actions";
import { Text, Area, Select, Check, Submit } from "@/components/admin/Field";
import Uploader from "@/components/admin/Uploader";

export default async function EntryEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  const entry = isNew ? null : adminGetEntry(Number(id));
  if (!isNew && !entry) notFound();

  return (
    <div>
      <Link
        href="/admin/entries"
        className="sounding trace inline-block"
        style={{ color: "var(--fg-soft)" }}
      >
        Projects
      </Link>

      <h1 className="expanded mt-3" style={{ fontSize: "clamp(1.9rem, 4.5vw, 3rem)" }}>
        {isNew ? "New project" : entry!.name}
      </h1>

      {/* The uploader posts on its own, so it must sit outside the entry
          form — a form cannot be nested inside another form. */}
      <div className="mt-10 max-w-[52rem]">
        <Uploader label="Upload an image" />
      </div>

      <form action={saveEntry} className="max-w-[52rem]">
        {entry ? <input type="hidden" name="id" value={entry.id} /> : null}

        <div className="grid gap-x-8 sm:grid-cols-2">
          <Text name="name" label="Name" required defaultValue={entry?.name} />
          <Select
            name="register"
            label="Register"
            defaultValue={entry?.register ?? "ventures"}
            hint="Which section of the site this appears in."
            options={REGISTERS.map((r) => ({ value: r.id, label: r.title }))}
          />
        </div>

        <Area
          name="line"
          label="One-line summary"
          rows={2}
          hint="One plain sentence: what it is and who it is for. This shows in the list and at the top of the project page."
          defaultValue={entry?.line}
        />

        <div className="grid gap-x-8 sm:grid-cols-3">
          <Text
            name="year"
            label="Year"
            defaultValue={entry?.year}
            placeholder="2025, or 2024 — now"
          />
          <Text
            name="role"
            label="Your role"
            defaultValue={entry?.role}
            placeholder="Founder, full-stack"
          />
          <Text
            name="status"
            label="Status"
            defaultValue={entry?.status}
            placeholder="Live, In development…"
            hint="Optional. Shown as a tag."
          />
        </div>

        <Text
          name="stack"
          label="Built with"
          defaultValue={entry?.stack.join(", ")}
          hint="Comma separated. For example: Next.js, TypeScript, PostgreSQL"
        />

        <Area
          name="body"
          label="The write-up"
          rows={12}
          hint="Leave a blank line between paragraphs. This is the main text on the project page."
          defaultValue={entry?.body?.join("\n\n")}
        />

        <Area
          name="facts"
          label="Key facts"
          rows={5}
          hint="One per line, as “Term | detail”. For example: Competition | Hedera Hello Future Hackathon, 2024"
          defaultValue={entry?.facts?.map((f) => `${f.term} | ${f.detail}`).join("\n")}
        />

        <Area
          name="links"
          label="Links"
          rows={5}
          hint="One per line, as “Label | https://…”. The first one becomes the main button."
          defaultValue={entry?.links.map((l) => `${l.label} | ${l.url}`).join("\n")}
        />

        <h2
          className="ui mt-4 mb-5 pb-2 text-[1.1rem] font-semibold"
          style={{ borderBottom: "1px solid var(--rule)" }}
        >
          Images
        </h2>

        <Text
          name="image"
          label="Main image"
          defaultValue={entry?.image}
          hint="A path like /uploads/my-shot.png or /work/streamverse.png. Leave empty for no preview."
        />

        <Area
          name="gallery"
          label="Gallery"
          rows={5}
          hint="One image path per line. These appear under “Screens” on the project page."
          defaultValue={entry?.gallery?.join("\n")}
        />

        <h2
          className="ui mt-4 mb-5 pb-2 text-[1.1rem] font-semibold"
          style={{ borderBottom: "1px solid var(--rule)" }}
        >
          Publishing
        </h2>

        <div className="grid gap-x-8 sm:grid-cols-2">
          <Text
            name="slug"
            label="URL slug"
            defaultValue={entry?.slug}
            hint="Leave empty to build one from the name. Changing it changes the project's address."
          />
          <Text
            name="sort"
            label="Order"
            type="number"
            defaultValue={entry?.sort ?? 0}
            hint="Lower numbers come first within the register."
          />
        </div>

        <Check
          name="published"
          label="Published — show this on the site"
          defaultChecked={entry?.published ?? true}
        />

        <div className="mt-4 flex flex-wrap items-center gap-5">
          <Submit>{isNew ? "Create project" : "Save changes"}</Submit>
          <Link href="/admin/entries" className="ui trace text-[0.95rem]" style={{ color: "var(--fg-soft)" }}>
            Cancel
          </Link>
        </div>
      </form>

      {entry ? (
        <form
          action={deleteEntry}
          className="mt-16 pt-6"
          style={{ borderTop: "1px solid var(--rule)" }}
        >
          <input type="hidden" name="id" value={entry.id} />
          <p className="sounding mb-3">
            Deleting removes this project and its page. This cannot be undone.
          </p>
          <button
            type="submit"
            className="ui px-4 py-2 text-[0.9rem] font-medium"
            style={{ border: "2px solid var(--fg)", background: "transparent" }}
          >
            Delete “{entry.name}”
          </button>
        </form>
      ) : null}
    </div>
  );
}
