"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "./ui/button";
import Image from "next/image";
import { Link } from "react-scroll";

export default function Hero() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!root.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(root.current.querySelector(".hero-title"), {
      y: 24,
      opacity: 0,
      duration: 0.8,
    })
      .from(
        root.current.querySelector(".hero-sub"),
        { y: 18, opacity: 0, duration: 0.7 },
        "-=0.4"
      )
      .from(
        root.current.querySelector(".hero-cta"),
        { y: 16, opacity: 0, duration: 0.6 },
        "-=0.35"
      )
      .from(
        root.current.querySelector(".hero-image"),
        { opacity: 0, scale: 0.9, duration: 1 },
        "-=0.5"
      );
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="relative min-h-screen pt-32 md:pt-40 pb-16 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 overflow-hidden"
    >
      {/* Full-width background gradient (not restricted by container) */}
      <div className="absolute inset-0 gradient-overlay pointer-events-none" />

      {/* Centered container for layout */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-12 md:gap-24 relative z-10">
        {/* Right: Profile Photo (first on mobile) */}
        <div className="flex-1 flex justify-center md:justify-end relative hero-image order-1 md:order-2">
          <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden shadow-lg border-2 border-[var(--color-indigo-accent)] will-change-transform">
            <Image
              src="/me.jpg"
              alt="Shahadat Hossain Rifat"
              fill
              className="w-full h-full object-cover scale-105 transition-transform duration-500 hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(99,102,241,0.15)] to-[rgba(139,92,246,0.15)]" />
          </div>
        </div>

        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center order-2 md:order-1">
          <h1
            className="hero-title text-5xl md:text-6xl font-heading font-semibold tracking-tight mb-6 
            bg-gradient-to-r from-[var(--color-indigo-accent)] to-[var(--color-violet-accent)]
            bg-clip-text text-transparent leading-tight"
            aria-label="Shahadat Hossain Rifat"
          >
            Shahadat Hossain Rifat
          </h1>

          <p className="hero-sub text-lg md:text-2xl max-w-xl mb-8 text-[var(--color-midnight-200)]">
            Fullstack Developer passionate about building modern web
            applications with clean, efficient, and scalable code.
          </p>

          <div className="hero-cta flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            
            <Link to="projects" spy={true} smooth={true} offset={-100} duration={500}  className="btn-secondary" aria-label="View Projects">
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
