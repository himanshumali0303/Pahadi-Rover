import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { facilities } from "@/data/whyChooseUs";

export function WhyStaySection({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="why-choose-us" className="scroll-mt-24 bg-mist/60 py-16 sm:py-24">
      <Container>
        {showHeading ? (
          <Reveal>
            <SectionHeading
              eyebrow="Why Pahadi Rover"
              title="Why Choose Pahadi Rover"
              subtitle="There are plenty of places to stay in the hills. Here's what makes staying here worth the detour."
            />
          </Reveal>
        ) : null}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, index) => (
            <Reveal key={facility.id} delay={index * 70}>
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-snow p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <span
                  className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pahadi text-snow transition-colors duration-300 group-hover:bg-pahadi-deep"
                  aria-hidden="true"
                >
                  <facility.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-text">
                  {facility.title}
                </h3>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
