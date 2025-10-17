import About from "@/components/About";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProjectSection from "@/components/Projects/ProjectSection";
import Skills from "@/components/Skills";

export default function Home() {
  return (
     <main className="space-y-8">
      <Navbar />
      <Hero />
      <About></About>
      <Skills></Skills>
      <ProjectSection></ProjectSection>
    </main>
  );
}
