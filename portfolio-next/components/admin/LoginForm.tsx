"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export default function LoginForm({ configured }: { configured: boolean }) {
  const [error, action, pending] = useActionState(login, undefined);

  return (
    <div className="mx-auto max-w-md px-5 py-24">
      <h1 className="expanded" style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}>
        Admin
      </h1>
      <p className="prose mt-4" style={{ fontSize: "1rem" }}>
        Sign in to edit the site&rsquo;s content.
      </p>

      {!configured ? (
        <div
          className="mt-8 p-4"
          style={{ border: "2px solid var(--fg)", background: "var(--fill)" }}
        >
          <p className="ui text-[0.95rem]" style={{ color: "var(--fg)" }}>
            No password is set yet. Create <code>.env.local</code> in the project
            root with a line like:
          </p>
          <pre
            className="mt-3 overflow-x-auto p-3 text-[0.85rem]"
            style={{ background: "var(--bg)", border: "1px solid var(--rule)" }}
          >
            ADMIN_PASSWORD=choose-something-long
          </pre>
          <p className="prose mt-3" style={{ fontSize: "0.9rem" }}>
            Then restart the dev server.
          </p>
        </div>
      ) : (
        <form action={action} className="mt-8">
          <label className="sounding block" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            className="ui mt-2 w-full px-3 py-3 text-[1rem]"
            style={{
              border: "2px solid var(--fg)",
              background: "var(--bg)",
              color: "var(--fg)",
            }}
          />

          {error ? (
            <p
              role="alert"
              className="ui mt-3 text-[0.9rem]"
              style={{ color: "var(--accent-ink)" }}
            >
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="ui mt-6 w-full rounded-full px-5 py-3 text-[1rem] font-medium"
            style={{
              border: "2px solid var(--fg)",
              background: pending ? "var(--fill)" : "var(--accent)",
              color: "var(--on-accent)",
            }}
          >
            {pending ? "Checking…" : "Sign in"}
          </button>
        </form>
      )}
    </div>
  );
}
