import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { RoomCard } from "@/components/RoomCard";
import { rooms } from "@/data/rooms";

export function RoomsSection() {
  return (
    <section id="rooms" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Accommodation"
          title="Stay With Us"
          subtitle="Two comfortable rooms designed for rest — walk down for coffee and food whenever you like."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {rooms.map((room, index) => (
            <Reveal key={room.id} delay={index * 80}>
              <RoomCard room={room} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}