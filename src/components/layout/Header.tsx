"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button, ArrowRight } from "@/components/ui/Button";
import { primaryNav } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-line bg-ivory/95 backdrop-blur-md"
          : "border-b border-transparent bg-ivory/60 backdrop-blur-sm"
      }`}
    >
      <div className="container-x">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="link-underline text-[13.5px] font-medium text-charcoal/85 hover:text-navy"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/risk-assessment"
              className="text-[13.5px] font-medium text-charcoal/80 transition-colors hover:text-navy"
            >
              Client Login
            </Link>
            <span aria-hidden className="h-4 w-px bg-line" />
            <Button href="/risk-assessment" size="sm" variant="primary">
              Get Coverage
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
          </div>

          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex flex-col gap-[5px]">
              <span
                className={`block h-px w-6 bg-charcoal transition-all duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-charcoal transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-charcoal transition-all duration-300 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden border-t border-line bg-ivory transition-[max-height,opacity] duration-500 ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-x flex flex-col py-6">
          {primaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line/70 py-4 font-serif text-lg text-navy"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Button href="/risk-assessment" variant="secondary" onClick={() => setOpen(false)}>
              Client Login
            </Button>
            <Button href="/risk-assessment" variant="primary" onClick={() => setOpen(false)}>
              Get Coverage
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
