import { createFileRoute } from "@tanstack/react-router";
import { Loader } from "@/components/Loader";
import { CursorTrail } from "@/components/CursorTrail";
import { AmbientToggle } from "@/components/AmbientToggle";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { BeyondCode } from "@/components/sections/BeyondCode";
import { RightNow } from "@/components/sections/RightNow";
import { Process } from "@/components/sections/Process";
import { Voices } from "@/components/sections/Voices";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Loader />
      <CursorTrail />
      <AmbientToggle />
      <Nav />
      <main className="relative overflow-visible">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <BeyondCode />
        <RightNow />
        <Process />
        <Voices />
        <Contact />
      </main>
    </>
  );
}
