"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import { projects } from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current || isMobile) return;

    // Clean previous triggers first
    ScrollTrigger.getAll().forEach((st) => st.kill());

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".project-card");
      if (!sections.length) return;

      // Total scroll distance based on viewport width
      const totalScroll = (sections.length - 1) * window.innerWidth;

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          id: "projects-scroll",
          trigger: containerRef.current,
          pin: true,
          scrub: 1.2,
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    // Cleanup on unmount
    return () => {
      ctx.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
  }, [isMobile]);

  // Mobile: Vertical scrolling
  if (isMobile) {
    return (
      <section
        id="projects"
        className="relative py-20 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-center mb-4
            bg-gradient-to-r from-[var(--color-indigo-accent)] to-[var(--color-violet-accent)]
            bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="h-[3px] w-20 mx-auto rounded-full mb-12
            bg-gradient-to-r from-[var(--color-indigo-accent)] to-[var(--color-violet-accent)]" />

          <div className="space-y-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} isMobile={true} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop: Horizontal scrolling
  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative overflow-hidden"
    >
      <div className="flex">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}