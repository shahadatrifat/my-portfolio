"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    <div className="relative min-w-[100vw] h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0"
        style={{ zIndex: 0 }}
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover object-center brightness-[0.65] md:brightness-[0.75] contrast-[1.05]"
        />

        {/* Refined Overlay — transparent gradient for cinematic clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,23,42,0.6)] via-[rgba(15,23,42,0.7)] to-[rgba(15,23,42,0.85)]" />
      </motion.div>

      {/* Text Layer */}
      <motion.div
        className="relative z-10 max-w-3xl text-center text-[var(--color-midnight-100)] px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "power3.out" }}
      >
        {/* Soft glow background behind text for readability */}
        <div className="absolute inset-0 mx-auto blur-3xl opacity-20 bg-[radial-gradient(circle_at_center,var(--color-indigo-accent)_0%,transparent_70%)]"></div>

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

        <div className="relative flex justify-center gap-4">
          <Button asChild className="btn-primary">
            <a href={live} target="_blank" rel="noopener noreferrer">
              View Live
            </a>
          </Button>

          <Button asChild className="btn-secondary">
            <a href={github} target="_blank" rel="noopener noreferrer">
              Source Code
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
