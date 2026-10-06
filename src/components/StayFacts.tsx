import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getConfirmedStayFacts } from "@/data/stayFacts";

// Compact "Know before you go" strip. Anything the owner hasn't confirmed yet
// is filtered out upstream, so this renders nothing rather than showing
// placeholder policy text.
export function StayFacts() {
  const facts = getConfirmedStayFacts();
  if (facts.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Practical Details"
            title="Know before you go"
            subtitle="The practical details, so you can plan your trip without a string of follow-up questions."
          />

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => {
              const Icon = fact.icon;
              return (
                <li
                  key={fact.id}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-snow p-5"
                >
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pahadi/10 text-pahadi"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {fact.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-text">
                      {fact.value}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}