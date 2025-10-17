"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import { projects } from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 🧹 Clean previous triggers first
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

    // 🧹 Cleanup on unmount
    return () => {
      ctx.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative overflow-hidden block"
    >
      <div className="flex">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}
