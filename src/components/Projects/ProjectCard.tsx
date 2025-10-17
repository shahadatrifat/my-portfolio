"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  live: string;
  github: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  image,
  live,
  github,
}: ProjectCardProps) {
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
          className="object-cover object-center brightness-[0.7] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,23,42,0.2)] via-[rgba(15,23,42,0.32)] to-[rgba(15,23,42,0.45)]" />
      </motion.div>

      {/* Content */}
      <div className="project-content relative z-10 max-w-3xl text-center text-[var(--color-midnight-100)] px-6">
        <div className="absolute inset-0 blur-3xl opacity-20 bg-[radial-gradient(circle_at_center,var(--color-indigo-accent)_0%,transparent_70%)]"></div>

        <h3 className="relative text-4xl md:text-6xl font-heading font-semibold mb-4 bg-gradient-to-r from-[var(--color-indigo-accent)] to-[var(--color-violet-accent)] bg-clip-text text-transparent">
          {title}
        </h3>

        <p className="relative text-base md:text-lg text-[var(--color-midnight-200)] mb-6 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>

        <div className="relative flex flex-wrap justify-center gap-3 mb-8">
          {tech.map((t, i) => (
            <span
              key={i}
              className="text-sm md:text-base bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] px-4 py-1 rounded-full backdrop-blur-sm hover:border-[var(--color-indigo-accent)] transition-all duration-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="relative flex flex-col sm:flex-row justify-center items-center gap-4">
          {/* Live Demo Button */}
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 transition-all duration-300 hover:scale-105 group"
          >
            View Live
          </a>

          {/* Source Code Button */}
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 px-6 py-3 transition-all duration-300 hover:scale-105 group"
          >
            Source Code
            <Github
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
