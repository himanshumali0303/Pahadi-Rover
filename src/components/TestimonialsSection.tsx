import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { QuoteIcon, StarIcon } from "@/components/Icons";
import {
  getTestimonialRating,
  testimonials,
} from "@/data/testimonials";

const MAX_RATING = 5;

export function TestimonialsSection({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  return (
    <section id="testimonials" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        {showHeading ? (
          <SectionHeading
            eyebrow="Guest Stories"
            title="What our guests say"
            subtitle="A few words from the people who stayed with us and came back."
          />
        ) : null}

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const rating = getTestimonialRating(testimonial);
            return (
              <li key={testimonial.id} className="h-full">
                <Reveal delay={(index % 3) * 80} className="h-full">
                  <article className="flex h-full flex-col rounded-3xl border border-line bg-snow p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <QuoteIcon className="h-7 w-7 text-cafe/60" />

                    <p className="mt-4 flex-1 leading-relaxed text-muted">
                      {testimonial.quote}
                    </p>

                    <div
                      className="mt-5 flex items-center gap-0.5 text-cafe"
                      role="img"
                      aria-label={`Rated ${rating} out of ${MAX_RATING}`}
                    >
                      {Array.from({ length: MAX_RATING }).map((_, star) => (
                        <StarIcon
                          key={star}
                          filled={star < rating}
                          className="h-4 w-4"
                        />
                      ))}
                    </div>

                    <div className="mt-4 border-t border-line pt-4">
                      <p className="font-semibold text-text">
                        {testimonial.name}
                      </p>
                      {testimonial.location ? (
                        <p className="text-sm text-muted">
                          {testimonial.location}
                        </p>
                      ) : null}
                      {testimonial.context ? (
                        <p className="mt-1 text-xs uppercase tracking-wide text-muted">
                          {testimonial.context}
                        </p>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-center text-xs text-muted">
          Sample reviews for layout preview — the owner&apos;s real guest feedback
          will be published here.
        </p>
      </Container>
    </section>
  );
}