"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Code2, Sparkles, Globe2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      tl.from(".about-title", { y: 20, opacity: 0, delay: 0.05 }) 
        .from(".about-line", {
          scaleX: 0,
          opacity: 0,
          transformOrigin: "left center",
        })
        .from(".about-text", { y: 20, opacity: 0 })
        .from(".about-card", {
          y: 40,
          opacity: 0,
          stagger: 0.12,
        });
    }, root);

    return () => ctx.revert();
  }, []);

  const cards = [
  {
    icon: Code2,
    color: "text-[var(--color-indigo-accent)]",
    title: "Web Development",
    text: "From front-end design to backend APIs, I build scalable, intuitive digital experiences with clean and maintainable code.",
  },
  {
    icon: GraduationCap,
    color: "text-[var(--color-violet-accent)]",
    title: "Education",
    text: "Studying International Economics & Trade with a focus on technology, supply chain, and web systems integration.",
  },
  {
    icon: Sparkles,
    color: "text-[var(--color-indigo-accent)]",
    title: "Side Interests",
    text: "UI design, animation, minimalist fashion — and beyond the screen, I love hitting the gym, staying active, and getting lost in good music.",
  },
  {
    icon: Globe2,
    color: "text-[var(--color-violet-accent)]",
    title: "Beyond Tech",
    text: "I’m fascinated by branding, design thinking, and how technology shapes real-world business innovation.",
  },
];


  return (
    <section
      id="about"
      ref={root}
      className="section relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col lg:flex-row items-start justify-between gap-16"
    >
      {/* Left Column — Text Content */}
      <div className="flex-1 max-w-2xl mx-auto text-center lg:text-left">
        <h2
          className="about-title text-3xl sm:text-4xl md:text-5xl font-heading font-semibold tracking-tight mb-3
          bg-gradient-to-r from-[var(--color-indigo-accent)] to-[var(--color-violet-accent)]
          bg-clip-text text-transparent"
        >
          About Me
        </h2>

        <div className="about-line h-[3px] w-20 sm:w-24 mx-auto lg:mx-0 bg-gradient-to-r from-[var(--color-indigo-accent)] to-[var(--color-violet-accent)] rounded-full mb-6 sm:mb-8"></div>

        <p className="about-text text-[var(--color-midnight-200)] text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
          I’m <span className="font-semibold text-white">Shahadat</span> — passionate about crafting
          clean, modern, and performant web applications using the{" "}
          <span className="text-[var(--color-indigo-accent)] font-medium">MERN stack</span>. I love
          designing aesthetic UI interactions powered by{" "}
          <span className="text-[var(--color-violet-accent)] font-medium">GSAP</span> and exploring
          technologies that push the boundaries of user experience.
        </p>
      </div>

      {/* Right Column — Cards */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto lg:mx-0">
        {cards.map(({ icon: Icon, color, title, text }, i) => (
          <motion.div
            key={i}
            whileHover={{
              rotateX: 4,
              rotateY: -4,
              scale: 1,
              boxShadow: "0 10px 25px rgba(99,102,241,0.25)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="about-card group relative"
          >
            {/* Animated Gradient Border Glow */}
            <div className="absolute -inset-[1px] rounded-lg bg-[conic-gradient(var(--color-indigo-accent),var(--color-violet-accent),var(--color-indigo-accent))] animate-spin-slow opacity-40 blur-[6px]" />

            <Card
              className="relative bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] backdrop-blur-md
              hover:border-[var(--color-indigo-accent)] transition-all duration-300 h-full overflow-hidden"
            >
              <CardContent className="relative p-6 flex flex-col items-start space-y-4 text-left z-10">
                {/* Icon rotates when parent card is hovered */}
                <motion.div
                  className="transition-transform duration-300 group-hover:rotate-12"
                >
                  <Icon className={`w-8 h-8 ${color}`} />
                </motion.div>

                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="text-[var(--color-midnight-200)] text-sm leading-relaxed">{text}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
