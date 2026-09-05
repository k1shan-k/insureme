import { siteUrl } from "@/lib/config";

/**
 * Netlify Forms intake sink.
 *
 * WHY THIS IS SERVER-SIDE
 * -----------------------
 * The documented Netlify Forms pattern posts straight from the browser to a
 * static detection file. Doing that here would bypass every guarantee the
 * intake routes provide: allowlisted fields, enum validation, size caps,
 * honeypot rejection, real-calendar-date checks, the issued reference, and the
 * 24-hour response deadline. So the route handlers still validate exactly as
 * before and only then forward a normalised payload here.
 *
 * WHAT YOU GIVE UP BY CHOOSING THIS SINK
 * --------------------------------------
 * Netlify Forms has no upsert and no idempotency key. Supabase dedupes on
 * `submission_id`, so an unchanged retry returns the original reference without
 * creating a second record. Netlify Forms cannot do that: a retry creates a
 * second submission carrying the same `reference`, and operations staff must
 * dedupe by that value. Prefer Supabase when duplicate-free intake matters.
 *
 * Free-plan submission quotas also apply, and submissions are stored in the
 * Netlify UI — a different data location, with its own access controls, for
 * material that includes contract addresses, security-control descriptions and
 * incident history.
 */

/** Path of the static detection file in `public/`. */
const FORMS_PATH = "/__forms.html";

export const NETLIFY_FORM_ASSESSMENT = "risk-assessment";
export const NETLIFY_FORM_CLAIMS = "claims-notification";

export type NetlifyFormsConfig = { endpoint: string };

/**
 * Netlify Forms is opt-in. It is only usable on Netlify, so requiring an
 * explicit flag keeps a Vercel or self-hosted deployment from silently posting
 * intake at a URL that cannot accept it.
 */
export function getNetlifyFormsConfig(): NetlifyFormsConfig | null {
  const enabled = process.env.NETLIFY_FORMS_ENABLED?.trim().toLowerCase();
  if (enabled !== "true") return null;

  try {
    const endpoint = new URL(FORMS_PATH, siteUrl);
    // The detection file is served from the deployment itself, so the origin
    // must be the resolved public site origin and nothing else.
    if (endpoint.protocol !== "https:" && process.env.NODE_ENV === "production") {
      return null;
    }
    return { endpoint: endpoint.href };
  } catch {
    return null;
  }
}

/** Netlify Forms fields are flat strings; arrays and booleans are normalised. */
function flatten(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.map((item) => String(item)).join(", ");
  if (typeof value === "boolean") return value ? "yes" : "no";
  return String(value);
}

export class NetlifyFormsError extends Error {
  constructor(readonly status?: number) {
    super("Netlify Forms submission failed.");
    this.name = "NetlifyFormsError";
  }
}

/**
 * Posts one submission to the detection file. Throws NetlifyFormsError so the
 * caller can decide whether the request fails closed.
 */
export async function submitToNetlifyForms(
  config: NetlifyFormsConfig,
  formName: string,
  payload: Record<string, unknown>,
): Promise<void> {
  const body = new URLSearchParams();
  // Netlify identifies the target form by this field, not by the URL.
  body.set("form-name", formName);
  for (const [key, value] of Object.entries(payload)) {
    body.set(key, flatten(value));
  }

  let response: Response;
  try {
    response = await fetch(config.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      redirect: "error",
      signal: AbortSignal.timeout(8_000),
    });
  } catch {
    throw new NetlifyFormsError();
  }

  if (!response.ok) throw new NetlifyFormsError(response.status);
}
