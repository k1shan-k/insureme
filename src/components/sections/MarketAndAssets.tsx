"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  digitalAssetMarks,
  insuranceMarketMarks,
  type MarketMark,
} from "@/lib/marketMarks";

export function MarketAndAssets() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-labelledby="market-landscape-title"
      className="overflow-hidden border-y border-line bg-transparent py-16 lg:py-20"
    >
      <div className="container-x">
        <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel>Market &amp; asset landscape</SectionLabel>
            <h2
              id="market-landscape-title"
              className="mt-5 max-w-2xl font-serif text-3xl font-light text-navy sm:text-4xl"
            >
              Built to operate across institutional insurance and on-chain
              markets.
            </h2>
          </div>
          <p className="max-w-md text-[13.5px] leading-relaxed text-slate-muted lg:col-span-5 lg:justify-self-end">
            Organizations and assets shown are market references only. Display
            does not indicate a partnership, endorsement, capacity commitment,
            active policy or guaranteed eligibility.
          </p>
        </div>
      </div>

      <div className="container-x mt-6 flex justify-end">
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

      <div className="reveal mt-5 space-y-5" data-reveal-delay="100">
        <Marquee
          label="Global insurance market references"
          marks={insuranceMarketMarks}
          direction="forward"
          paused={paused}
        />
        <Marquee
          label="Illustrative digital-asset exposures considered in underwriting"
          marks={digitalAssetMarks}
          direction="reverse"
          paused={paused}
        />
      </div>

      <div className="container-x mt-8">
        <p className="max-w-4xl text-[12px] leading-relaxed text-slate-faint">
          Digital assets are not insured merely because they appear here.
          Coverage attaches only to the named insured, scheduled assets, systems
          and risks expressly stated in an issued policy, subject to all limits,
          retentions, exclusions and conditions.
        </p>
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
          className="market-mark"
        >
          <span
            className={`market-mark__symbol ${
              mark.tone === "asset" ? "market-mark__symbol--asset" : ""
            }`}
          >
            {mark.short}
          </span>
          <span>
            <span className="block font-serif text-lg font-medium leading-none text-navy/85">
              {mark.name}
            </span>
            <span className="mt-1.5 block text-[9px] font-medium uppercase tracking-[0.14em] text-slate-faint">
              {mark.descriptor}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
