"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Mail, Briefcase, Download, Circle } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { CopyButton } from "@/components/ui/CopyButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ContactForm } from "./ContactForm";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { profile, socials } from "@/data/profile";
import { contactContent } from "@/data/contact";

/**
 * Contact — the premium closing section before the footer.
 *
 * Left: closing message, availability, current role, location, email (with
 * copy button), social links, and a magnetic resume button.
 * Right: the premium contact form (glass, floating labels, validation,
 * success animation, mailto fallback).
 *
 * A soft mouse glow and gentle scroll parallax add calm depth.
 */
export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const leftY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <Section
      id="contact"
      index="06"
      eyebrow="Contact"
      title={contactContent.heading}
      lead={contactContent.message}
      width="content"
      className="relative overflow-hidden"
    >

      <div
        ref={ref}
        className="relative z-10 grid gap-10 lg:grid-cols-2 lg:gap-16"
      >
        {/* Left — details */}
        <motion.div style={reduced ? undefined : { y: leftY }}>
          <Reveal className="flex flex-col gap-8">
            {/* Availability + role */}
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-accent">
                <Circle
                  size={9}
                  className="fill-accent"
                  aria-hidden="true"
                />
                <span className="text-body font-medium">
                  {contactContent.availability}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted">
                <Briefcase size={16} aria-hidden="true" />
                <span className="text-body">{contactContent.currentRole}</span>
              </div>
              <div className="flex items-center gap-2 text-muted">
                <MapPin size={16} aria-hidden="true" />
                <span className="text-body">{profile.location}</span>
              </div>
            </div>

            {/* Email with copy */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-caption uppercase tracking-[0.12em] text-subtle">
                Email
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-body-lg text-text transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Mail size={18} aria-hidden="true" />
                  {profile.email}
                </a>
                <CopyButton value={profile.email} label="Copy email" />
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-caption uppercase tracking-[0.12em] text-subtle">
                Elsewhere
              </span>
              <SocialLinks links={socials} />
            </div>

            {/* Magnetic resume button */}
            <MagneticButton
              href={profile.resumeUrl}
              external
              className="h-12 self-start rounded-md bg-surface px-6 font-semibold text-text surface-raise transition-colors hover:bg-surface-2"
            >
              <Download size={18} aria-hidden="true" />
              Download Resume
            </MagneticButton>
          </Reveal>
        </motion.div>

        {/* Right — form */}
        <motion.div style={reduced ? undefined : { y: rightY }}>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </motion.div>
      </div>
    </Section>
  );
}
