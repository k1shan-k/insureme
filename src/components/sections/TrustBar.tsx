import { trustItems } from "@/lib/content";

export function TrustBar() {
  return (
    <section aria-label="Risk categories" className="border-y border-line bg-ivory-50">
      <div className="container-x">
        <div className="grid grid-cols-2 divide-line md:grid-cols-3 lg:grid-cols-5 lg:divide-x">
          {trustItems.map((item, i) => (
            <div
              key={item}
              className={`flex items-center justify-center px-4 py-7 text-center ${
                i < trustItems.length - 1 ? "border-b border-line lg:border-b-0" : ""
              }`}
            >
              <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-slate-muted">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
