import Link from "next/link";
import type { Entry, Model } from "@/lib/content";

/**
 * The library entry leads, then the models themselves. Eleven rows of
 * model / task / size is genuinely tabular content, so it is set as a
 * table rather than chopped into cards.
 */
export default function ModelRegister({
  entry,
  models,
}: {
  entry: Entry;
  models: Model[];
}) {
  return (
    <div>
      <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div>
          <h3 className="ui font-semibold" style={{ fontSize: "var(--text-entry)", letterSpacing: "-0.03em" }}>
            <Link href={`/work/${entry.slug}`} className="trace">
              {entry.name}
            </Link>
          </h3>
          <p className="prose mt-4" style={{ maxWidth: "50ch", color: "var(--fg)" }}>
            {entry.line}
          </p>
          <p className="sounding mt-5">{entry.stack.join("   ·   ")}</p>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 self-start lg:grid-cols-1 lg:gap-y-4">
          {entry.facts?.map((fact) => (
            <div key={fact.term} style={{ borderTop: "1px solid var(--rule)", paddingTop: "0.7rem" }}>
              <dt className="sounding">{fact.term}</dt>
              <dd className="ui mt-1 text-[0.95rem]" style={{ margin: 0, color: "var(--fg)" }}>
                {fact.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-14 overflow-x-auto">
        <table
          className="w-full border-collapse text-left"
          style={{ minWidth: "40rem" }}
        >
          <caption className="sounding pb-4 text-left">
            Every model runs locally. Sizes are parameter counts.
          </caption>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--fg)" }}>
              <th scope="col" className="sounding py-2.5 pr-6 font-medium">Model</th>
              <th scope="col" className="sounding py-2.5 pr-6 font-medium">What it does</th>
              <th scope="col" className="sounding py-2.5 pr-6 font-medium">Weights</th>
              <th scope="col" className="sounding py-2.5 pr-6 font-medium">Kind</th>
              <th scope="col" className="sounding py-2.5 text-right font-medium">Size</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr
                key={m.slug}
                className="model-row transition-colors duration-200"
                style={{ borderBottom: "1px solid var(--rule)" }}
              >
                <th
                  scope="row"
                  className="ui py-3.5 pr-6 align-top text-[1rem] font-semibold"
                  style={{ color: "var(--fg)" }}
                >
                  {m.title}
                </th>
                <td className="py-3.5 pr-6 align-top text-[0.95rem]" style={{ color: "var(--fg-soft)" }}>
                  {m.tagline}
                </td>
                <td className="sounding py-3.5 pr-6 align-top">{m.model}</td>
                <td className="sounding py-3.5 pr-6 align-top">{m.category}</td>
                <td
                  className="sounding py-3.5 text-right align-top"
                  style={{ color: "var(--fg)" }}
                >
                  {m.params}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
