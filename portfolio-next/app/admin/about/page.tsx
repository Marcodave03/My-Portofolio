import { getSkills, getProfile } from "@/lib/queries";
import { saveSkill, saveProfile, deleteRow } from "@/app/admin/actions";
import { Text, Area, Submit } from "@/components/admin/Field";

export default async function AboutAdmin({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; saved?: string }>;
}) {
  const { edit, saved } = await searchParams;
  const skills = getSkills();
  const profile = getProfile();
  const editing = skills.find((s) => String(s.id) === edit);

  return (
    <div>
      <h1 className="expanded" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
        About &amp; profile
      </h1>

      {saved ? (
        <p
          className="ui mt-6 px-4 py-3 text-[0.92rem]"
          style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          role="status"
        >
          Profile saved.
        </p>
      ) : null}

      <div className="mt-10 grid gap-x-14 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
        {/* Skills */}
        <div>
          <h2
            className="ui mb-3 pb-2 text-[1.1rem] font-semibold"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            What I do — {skills.length} areas
          </h2>

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {skills.map((s) => (
              <li key={s.id} className="py-4" style={{ borderBottom: "1px solid var(--rule)" }}>
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <span className="ui flex-1 text-[1rem] font-semibold">{s.area}</span>
                  <a
                    href={`/admin/about?edit=${s.id}`}
                    className="ui trace text-[0.85rem]"
                    style={{ color: "var(--accent-ink)" }}
                  >
                    Edit
                  </a>
                  <form action={deleteRow}>
                    <input type="hidden" name="table" value="skills" />
                    <input type="hidden" name="id" value={s.id} />
                    <input type="hidden" name="back" value="/admin/about" />
                    <button className="ui trace text-[0.85rem]" style={{ color: "var(--fg-soft)" }}>
                      Delete
                    </button>
                  </form>
                </div>
                <p className="prose mt-1" style={{ fontSize: "0.9rem", maxWidth: "56ch" }}>
                  {s.detail}
                </p>
              </li>
            ))}
          </ul>

          <h2
            className="ui mt-14 mb-5 pb-2 text-[1.1rem] font-semibold"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            Profile
          </h2>

          <form action={saveProfile} className="max-w-[34rem]">
            <Text name="name" label="Full name" defaultValue={profile.name} required />
            <Text name="email" label="Email" type="email" defaultValue={profile.email} required />
            <Text name="github" label="GitHub URL" defaultValue={profile.github} />
            <Submit>Save profile</Submit>
          </form>
        </div>

        {/* Add / edit skill */}
        <div>
          <h2
            className="ui mb-5 pb-2 text-[1.1rem] font-semibold"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            {editing ? "Edit area" : "Add an area"}
          </h2>

          <form action={saveSkill}>
            {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
            <Text
              name="area"
              label="Area"
              required
              defaultValue={editing?.area}
              placeholder="Frontend"
            />
            <Area
              name="detail"
              label="Description"
              rows={7}
              defaultValue={editing?.detail}
              hint="Plain language — what you actually do in this area, not a list of tools."
            />
            <Text
              name="sort"
              label="Order"
              type="number"
              defaultValue={editing?.sort ?? skills.length}
            />

            <div className="flex flex-wrap items-center gap-5">
              <Submit>{editing ? "Save changes" : "Add area"}</Submit>
              {editing ? (
                <a
                  href="/admin/about"
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
