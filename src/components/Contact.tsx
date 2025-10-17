"use client";

import { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const root = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-card", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 85%" },
      });

      gsap.from(".contact-title", {
        y: 18,
        opacity: 0,
        duration: 0.8,
        delay: 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 90%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  function validate() {
    const e: typeof errors = {};
    if (!values.name.trim()) e.name = "Please enter your name.";
    if (!values.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Enter a valid email.";
    if (!values.message.trim() )
      e.message = "Message should be at least 8 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (!validate()) return;

    setLoading(true);

    await new Promise((r) => setTimeout(r, 900));

    // On success:
    setLoading(false);
    setSent(true);

    setValues({ name: "", email: "", message: "" });

    setTimeout(() => {
      setSent(false);
    }, 3500);
  }

  return (
    <section
      id="contact"
      ref={root}
      className="section relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="contact-title text-3xl sm:text-4xl md:text-5xl font-heading font-semibold mb-2
            bg-gradient-to-r from-[#7c3aed] to-[#ec4899] bg-clip-text text-transparent text-center"
        >
          Get in touch
        </h2>

        <p className="text-[var(--color-midnight-200)] mb-8 text-center">
          Reach out for collaboration, job opportunities, or just to talk code.
        </p>

        <div className="contact-card relative rounded-2xl overflow-hidden p-1">
          {/* Outer gradient border */}
          <div
            aria-hidden
            className="absolute -inset-0.5 rounded-2xl blur-lg opacity-60"
            style={{
              background:
                "linear-gradient(90deg, rgba(124,58,237,0.15), rgba(236,72,153,0.12))",
              zIndex: -2,
            }}
          />

          {/* Inner glass panel */}
          <div className="relative bg-[rgba(15,23,42,0.55)] backdrop-blur-md rounded-2xl p-6 md:p-8 z-10 border border-[rgba(255,255,255,0.04)]">
            {!sent ? (
              <form ref={formRef} onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm text-[var(--color-midnight-200)] mb-2 block">
                      Name
                    </label>
                    <Input
                      value={values.name}
                      onChange={(e) => setValues((s) => ({ ...s, name: e.target.value }))}
                      placeholder="Your name"
                      className="bg-[rgba(255,255,255,0.02)]"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-400 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-[var(--color-midnight-200)] mb-2 block">
                      Email
                    </label>
                    <Input
                      value={values.email}
                      onChange={(e) => setValues((s) => ({ ...s, email: e.target.value }))}
                      placeholder="your@email.com"
                      type="email"
                      className="bg-[rgba(255,255,255,0.02)]"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-[var(--color-midnight-200)] mb-2 block">
                      Message
                    </label>
                    <Textarea
                      value={values.message}
                      onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
                      placeholder="Tell me about your project or opportunity..."
                      className="min-h-[120px] bg-[rgba(255,255,255,0.02)]"
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-400 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white shadow-lg"
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </div>

                    <div className="text-sm text-[var(--color-midnight-200)]">
                      <span className="opacity-70">{"I'll reply ASAP."}</span>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-8"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#ec4899] flex items-center justify-center shadow-xl">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Message sent</h3>
                <p className="text-[var(--color-midnight-200)] text-center">
                  {"Thanks — I’ll get back to you soon. If it's urgent, email me directly at"}{" "}
                  <a
                    href="mailto:contact.shahadat.rifat@gmail.com"
                    className="text-white underline"
                  >
                    contact.shahadat.rifat@gmail.com
                  </a>
                  .
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      
    </section>
  );
}
