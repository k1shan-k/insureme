import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { footerColumns, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line-dark/60 bg-navy-950 text-ivory/70">
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/55">
              Insurance infrastructure for the decentralized economy.
              Institutional-grade underwriting for the risks that define
              on-chain finance.
            </p>
            {(site.address || site.email) && (
              <div className="mt-8 space-y-1.5 text-sm text-ivory/55">
                {site.address && <p>{site.address}</p>}
                {site.email && (
                  <p>
                    <a
                      href={`mailto:${site.email}`}
                      className="transition-colors hover:text-gold-light"
                    >
                      {site.email}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h3 className="text-[11px] font-medium uppercase tracking-label text-gold-light">
                  {col.heading}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-ivory/65 transition-colors hover:text-ivory"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-line-dark pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-ivory/45">
            Insurance products and coverage are subject to applicable policy
            terms, conditions, limitations and exclusions. Availability of
            coverage varies by product, jurisdiction, risk profile and
            underwriting outcome. Nothing on this website constitutes an offer
            to provide insurance, financial, legal or investment advice.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ivory/45">
              © {site.year} {site.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
              <Link
                href="/legal/terms"
                className="text-ivory/45 transition-colors hover:text-ivory/80"
              >
                Terms
              </Link>
              <Link
                href="/legal/privacy"
                className="text-ivory/45 transition-colors hover:text-ivory/80"
              >
                Privacy
              </Link>
              <Link
                href="/legal/policy-terms"
                className="text-ivory/45 transition-colors hover:text-ivory/80"
              >
                Policy Terms
              </Link>
              <Link
                href="/legal/regulatory"
                className="text-ivory/45 transition-colors hover:text-ivory/80"
              >
                Regulatory Information
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
