"use client";

import { useActionState, useState } from "react";
import { uploadFile } from "@/app/admin/actions";

/**
 * Uploads a certificate scan or screenshot and hands back its public path.
 * Kept separate from the record forms so an upload never risks losing what
 * you have typed — it posts on its own and shows you the path to paste.
 */
export default function Uploader({ label = "Upload a file" }: { label?: string }) {
  const [result, action, pending] = useActionState(uploadFile, undefined);
  const [copied, setCopied] = useState(false);

  const isPath = typeof result === "string" && result.startsWith("/uploads/");

  return (
    <div
      className="mb-8 p-4"
      style={{ border: "1px solid var(--rule)", background: "var(--fill)" }}
    >
      <form action={action} className="flex flex-wrap items-center gap-3">
        <span className="ui text-[0.9rem] font-semibold">{label}</span>
        <input
          type="file"
          name="file"
          accept="image/png,image/jpeg,image/webp,image/avif,image/gif,application/pdf"
          required
          className="ui text-[0.85rem]"
          style={{ maxWidth: "100%" }}
        />
        <button
          type="submit"
          disabled={pending}
          className="ui rounded-full px-4 py-2 text-[0.85rem] font-medium"
          style={{ border: "2px solid var(--fg)", background: "var(--bg)" }}
        >
          {pending ? "Uploading…" : "Upload"}
        </button>
      </form>

      {result ? (
        isPath ? (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <code
              className="ui px-2 py-1 text-[0.85rem]"
              style={{ background: "var(--bg)", border: "1px solid var(--rule)" }}
            >
              {result}
            </code>
            <button
              type="button"
              className="ui trace text-[0.85rem]"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(result);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                } catch {
                  setCopied(false);
                }
              }}
            >
              {copied ? "Copied" : "Copy path"}
            </button>
            <span className="sounding">Paste this into an image field.</span>
          </div>
        ) : (
          <p role="alert" className="ui mt-3 text-[0.85rem]" style={{ color: "var(--accent-ink)" }}>
            {result}
          </p>
        )
      ) : (
        <p className="sounding mt-2">
          PNG, JPEG, WebP, AVIF, GIF or PDF. Up to 12 MB. Saved to
          {" "}
          <code>public/uploads</code>.
        </p>
      )}
    </div>
  );
}
