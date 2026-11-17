import { About } from "@/components/About";
import { Banner } from "@/components/Banner";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Page() {
  return (
    <main id="main">
      <Hero />
      <Banner />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
