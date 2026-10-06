import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { faqGroups } from "@/data/faqs";

export function FaqSection({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  return (
    <section id="faq" className="scroll-mt-24 bg-mist/60 py-16 sm:py-24">
      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow="Good to Know"
            title="Frequently asked questions"
            subtitle="The things guests ask us most — and honest answers to them."
          />
        ) : null}

        <div className="mx-auto mt-12 max-w-3xl space-y-10">
          {faqGroups.map((group, groupIndex) => (
            <Reveal key={group.id} delay={groupIndex * 60}>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-text">
                  {group.title}
                </h3>

                <div className="mt-4 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-snow">
                  {group.faqs.map((faq) => (
                    <details
                      key={faq.id}
                      id={faq.id}
                      className="group px-5 py-4 open:bg-mist/40 sm:px-6"
                    >
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left font-medium text-text [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pahadi">
                        <span>{faq.question}</span>
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-pahadi transition-transform duration-300 group-open:rotate-180"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </span>
                      </summary>
                      <p className="mt-3 leading-relaxed text-muted">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted">
          Sample content for layout preview — update these answers with the
          details guests actually need.
        </p>
      </Container>
    </section>
  );
}