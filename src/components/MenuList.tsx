import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  hasPrice,
  menuCategories,
  menuTagLabels,
} from "@/data/menu";
import type { MenuTag } from "@/data/menu";

const tagClasses: Record<MenuTag, string> = {
  veg: "border-muted/50 text-muted",
  vegan: "border-muted/50 text-muted",
  seasonal: "border-cafe/40 text-cafe",
  signature: "border-pahadi/30 text-pahadi",
  spicy: "border-cafe/50 text-cafe-deep",
};

export function MenuList() {
  const tagLabels = menuTagLabels();

  return (
    <section id="menu" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Menu"
          title="Something for every kind of morning"
          subtitle="Simple, seasonal and cooked to order — from a first espresso to a full plate of local food."
        />

        <nav
          aria-label="Menu categories"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {menuCategories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="rounded-full border border-line bg-snow px-4 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:border-pahadi hover:bg-pahadi/5 hover:text-pahadi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pahadi"
            >
              {category.name}
            </a>
          ))}
        </nav>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
          {menuCategories.map((category, index) => (
            <Reveal key={category.id} delay={index % 2 === 1 ? 100 : 0} className="h-full">
              <div className="h-full rounded-3xl border border-line bg-snow p-6 sm:p-7">
                <h3
                  id={category.id}
                  className="scroll-mt-28 font-display text-2xl font-semibold tracking-tight text-text"
                >
                  {category.name}
                </h3>
                {category.blurb ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {category.blurb}
                  </p>
                ) : null}

                <ul className="mt-6 space-y-5">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <div className="flex items-baseline gap-3">
                        <span className="font-medium text-text">{item.name}</span>
                        <span
                          aria-hidden="true"
                          className="flex-1 border-b border-dotted border-line"
                        />
                        <span
                          className={
                            hasPrice(item)
                              ? "tabular-nums text-text"
                              : "text-sm italic text-muted"
                          }
                        >
                          {hasPrice(item) ? item.price : "Ask"}
                        </span>
                      </div>

                      {item.description ? (
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {item.description}
                        </p>
                      ) : null}

                      {item.tags && item.tags.length > 0 ? (
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <li key={tag}>
                              <span
                                className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${tagClasses[tag]}`}
                              >
                                {tagLabels[tag]}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted">
          Sample menu — the owner&apos;s own menu and prices will be published
          soon. Ask us for today&apos;s specials.
        </p>
      </Container>
    </section>
  );
}