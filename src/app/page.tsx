import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProjectSection from "@/components/Projects/ProjectSection";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="bg-[var(--color-bg)]">
      <Navbar />
      <Hero />
      <About></About>
      <Skills></Skills>
      <ProjectSection></ProjectSection>
      <Contact></Contact>
      <Footer></Footer>
    </main>
  );
}
