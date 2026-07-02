"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Dark-first theme provider. Wraps next-themes with our defaults:
 * class-based switching, dark as the default, system preference respected
 * only if the user hasn't chosen. Hydration-safe (no flash) because
 * next-themes injects a blocking script before paint.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
