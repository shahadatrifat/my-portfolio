"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "./data";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection() {
  const root = useRef<HTMLDivElement | null>(null);
  const horizontalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!root.current || !horizontalRef.current) return;

    const sections = gsap.utils.toArray(".project-panel");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: root.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + horizontalRef.current?.offsetWidth,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="projects"
      ref={root}
      className="relative w-full overflow-hidden bg-[var(--color-midnight-900)]"
    >
      <div
        ref={horizontalRef}
        className="flex flex-row w-[300vw] h-screen project-scroll"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-panel flex-shrink-0 w-screen h-screen"
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </section>
  );
}
