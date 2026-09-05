const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
const vercelDeploymentUrl = process.env.VERCEL_URL?.trim();
// Netlify sets no VERCEL_* variables. `URL` is the production site origin and
// `DEPLOY_PRIME_URL` the per-deploy origin; both are read only when NETLIFY is
// set, because `URL` is too generic a name to trust elsewhere.
const netlifySiteUrl = process.env.NETLIFY ? process.env.URL?.trim() : undefined;
const netlifyDeployUrl = process.env.NETLIFY
  ? process.env.DEPLOY_PRIME_URL?.trim()
  : undefined;
const configuredClientPortalUrl =
  process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL?.trim();

type SiteUrlSource =
  | "NEXT_PUBLIC_SITE_URL"
  | "VERCEL_PROJECT_PRODUCTION_URL"
  | "VERCEL_URL"
  | "URL"
  | "DEPLOY_PRIME_URL";

function parseSiteOrigin(
  value: string,
  source: SiteUrlSource,
  allowHostOnly = false,
) {
  const candidate =
    allowHostOnly && !value.includes("://") ? `https://${value}` : value;
  let url: URL;

  try {
    url = new URL(candidate);
  } catch {
    throw new Error(`${source} must be a valid URL origin.`);
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error(`${source} must use HTTP or HTTPS.`);
  }
  if (
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      `${source} must be a credential-free origin without a path, query, or fragment.`,
    );
  }
  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
    throw new Error(`${source} must use HTTPS in production.`);
  }

  return url.origin;
}

function resolveSiteUrl() {
  if (configuredSiteUrl) {
    return parseSiteOrigin(configuredSiteUrl, "NEXT_PUBLIC_SITE_URL");
  }
  if (vercelProductionUrl) {
    return parseSiteOrigin(
      vercelProductionUrl,
      "VERCEL_PROJECT_PRODUCTION_URL",
      true,
    );
  }
  if (vercelDeploymentUrl) {
    return parseSiteOrigin(vercelDeploymentUrl, "VERCEL_URL", true);
  }
  if (netlifySiteUrl) {
    return parseSiteOrigin(netlifySiteUrl, "URL", true);
  }
  if (netlifyDeployUrl) {
    return parseSiteOrigin(netlifyDeployUrl, "DEPLOY_PRIME_URL", true);
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "A public site origin is required in production. Set NEXT_PUBLIC_SITE_URL, or expose the Vercel/Netlify system environment variables.",
    );
  }

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

function resolveClientPortalUrl() {
  if (!configuredClientPortalUrl) return undefined;

  try {
    const url = new URL(configuredClientPortalUrl);
    if (
      url.protocol !== "https:" ||
      Boolean(url.username) ||
      Boolean(url.password)
    ) {
      throw new Error("Invalid client portal URL.");
    }

    return url.href;
  } catch {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "NEXT_PUBLIC_CLIENT_PORTAL_URL must be a valid, credential-free HTTPS URL.",
      );
    }

    return undefined;
  }
}

export const clientPortalUrl = resolveClientPortalUrl();
