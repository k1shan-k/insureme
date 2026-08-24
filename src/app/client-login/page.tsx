import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button, ArrowRight } from "@/components/ui/Button";
import { clientPortalUrl } from "@/lib/config";
import { createPageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Policyholder Portal",
    description:
      "Access information for policyholders and other users who have received authorized portal instructions.",
    path: "/client-login",
  }),
  robots: { index: false, follow: false },
};

export default function ClientLoginPage() {
  const clientServicesEmail = site.clientServicesEmail.trim();

  return (
    <section className="min-h-[78vh] bg-ivory pb-20 pt-32 lg:pt-40">
      <div className="container-x">
        <div className="mx-auto max-w-4xl border border-line bg-white shadow-[0_30px_90px_-50px_rgba(10,31,54,0.4)]">
          <div className="grid lg:grid-cols-2">
            <div className="bg-navy-900 p-8 text-ivory sm:p-12">
              <SectionLabel tone="light">Policyholder portal</SectionLabel>
              <h1 className="mt-6 font-serif text-4xl font-light leading-tight">
                Use the access route provided to you
              </h1>
              <p className="mt-5 text-[15px] leading-relaxed text-ivory/65">
                Portal availability and permitted use depend on the access
                instructions supplied for the relevant relationship or
                transaction.
              </p>
              <p className="mt-8 border-t border-line-dark pt-6 text-[13px] leading-relaxed text-ivory/60">
                Portal access does not amend insurance coverage. Transaction
                documents control coverage.
              </p>
            </div>

            <div className="p-8 sm:p-12">
              <p className="text-[11px] font-medium uppercase tracking-label text-gold">
                Access guidance
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-navy">
                Follow your issued instructions
              </h2>
              <p className="mt-4 text-[14.5px] leading-relaxed text-slate-muted">
                Use the portal address or support channel provided in your
                onboarding or transaction documentation. Do not send policy or
                account information through an unverified channel.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {clientPortalUrl && (
                  <Button
                    href={clientPortalUrl}
                    variant="primary"
                    className="group"
                  >
                    Open policyholder portal
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Button>
                )}
                {clientServicesEmail && (
                  <Button
                    href={`mailto:${clientServicesEmail}`}
                    variant={clientPortalUrl ? "secondary" : "primary"}
                    className="group"
                  >
                    Email client services
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Button>
                )}
                {!clientPortalUrl && !clientServicesEmail && (
                  <p className="border border-line bg-ivory-50 p-4 text-[13.5px] leading-relaxed text-slate-muted">
                    No public portal or client-services contact is configured.
                    Use the access instructions in your transaction
                    documentation.
                  </p>
                )}
              </div>
              <p className="mt-8 border-t border-line pt-6 text-[12.5px] leading-relaxed text-slate-faint">
                Never provide a seed phrase, private key, password, or signing
                transaction to obtain portal access. Verify unexpected requests
                through a known channel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
