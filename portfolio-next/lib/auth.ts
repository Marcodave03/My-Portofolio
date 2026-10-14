import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";

/**
 * A single-user password gate for /admin.
 *
 * The site is meant to run locally, but the admin area can write to the
 * database and the filesystem — so it is never left open. The password comes
 * from ADMIN_PASSWORD; the session is an HMAC-signed, httpOnly cookie, so
 * nothing about the password reaches the browser.
 */

const COOKIE = "portfolio_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours

function password(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

function secret(): string {
  // Falls back to the password so the setup stays one variable; a separate
  // AUTH_SECRET is honoured when you want sessions to survive a password change.
  return process.env.AUTH_SECRET || password() || "insecure-dev-secret";
}

export function isConfigured(): boolean {
  return password().length > 0;
}

function sign(expiry: number): string {
  const mac = crypto
    .createHmac("sha256", secret())
    .update(String(expiry))
    .digest("hex");
  return `${expiry}.${mac}`;
}

function valid(token: string | undefined): boolean {
  if (!token) return false;
  const [rawExpiry, mac] = token.split(".");
  if (!rawExpiry || !mac) return false;

  const expiry = Number(rawExpiry);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;

  const expected = crypto
    .createHmac("sha256", secret())
    .update(rawExpiry)
    .digest("hex");

  // Constant-time compare, guarding against length mismatch throwing.
  const a = Buffer.from(mac, "hex");
  const b = Buffer.from(expected, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Compare a submitted password without leaking length via early return. */
export function passwordMatches(submitted: string): boolean {
  const expected = password();
  if (!expected) return false;
  const a = Buffer.from(submitted);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    // Still burn a comparison so timing does not distinguish length.
    crypto.timingSafeEqual(b, b);
    return false;
  }
  return crypto.timingSafeEqual(a, b);
}

export async function signIn() {
  const expiry = Date.now() + MAX_AGE * 1000;
  const store = await cookies();
  store.set(COOKIE, sign(expiry), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function signOut() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isSignedIn(): Promise<boolean> {
  const store = await cookies();
  return valid(store.get(COOKIE)?.value);
}

/** Throws unless the caller is signed in. Every mutation calls this. */
export async function requireAdmin() {
  if (!(await isSignedIn())) {
    throw new Error("Not signed in");
  }
}
