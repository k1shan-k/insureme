import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button, ArrowRight } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Policyholder Portal",
  description:
    "Secure portal access information for Meridian Risk policyholders and authorized counterparties.",
  robots: { index: false, follow: false },
};

export default function ClientLoginPage() {
  const portalUrl = process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL;

  return (
    <section className="min-h-[78vh] bg-ivory pb-20 pt-32 lg:pt-40">
      <div className="container-x">
        <div className="mx-auto max-w-4xl border border-line bg-white shadow-[0_30px_90px_-50px_rgba(10,31,54,0.4)]">
          <div className="grid lg:grid-cols-2">
            <div className="bg-navy-900 p-8 text-ivory sm:p-12">
              <SectionLabel tone="light">Policyholder portal</SectionLabel>
              <h1 className="mt-6 font-serif text-4xl font-light leading-tight">
                Secure access is issued by invitation.
              </h1>
              <p className="mt-5 text-[15px] leading-relaxed text-ivory/65">
                The portal is available to active policyholders and authorized
                representatives. Credentials and the secure portal address are
                delivered through verified onboarding channels.
              </p>
              <ul className="mt-8 space-y-3 text-[14px] text-ivory/75">
                {[
                  "Policy documentation",
                  "Risk and material-change reporting",
                  "Incident notification",
                  "Claims correspondence",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <IconCheck className="text-gold-light" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 sm:p-12">
              <p className="text-[11px] font-medium uppercase tracking-label text-gold">
                Access support
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-navy">
                Need portal credentials?
              </h2>
              <p className="mt-4 text-[14.5px] leading-relaxed text-slate-muted">
                Contact underwriting from your authorized business address. We
                will verify your organization and relationship before providing
                or resetting access.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {portalUrl ? (
                  <Button href={portalUrl} variant="primary" className="group">
                    Open Secure Portal
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Button>
                ) : (
                  <Button
                    href="/risk-assessment#contact"
                    variant="primary"
                    className="group"
                  >
                    Contact Client Services
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Button>
                )}
                <Button href="/legal/security-practices" variant="secondary">
                  Review Security Practices
                </Button>
              </div>
              <p className="mt-8 border-t border-line pt-6 text-[12.5px] leading-relaxed text-slate-faint">
                Meridian Risk will never request a seed phrase, private key or
                signing transaction to provide portal access. Report suspicious
                requests immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
