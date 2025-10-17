"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    gsap.from(footerRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      },
    });
  }, []);

  const links = [
    { icon: Github, href: "https://github.com/shahadatrifat" },
    { icon: Linkedin, href: "www.linkedin.com/in/shahadat-rifat" },
    { icon: Twitter, href: "https://x.com/yourxhandle" },
    { icon: Mail, href: "mailto:contact.shahadat.rifat@gmail.com" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative mt-24 py-10 border-t border-[rgba(255,255,255,0.1)] text-center overflow-hidden"
    >
      {/* subtle gradient glow line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#7c3aed] via-[#ec4899] to-[#7c3aed]" />

      {/* social icons */}
      <div className="flex justify-center gap-6 mb-6">
        {links.map(({ icon: Icon, href }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2 transition-transform duration-300 hover:scale-110"
          >
            <Icon
              className="w-6 h-6 text-[var(--color-midnight-100)] transition-colors duration-300 
              group-hover:text-[var(--color-violet-accent)]"
            />
          </a>
        ))}
      </div>

      {/* name + copyright */}
      <p className="text-sm text-[var(--color-midnight-200)] tracking-wide">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">
          Shahadat Hossain Rifat
        </span>
        . All rights reserved.
      </p>

      {/* faint glow backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[rgba(139,92,246,0.05)] to-transparent pointer-events-none" />
    </footer>
  );
}
