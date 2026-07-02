"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface FloatingFieldProps {
  label: string;
  name: string;
  type?: "text" | "email";
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  required?: boolean;
  /** Validation error message; shown when present. */
  error?: string;
  /** Render a multi-line textarea. */
  multiline?: boolean;
  rows?: number;
  autoComplete?: string;
}

/**
 * Floating-label field. The label sits inside the field and floats up on
 * focus or when filled (CSS-driven via :focus and :not(:placeholder-shown),
 * so it behaves correctly even before hydration). Elegant focus ring and an
 * accessible error message wired with aria-describedby/aria-invalid.
 */
export function FloatingField({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  required,
  error,
  multiline,
  rows = 5,
  autoComplete,
}: FloatingFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  const fieldClasses = cn(
    "peer w-full rounded-lg border bg-surface/60 px-4 pt-6 pb-2 text-body text-text",
    "backdrop-blur-sm transition-colors placeholder-transparent",
    "focus-visible:outline-none",
    error
      ? "border-red-400/60 focus:border-red-400"
      : "border-border focus:border-accent/60",
  );

  const labelClasses = cn(
    "pointer-events-none absolute left-4 text-muted transition-all duration-200",
    // Resting (empty): centered-ish; Floated (focus or filled): small, top.
    "top-4 text-body",
    "peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:tracking-wide",
    "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[0.7rem]",
    error ? "peer-focus:text-red-400" : "peer-focus:text-accent",
  );

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          required={required}
          rows={rows}
          placeholder={label}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(fieldClasses, "resize-none")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          required={required}
          autoComplete={autoComplete}
          placeholder={label}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={fieldClasses}
        />
      )}
      <label htmlFor={id} className={labelClasses}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {error && (
        <p id={errorId} className="mt-1.5 pl-1 text-caption text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
