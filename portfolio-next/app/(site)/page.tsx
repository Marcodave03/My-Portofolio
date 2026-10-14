import Hero from "@/components/Hero";
import RegisterHeading from "@/components/RegisterHeading";
import VentureList from "@/components/VentureList";
import ClientGrid from "@/components/ClientGrid";
import ModelRegister from "@/components/ModelRegister";
import SystemList from "@/components/SystemList";
import HackathonTimeline from "@/components/HackathonTimeline";
import { getRegisters, getModels, getRecognition } from "@/lib/queries";



function Section({
  register,
  children,
  count,
}: {
  register: { id: string; title: string; blurb: string };
  count: string;
  children: React.ReactNode;
}) {
  const id = register.id;
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mx-auto max-w-[88rem] scroll-mt-24 px-5 pt-20 sm:px-8 sm:pt-28 lg:px-12"
    >
      <RegisterHeading
        id={id}
        title={register.title}
        blurb={register.blurb}
        count={count}
      />
      {children}
    </section>
  );
}

export default function Home() {
  const registers = getRegisters();
  const models = getModels();
  const recognition = getRecognition();
  const byId = Object.fromEntries(registers.map((r) => [r.id, r]));

  const index = registers.map((r) => ({
    id: r.id,
    title: r.title,
    count: r.id === "ai" ? models.length : r.entries.length,
    unit: r.id === "ai" ? "models" : r.entries.length === 1 ? "project" : "projects",
  }));

  return (
    <>
      <Hero index={index} />

      <Section register={byId.ventures} count={`${byId.ventures.entries.length} ventures`}>
        <VentureList entries={byId.ventures.entries} />
      </Section>

      <Section register={byId.clients} count={`${byId.clients.entries.length} sites`}>
        <ClientGrid entries={byId.clients.entries} />
      </Section>

      <Section register={byId.ai} count={`${models.length} models`}>
        <ModelRegister entry={byId.ai.entries[0]} models={models} />
      </Section>

      <Section register={byId.systems} count={`${byId.systems.entries.length} systems`}>
        <SystemList entries={byId.systems.entries} />
      </Section>

      <Section register={byId.hackathons} count={`${byId.hackathons.entries.length} projects`}>
        <HackathonTimeline entries={byId.hackathons.entries} recognition={recognition} />
      </Section>
    </>
  );
}
