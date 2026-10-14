import { getCareer } from "@/lib/queries";
import { saveCareer, deleteRow } from "@/app/admin/actions";
import { Text, Area, Submit } from "@/components/admin/Field";

export default async function CareerAdmin({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const rows = getCareer();
  const editing = rows.find((r) => String(r.id) === edit);

  return (
    <div>
      <h1 className="expanded" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
        Experience
      </h1>
      <p className="prose mt-3" style={{ fontSize: "1rem", maxWidth: "56ch" }}>
        Roles and programmes, shown under “Where I have worked” on the About
        page.
      </p>

      <div className="mt-10 grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
        <div>
          <h2
            className="ui mb-3 pb-2 text-[1.1rem] font-semibold"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            {rows.length} recorded
          </h2>

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {rows.map((r) => (
              <li key={r.id} className="py-4" style={{ borderBottom: "1px solid var(--rule)" }}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="sounding shrink-0" style={{ minWidth: "5rem" }}>
                    {r.year}
                  </span>
                  <span className="ui flex-1 text-[1rem] font-semibold">{r.role}</span>
                  <a
                    href={`/admin/career?edit=${r.id}`}
                    className="ui trace text-[0.85rem]"
                    style={{ color: "var(--accent-ink)" }}
                  >
                    Edit
                  </a>
                  <form action={deleteRow}>
                    <input type="hidden" name="table" value="career" />
                    <input type="hidden" name="id" value={r.id} />
                    <input type="hidden" name="back" value="/admin/career" />
                    <button className="ui trace text-[0.85rem]" style={{ color: "var(--fg-soft)" }}>
                      Delete
                    </button>
                  </form>
                </div>
                <div className="sounding mt-0.5" style={{ marginLeft: "5rem" }}>
                  {r.org}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2
            className="ui mb-5 pb-2 text-[1.1rem] font-semibold"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            {editing ? "Edit role" : "Add a role"}
          </h2>

          <form action={saveCareer}>
            {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
            <Text
              name="year"
              label="Year"
              defaultValue={editing?.year}
              placeholder="2024, or 2023 — 2024"
            />
            <Text
              name="role"
              label="Role"
              required
              defaultValue={editing?.role}
              placeholder="Strategic Information Technology"
            />
            <Text
              name="org"
              label="Organisation"
              defaultValue={editing?.org}
              placeholder="BCA Group"
            />
            <Area
              name="detail"
              label="What you did"
              rows={6}
              defaultValue={editing?.detail}
              hint="A sentence or two. Lead with the outcome, not the job description."
            />
            <Text
              name="sort"
              label="Order"
              type="number"
              defaultValue={editing?.sort ?? rows.length}
            />

            <div className="flex flex-wrap items-center gap-5">
              <Submit>{editing ? "Save changes" : "Add role"}</Submit>
              {editing ? (
                <a
                  href="/admin/career"
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
