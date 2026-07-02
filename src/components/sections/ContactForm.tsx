"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import { FloatingField } from "@/components/ui/FloatingField";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { transitionStandard } from "@/animations/variants";
import { profile } from "@/data/profile";
import { contactContent } from "@/data/contact";

type Status = "idle" | "submitting" | "success" | "error";

interface Fields {
  name: string;
  email: string;
  message: string;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields) {
  const errors: Partial<Fields> = {};
  if (!f.name.trim()) errors.name = "Please add your name.";
  if (!f.email.trim()) errors.email = "Please add your email.";
  else if (!emailRe.test(f.email)) errors.email = "That email looks off.";
  if (!f.message.trim()) errors.message = "A short message helps.";
  return errors;
}

/** Encode form data for the Netlify Forms POST body. */
function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join("&");
}

/**
 * Premium contact form.
 *
 * Progressive enhancement:
 *  - The <form> has Netlify Forms detection handled via public/__forms.html and a
 *    hidden form-name input, so it works submitted natively even without JS.
 *  - With JS, we validate inline and POST to Netlify via fetch for a smooth
 *    in-place success animation (no page reload).
 *  - A mailto: link is always offered as a fallback path.
 */
export function ContactForm() {
  const reduced = useReducedMotion();
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof Fields) => (v: string) =>
    setFields((prev) => ({ ...prev, [key]: v }));

  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    "Portfolio enquiry",
  )}&body=${encodeURIComponent(fields.message)}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    try {
      // POST to the static detection file (public/__forms.html) — required
      // by @netlify/plugin-nextjs; posting to "/" is not reliably detected.
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": contactContent.formName, ...fields }),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <GlassPanel className="p-7 sm:p-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={transitionStandard}
            className="flex min-h-[22rem] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={reduced ? {} : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent-muted text-accent"
            >
              <CheckCircle2 size={32} aria-hidden="true" />
            </motion.span>
            <h3 className="text-h3 font-semibold text-text">Message sent</h3>
            <p className="mt-2 max-w-[32ch] text-body text-muted">
              Thanks for reaching out — I&apos;ll get back to you soon.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            name={contactContent.formName}
            method="POST"
            action={mailtoHref}
            onSubmit={handleSubmit}
            initial={false}
            className="flex flex-col gap-5"
            noValidate
          >
            {/*
              Netlify Forms detection lives in public/__forms.html (the
              @netlify/plugin-nextjs adapter cannot detect JSX-rendered forms,
              and JSX detection attributes now break the build). With JS
              enabled, handleSubmit intercepts and POSTs to that file. With JS
              disabled, this form falls back to the mailto: action below.
            */}
            <input type="hidden" name="form-name" value={contactContent.formName} />
            <p className="hidden">
              <label>
                Don&apos;t fill this out: <input name="bot-field" />
              </label>
            </p>

            <FloatingField
              label="Name"
              name="name"
              value={fields.name}
              onChange={set("name")}
              onBlur={() => setErrors(validate(fields))}
              required
              error={errors.name}
              autoComplete="name"
            />
            <FloatingField
              label="Email"
              name="email"
              type="email"
              value={fields.email}
              onChange={set("email")}
              onBlur={() => setErrors(validate(fields))}
              required
              error={errors.email}
              autoComplete="email"
            />
            <FloatingField
              label="Message"
              name="message"
              value={fields.message}
              onChange={set("message")}
              onBlur={() => setErrors(validate(fields))}
              required
              error={errors.message}
              multiline
            />

            {status === "error" && (
              <p className="text-caption text-red-400" role="alert">
                Something went wrong sending that. You can{" "}
                <a href={mailtoHref} className="underline hover:text-accent">
                  email me directly
                </a>{" "}
                instead.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-6 font-semibold text-[#04121b] transition-colors hover:bg-accent-hover disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <Send size={17} aria-hidden="true" />
                </>
              )}
            </button>

            <p className="text-center text-caption text-subtle">
              Prefer email?{" "}
              <a href={mailtoHref} className="text-muted underline hover:text-accent">
                {profile.email}
              </a>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </GlassPanel>
  );
}
