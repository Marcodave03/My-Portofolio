import type { ReactNode } from "react";

const control: React.CSSProperties = {
  border: "2px solid var(--fg)",
  background: "var(--bg)",
  color: "var(--fg)",
  width: "100%",
  padding: "0.6rem 0.7rem",
  fontSize: "0.95rem",
  lineHeight: 1.5,
};

export function Label({
  htmlFor,
  children,
  hint,
}: {
  htmlFor: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="mb-1.5">
      <label htmlFor={htmlFor} className="ui block text-[0.9rem] font-semibold">
        {children}
      </label>
      {hint ? (
        <p className="sounding mt-0.5" style={{ maxWidth: "60ch" }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Text({
  name,
  label,
  hint,
  defaultValue,
  required,
  placeholder,
  type = "text",
}: {
  name: string;
  label: string;
  hint?: string;
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="mb-6">
      <Label htmlFor={name} hint={hint}>
        {label}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="ui"
        style={control}
      />
    </div>
  );
}

export function Area({
  name,
  label,
  hint,
  defaultValue,
  rows = 5,
  placeholder,
}: {
  name: string;
  label: string;
  hint?: string;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div className="mb-6">
      <Label htmlFor={name} hint={hint}>
        {label}
      </Label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="ui"
        style={{ ...control, resize: "vertical" }}
      />
    </div>
  );
}

export function Select({
  name,
  label,
  options,
  defaultValue,
  hint,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  hint?: string;
}) {
  return (
    <div className="mb-6">
      <Label htmlFor={name} hint={hint}>
        {label}
      </Label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="ui"
        style={control}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Check({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="ui mb-6 flex items-center gap-2.5 text-[0.95rem]">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        style={{ width: 18, height: 18, accentColor: "var(--accent-ink)" }}
      />
      {label}
    </label>
  );
}

export function Submit({ children = "Save" }: { children?: ReactNode }) {
  return (
    <button
      type="submit"
      className="ui rounded-full px-6 py-3 text-[0.98rem] font-semibold"
      style={{
        border: "2px solid var(--fg)",
        background: "var(--accent)",
        color: "var(--on-accent)",
      }}
    >
      {children}
    </button>
  );
}

export const controlStyle = control;
