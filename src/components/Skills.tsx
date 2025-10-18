"use client";

import { useRef, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Skill = { id: string; name: string; file: string };

const frontend: Skill[] = [
  { id: "html", name: "HTML", file: "/html-1.svg" },
  { id: "css", name: "CSS", file: "/css.svg" },
  { id: "js", name: "JavaScript", file: "/javascript.svg" },
  { id: "react", name: "React", file: "/react.svg" },
  { id: "next", name: "Next.js", file: "/next.svg" },
  { id: "tailwind", name: "Tailwind CSS", file: "/tailwind.svg" },
  { id: "shadcn", name: "shadcn/ui", file: "/shadcn.svg" },
  { id: "state", name: "Router", file: "/react-router.svg" },
  { id: "context", name: "Context", file: "/context-api.svg" },
  { id: "redux", name: "Redux", file: "/redux.svg" },
];

const backend: Skill[] = [
  { id: "node", name: "Node.js", file: "/nodejs.svg" },
  { id: "express", name: "Express.js", file: "/expressjs.svg" },
  { id: "socketio", name: "Socket.io", file: "/socket-io.svg" },
  { id: "jwt", name: "JWT", file: "/jwt.svg" },
  { id: "nodemon", name: "Nodemon", file: "/nodemon.svg" },
];

const tools: Skill[] = [
  { id: "mongodb", name: "MongoDB", file: "/mongodb.svg" },
  { id: "prisma", name: "Prisma", file: "/prisma.svg" },
  { id: "firebase", name: "Firebase", file: "/firebase.svg" },
  { id: "docker", name: "Docker", file: "/docker.svg" },
];

export default function Skills() {
  const root = useRef<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState("frontend");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!root.current || !isClient) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 640px)", () => {
      // Set initial visible state to prevent blank screen
      gsap.set(".skills-title", { opacity: 1, y: 0 });
      gsap.set(".skills-line", { opacity: 1, scaleX: 1 });
      gsap.set(".skill-card", { opacity: 1, y: 0 });

      gsap.fromTo(".skills-title",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: root.current, 
            start: "top 85%",
            toggleActions: "play none none none"
          },
        }
      );

      gsap.fromTo(".skills-line",
        { scaleX: 0, opacity: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: root.current, 
            start: "top 85%",
            toggleActions: "play none none none"
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".skill-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power4.out",
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, [isClient]);

  const panelVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
  } as const;

  const getGradient = (category: string) => {
    switch (category) {
      case "frontend":
        return "from-[var(--color-indigo-accent)] to-[var(--color-violet-accent)]";
      case "backend":
        return "from-[var(--color-violet-accent)] to-[var(--color-rose-accent)]";
      case "tools":
        return "from-[var(--color-green-accent)] to-[var(--color-teal-accent)]";
      default:
        return "from-[var(--color-indigo-accent)] to-[var(--color-violet-accent)]";
    }
  };

  const SkillGrid = ({
    list,
    category,
  }: {
    list: Skill[];
    category: string;
  }) => (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
    >
      {list.map((s) => (
        <SkillCard key={`${category}-${s.id}`} skill={s} category={category} />
      ))}
    </motion.div>
  );

  const SkillCard = ({
    skill,
    category,
  }: {
    skill: Skill;
    category: string;
  }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [targetCoords, setTargetCoords] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
      let animationFrame: number;
      const animate = () => {
        setCoords((prev) => ({
          x: prev.x + (targetCoords.x - prev.x) * 0.1,
          y: prev.y + (targetCoords.y - prev.y) * 0.1,
        }));
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [targetCoords]);

    const handleMouseMove = (e: React.MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      setTargetCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="skill-card relative group [perspective:600px] overflow-hidden"
      >
        {/* Subtle animated border glow */}
        <div
          className={`absolute inset-0 rounded-xl opacity-40 blur-sm animate-border-glow 
          bg-gradient-to-r ${getGradient(category)} pointer-events-none`}
        />

        {/* Magnetic Glow following cursor */}
        {isHovering && (
          <motion.div
            className={`absolute w-24 h-24 rounded-full blur-2xl opacity-30 pointer-events-none bg-gradient-to-r ${getGradient(
              category
            )}`}
            style={{
              left: coords.x - 48,
              top: coords.y - 48,
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Card body */}
        <div
          className="relative z-10 flex flex-col items-center gap-3 p-4 rounded-xl
          bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)]
          hover:border-[var(--color-indigo-accent)] transition-all duration-300"
        >
          <motion.div
            whileHover={{ rotate: 12, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center"
          >
            <Image
              src={skill.file}
              alt={skill.name}
              width={56}
              height={56}
              className="object-contain select-none"
              priority
            />
          </motion.div>

          <span className="text-sm md:text-base text-[var(--color-midnight-100)]">
            {skill.name}
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="skills"
      ref={root}
      className="section relative container mx-auto px-4 sm:px-6 lg:px-8 ppy-20 md:py-28"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className="skills-title text-3xl sm:text-4xl md:text-5xl font-heading font-semibold mb-2
          bg-gradient-to-r from-[var(--color-indigo-accent)] to-[var(--color-violet-accent)]
          bg-clip-text text-transparent"
        >
          Skills & Tools
        </h2>

        <div
          className="skills-line h-[3px] w-20 sm:w-28 mx-auto rounded-full mb-6
          bg-gradient-to-r from-[var(--color-indigo-accent)] to-[var(--color-violet-accent)]"
        />

        <p className="text-[var(--color-midnight-200)] mb-10 max-w-xl mx-auto">
          Tools and technologies I use to bring ideas to life — from sleek
          frontends to powerful backend systems.
        </p>

        <Tabs
          defaultValue="frontend"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList
            className="mb-8 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]
            rounded-lg p-1 flex justify-center flex-wrap gap-2"
          >
            {["frontend", "backend", "tools"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="transition-all duration-300 hover:text-[var(--color-indigo-accent)] hover:scale-105"
              >
                {tab === "frontend"
                  ? "Frontend"
                  : tab === "backend"
                  ? "Backend & Auth"
                  : "Database & Tools"}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="min-h-[240px]">
            <AnimatePresence mode="wait">
              {activeTab === "frontend" && (
                <SkillGrid key="frontend" list={frontend} category="frontend" />
              )}
              {activeTab === "backend" && (
                <SkillGrid key="backend" list={backend} category="backend" />
              )}
              {activeTab === "tools" && (
                <SkillGrid key="tools" list={tools} category="tools" />
              )}
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </section>
  );
}