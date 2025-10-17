"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

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
  return (
    <div
      className={`project-card relative ${
        isMobile
          ? "min-w-full h-auto py-16"
          : "min-w-[100vw] h-screen flex items-center justify-center"
      } overflow-hidden`}
    >
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
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,23,42,0.2)] via-[rgba(15,23,42,0.32)] to-[rgba(15,23,42,0.5)]" />
      </motion.div>

      {/* Content */}
      <div
        className={`project-content relative z-10 max-w-3xl px-6 ${
          isMobile ? "text-center py-12" : "text-center"
        } text-[var(--color-midnight-100)]`}
      >
        <div className="absolute inset-0 blur-3xl opacity-20 bg-[radial-gradient(circle_at_center,var(--color-indigo-accent)_0%,transparent_70%)]"></div>

        <h3 className="relative text-3xl md:text-5xl font-heading font-semibold mb-4 bg-gradient-to-r from-[var(--color-indigo-accent)] to-[var(--color-violet-accent)] bg-clip-text text-transparent">
          {title}
        </h3>

        <p className="relative text-sm md:text-lg text-[var(--color-midnight-200)] mb-6 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>

        <div className="relative flex flex-wrap justify-center gap-3 mb-8">
          {tech.map((t, i) => (
            <span
              key={`${title}-${t}-${i}`}
              className="text-xs md:text-base bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] px-3 py-1 rounded-full backdrop-blur-sm hover:border-[var(--color-indigo-accent)] transition-all duration-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div
          className={`relative flex ${
            isMobile
              ? "flex-col gap-3 items-center"
              : "flex-row gap-4 justify-center items-center"
          }`}
        >
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-5 py-3 transition-all duration-300 hover:scale-105 group"
          >
            View Live
            
          </a>

          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 px-5 py-3 transition-all duration-300 hover:scale-105 group"
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
