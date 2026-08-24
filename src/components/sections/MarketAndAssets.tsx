"use client";

import { useState } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  insuredProjectMarks,
  insurancePartnerMarks,
  type MarketMark,
} from "@/lib/marketMarks";

export function MarketAndAssets() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-label="Partners and insured projects"
      className="overflow-hidden border-y border-line bg-transparent py-16 lg:py-20"
    >
      <div className="container-x flex items-center justify-between gap-6">
        <SectionLabel>Our Partners</SectionLabel>
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((current) => !current)}
          className="motion-toggle inline-flex items-center gap-2 border border-line px-3 py-2 text-[10px] font-medium uppercase tracking-label text-slate-muted transition-colors hover:border-navy/40 hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
          {paused ? "Resume motion" : "Pause motion"}
        </button>
      </div>

      <div className="reveal mt-8 space-y-5" data-reveal-delay="100">
        <Marquee
          label="Insurance Partners"
          marks={insurancePartnerMarks}
          direction="forward"
          paused={paused}
        />
        <Marquee
          label="Insured Projects & Risk Management Partners"
          marks={insuredProjectMarks}
          direction="reverse"
          paused={paused}
        />
      </div>
    </section>
  );
}

function Marquee({
  label,
  marks,
  direction,
  paused,
}: {
  label: string;
  marks: MarketMark[];
  direction: "forward" | "reverse";
  paused: boolean;
}) {
  return (
    <div>
      <p className="container-x mb-3 text-[10px] font-medium uppercase tracking-label text-slate-faint">
        {label}
      </p>
      <p className="sr-only">{marks.map((mark) => mark.name).join(", ")}</p>
      <div
        className="marquee-mask group/marquee border-y border-line/70"
        aria-hidden="true"
      >
        <div
          className={`marquee-track py-4 ${
            direction === "reverse" ? "marquee-track--reverse" : ""
          } ${paused ? "marquee-track--paused" : ""}`}
        >
          <MarkGroup marks={marks} />
          <MarkGroup marks={marks} duplicate />
        </div>
      </div>
    </div>
  );
}

function MarkGroup({
  marks,
  duplicate = false,
}: {
  marks: MarketMark[];
  duplicate?: boolean;
}) {
  return (
    <div className={`marquee-group ${duplicate ? "marquee-duplicate" : ""}`}>
      {marks.map((mark) => (
        <div
          key={`${duplicate ? "duplicate-" : ""}${mark.name}`}
          className={`market-mark ${
            mark.tone === "defi" ? "market-mark--defi" : ""
          }`}
        >
          <BrandLogo brand={mark.logo} className="market-mark__logo" />
          <span className="market-mark__descriptor">{mark.descriptor}</span>
        </div>
      ))}
    </div>
  );
}
