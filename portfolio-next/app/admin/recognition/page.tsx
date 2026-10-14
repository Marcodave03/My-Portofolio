import { getRecognition } from "@/lib/queries";
import { saveRecognition, deleteRow } from "@/app/admin/actions";
import { Text, Area, Submit } from "@/components/admin/Field";
import Uploader from "@/components/admin/Uploader";

export default async function RecognitionAdmin({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const rows = getRecognition();
  const editing = rows.find((r) => String(r.id) === edit);

  return (
    <div>
      <h1 className="expanded" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
        Certificates
      </h1>
      <p className="prose mt-3" style={{ fontSize: "1rem", maxWidth: "56ch" }}>
        Hackathon placings, competition results, publications and certifications.
        These appear under “Placings and certifications” at the end of the
        hackathons register.
      </p>

      <div className="mt-10 grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
        {/* Existing rows */}
        <div>
          <h2
            className="ui mb-3 pb-2 text-[1.1rem] font-semibold"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            {rows.length} recorded
          </h2>

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {rows.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3"
                style={{ borderBottom: "1px solid var(--rule)" }}
              >
                <span className="sounding shrink-0" style={{ minWidth: "2.6rem" }}>
                  {r.year}
                </span>
                <span className="ui flex-1 text-[0.98rem]">
                  {r.title}
                  {r.issuer ? (
                    <span className="sounding"> — {r.issuer}</span>
                  ) : null}
                </span>
                {r.image ? <span className="sounding">scan</span> : null}
                <a
                  href={`/admin/recognition?edit=${r.id}`}
                  className="ui trace text-[0.85rem]"
                  style={{ color: "var(--accent-ink)" }}
                >
                  Edit
                </a>
                <form action={deleteRow}>
                  <input type="hidden" name="table" value="recognition" />
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="back" value="/admin/recognition" />
                  <button className="ui trace text-[0.85rem]" style={{ color: "var(--fg-soft)" }}>
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>

        {/* Add or edit */}
        <div>
          <h2
            className="ui mb-5 pb-2 text-[1.1rem] font-semibold"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            {editing ? "Edit certificate" : "Add a certificate"}
          </h2>

          <Uploader label="Upload a scan" />

          <form action={saveRecognition}>
            {editing ? <input type="hidden" name="id" value={editing.id} /> : null}

            <Text name="year" label="Year" defaultValue={editing?.year} placeholder="2024" />
            <Text
              name="title"
              label="Title"
              required
              defaultValue={editing?.title}
              placeholder="Top 10, Hedera Hello Future Hackathon"
            />
            <Text
              name="issuer"
              label="Issued by"
              defaultValue={editing?.issuer}
              placeholder="Hedera, BINUS University…"
              hint="Optional."
            />
            <Area
              name="note"
              label="Note"
              rows={2}
              defaultValue={editing?.note}
              hint="Shown to the right on wide screens. For example: StreamVerse, worldwide"
            />
            <Text
              name="url"
              label="Link"
              defaultValue={editing?.url}
              placeholder="https://…"
              hint="Optional — a verification page or announcement."
            />
            <Text
              name="image"
              label="Scan or photo"
              defaultValue={editing?.image}
              hint="Paste the path from the uploader above."
            />
            <Text
              name="sort"
              label="Order"
              type="number"
              defaultValue={editing?.sort ?? rows.length}
            />

            <div className="flex flex-wrap items-center gap-5">
              <Submit>{editing ? "Save changes" : "Add certificate"}</Submit>
              {editing ? (
                <a
                  href="/admin/recognition"
                  className="ui trace text-[0.95rem]"
                  style={{ color: "var(--fg-soft)" }}
                >
                  Cancel
                </a>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
