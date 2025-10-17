"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { Button } from "./ui/button";
import { Menu, Plus } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import * as Dialog from "@radix-ui/react-dialog";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [iconRotation, setIconRotation] = useState(0);
  const [scrollDir, setScrollDir] = useState("up");
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIconRotation(isOpen ? 0 : 45);
  };

  // GSAP: Navbar slide-in on mount
  useEffect(() => {
    gsap.from(navRef.current, {
      y: -60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  // GSAP: Dynamic blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const blur = Math.min(scrollY / 100, 8);
      gsap.to(navRef.current, {
        backdropFilter: `blur(${blur}px)`,
        duration: 0.3,
      });

      // Determine scroll direction
      if (scrollY > lastScrollY.current && scrollY > 50) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }
      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP: Hamburger icon rotation
  useEffect(() => {
    gsap.to(".hamburger-icon", { rotation: iconRotation, duration: 0.3 });
  }, [iconRotation]);

  // GSAP: Staggered mobile links
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".mobile-link",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  // GSAP: Hide/show navbar based on scroll
  useEffect(() => {
    if (navRef.current) {
      if (scrollDir === "down") {
        gsap.to(navRef.current, { y: -100, duration: 0.5, ease: "power2.out" });
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.5, ease: "power2.out" });
      }
    }
  }, [scrollDir]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent p-4 shadow-md backdrop-blur-lg transition-transform"
    >
      <div className="container mx-auto flex justify-between items-center gap-2">
        {/* Logo / Name */}
        <h1 className="text-2xl font-heading font-semibold bg-gradient-to-r from-[var(--color-indigo-accent)] to-[var(--color-violet-accent)] text-transparent bg-clip-text tracking-tight">
          <Link to="home" smooth duration={500}>
            Shahadat
          </Link>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {["home", "about", "skills", "projects", "contact"].map((item) => (
            <Link
              key={item}
              to={item}
              smooth
              duration={500}
              offset={-80}
              className="nav-link"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            onClick={toggleMenu}
            className="text-white text-2xl hover:text-[var(--color-indigo-accent)] transition-all duration-300"
          >
            <span className="hamburger-icon">
              {isOpen ? <Plus size={30} /> : <Menu size={30} />}
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Dialog */}
      {isOpen && (
        <Dialog.Root open={isOpen} onOpenChange={toggleMenu}>
          <Dialog.Trigger />
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/70 data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut" />
            <Dialog.Content className="fixed inset-0 z-[9999] w-full h-full p-6 space-y-6 backdrop-blur-sm bg-[rgba(15,23,42,0.9)] text-white flex flex-col items-center justify-center overflow-y-auto">
              <Dialog.Title className="sr-only">
                Mobile Navigation Menu
              </Dialog.Title>

              <Dialog.Close asChild>
                <Button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 text-white text-3xl"
                  aria-label="Close menu"
                >
                  <span>✕</span>
                </Button>
              </Dialog.Close>

              {/* Animated Mobile Menu Links */}
              <motion.div
                className="space-y-6 w-full flex flex-col justify-center items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {["home", "about", "skills", "projects", "contact"].map(
                  (item) => (
                    <Link
                      key={item}
                      to={item}
                      smooth
                      duration={500}
                      offset={-80}
                      className="mobile-link text-white hover:text-[var(--color-indigo-accent)] cursor-pointer p-3 rounded-md w-full text-center"
                      onClick={toggleMenu}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                  )
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </nav>
  );
}
