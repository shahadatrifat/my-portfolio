"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { Button } from "../ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  live: string;
  github: string;
  isMobile?: boolean;
}

export default function ProjectCard({
  title,
  description,
  tech,
  image,
  live,
  github,
  isMobile = false,
}: ProjectCardProps) {
  // Mobile card (vertical layout)
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative rounded-xl overflow-hidden bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] backdrop-blur-sm hover:border-[var(--color-indigo-accent)] transition-all duration-300 group"
      >
        {/* Image Container */}
        <div className="relative h-52 sm:h-72 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center brightness-[0.6] blur-[0.5px] group-hover:scale-105 group-hover:blur-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,23,42,0.3)] via-[rgba(15,23,42,0.4)] to-[rgba(15,23,42,0.95)]" />
        </div>

        {/* Content */}
        <div className="relative p-5 sm:p-6 space-y-3 sm:space-y-4">
          <h3 className="text-xl sm:text-2xl font-heading font-semibold bg-gradient-to-r from-[var(--color-indigo-accent)] to-[var(--color-violet-accent)] bg-clip-text text-transparent">
            {title}
          </h3>

          <p className="text-sm sm:text-base text-[var(--color-midnight-200)] leading-relaxed line-clamp-3">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {tech.map((t, i) => (
              <span
                key={`${title}-${t}-${i}`}
                className="text-xs bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] px-2.5 py-1 rounded-full backdrop-blur-sm hover:border-[var(--color-indigo-accent)] transition-colors duration-200"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="relative flex flex-row gap-4 justify-center items-center">
          <Button className="btn-primary flex items-center justify-center px-6 py-3 transition-all duration-300 hover:scale-105">
            <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className=" "
          >
            View Live
          </a>
          </Button>

          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] hover:border-[var(--color-indigo-accent)] whitespace-nowrap transition-all duration-300 hover:scale-105 group"
          >
            <span>Source Code</span>
            <Github
              size={20}
              className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
        </div>
      </motion.div>
    );
  }

  // Desktop card (full-screen horizontal)
  return (
    <div className="project-card relative min-w-[100vw] h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        style={{ zIndex: 0 }}
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover object-center brightness-[0.5] contrast-[1.1] blur-[1.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,23,42,0.5)] via-[rgba(15,23,42,0.6)] to-[rgba(15,23,42,0.75)]" />
        {/* Extra overlay to reduce text visibility */}
        <div className="absolute inset-0 bg-[rgba(15,23,42,0.3)] backdrop-blur-[2px]" />
      </motion.div>

      {/* Content */}
      <div className="project-content relative z-10 max-w-3xl px-6 text-center text-[var(--color-midnight-100)]">
        <div className="absolute inset-0 blur-3xl opacity-20 bg-[radial-gradient(circle_at_center,var(--color-indigo-accent)_0%,transparent_70%)]"></div>

        <h3 className="relative text-4xl md:text-5xl lg:text-6xl font-heading font-semibold mb-4 bg-gradient-to-r from-[var(--color-indigo-accent)] to-[var(--color-violet-accent)] bg-clip-text text-transparent">
          {title}
        </h3>

        <p className="relative text-base md:text-lg text-[var(--color-midnight-200)] mb-6 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>

        <div className="relative flex flex-wrap justify-center gap-3 mb-8">
          {tech.map((t, i) => (
            <span
              key={`${title}-${t}-${i}`}
              className="text-sm md:text-base bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] px-4 py-2 rounded-full backdrop-blur-sm hover:border-[var(--color-indigo-accent)] transition-all duration-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="relative flex flex-row gap-4 justify-center items-center">
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center justify-center px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            View Live
          </a>

          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] hover:border-[var(--color-indigo-accent)] whitespace-nowrap transition-all duration-300 hover:scale-105 group"
          >
            <span>Source Code</span>
            <Github
              size={20}
              className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </div>
  );
}