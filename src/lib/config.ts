const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const configuredClientPortalUrl =
  process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL?.trim();

function resolveSiteUrl() {
  if (!configuredSiteUrl) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("NEXT_PUBLIC_SITE_URL is required in production.");
    }
    return "http://localhost:3000";
  }

  const url = new URL(configuredSiteUrl);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("NEXT_PUBLIC_SITE_URL must use HTTP or HTTPS.");
  }
  if (
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be a credential-free origin without a path, query, or fragment.",
    );
  }
  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SITE_URL must use HTTPS in production.");
  }

  return url.origin;
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
