import type { Project } from "@/types";

/**
 * =========================================================================
 * PROJECTS CONTENT — the portfolio centerpiece. Edit this file to add,
 * remove, or reorder projects; the UI is fully data-driven.
 *
 * All content is [PLACEHOLDER] material written for a Data Analyst /
 * Finance profile (Siva Suburamaniyam V). Replace with real projects.
 *
 * - `featured: true`  → rendered as a large alternating case study.
 * - `featured: false` → rendered as a compact card in the "More work" grid.
 *
 * Images: drop files in public/images/projects/ and update paths. Until
 * then the UI shows a graceful placeholder (no broken image).
 * =========================================================================
 */

export const projects: Project[] = [
  {
    slug: "revenue-forecasting-model",
    title: "Revenue Forecasting Model",
    summary:
      "A forecasting workflow that turned scattered sales exports into a rolling revenue projection stakeholders could trust.",
    overview:
      "[PLACEHOLDER] A monthly revenue-forecasting model built from historical sales data, designed to give a small finance team a reliable forward view without a heavyweight BI stack. The goal was decision-readiness: numbers a manager could open on Monday and act on.",
    problem:
      "[PLACEHOLDER] Forecasts lived in one-off spreadsheets that were rebuilt from scratch each month. They were slow to produce, hard to audit, and disagreed with each other — so nobody fully trusted them.",
    research:
      "[PLACEHOLDER] I profiled two years of sales exports to understand seasonality and data-quality issues, compared naive, moving-average, and regression baselines, and interviewed the finance lead to learn which errors actually hurt decisions (under-forecasting revenue was costlier than over-forecasting).",
    solution:
      "[PLACEHOLDER] A repeatable pipeline: cleaned and normalised the source data, engineered seasonal features, and fit a transparent regression the team could reason about. Output flowed into a single dashboard with scenario toggles and clearly labelled assumptions.",
    challenges:
      "[PLACEHOLDER] Inconsistent product naming across exports broke joins; I built a mapping layer to reconcile them. Balancing model accuracy against explainability meant choosing a simpler model the team could defend over a black-box with marginally better error.",
    learnings:
      "[PLACEHOLDER] A forecast is only as useful as its adoption. The reconciliation layer and clear assumptions mattered more to trust than squeezing out the last point of accuracy.",
    stack: ["Python", "pandas", "scikit-learn", "SQL", "Power BI"],
    metrics: [
      { value: "~30%", label: "less time to produce monthly forecast" },
      { value: "2 yrs", label: "of history modelled" },
      { value: "1", label: "single source of truth" },
    ],
    role: "Solo — analysis, modelling & reporting",
    timeline: "4 weeks · 2025",
    status: "Completed",
    image: "/images/projects/revenue-forecasting.jpg",
    imageAlt:
      "Placeholder cover for the Revenue Forecasting Model case study.",
    architectureImage: "/images/projects/revenue-forecasting-arch.jpg",
    architectureAlt:
      "Placeholder data pipeline diagram: sources to cleaning to model to dashboard.",
    featured: true,
    links: {
      github: "https://github.com/",
      live: "https://example.com/",
    },
  },
  {
    slug: "expense-anomaly-dashboard",
    title: "Expense Anomaly Dashboard",
    summary:
      "An interactive dashboard that surfaces unusual spend patterns before they become month-end surprises.",
    overview:
      "[PLACEHOLDER] A monitoring dashboard that flags anomalous expense transactions in near-real-time, giving finance a chance to investigate outliers early rather than during the close.",
    problem:
      "[PLACEHOLDER] Expense review happened only at month-end, so errors and unusual charges were caught late — when they were expensive and slow to unwind.",
    research:
      "[PLACEHOLDER] I analysed historical expense distributions per category to define what 'normal' looked like, and tested simple statistical thresholds (z-score, IQR) against a labelled sample of past issues to tune sensitivity.",
    solution:
      "[PLACEHOLDER] A tidy data model feeding an interactive dashboard with category-level anomaly flags, drill-downs, and a watchlist. Reviewers get a ranked list instead of a raw ledger.",
    challenges:
      "[PLACEHOLDER] Too-sensitive thresholds buried reviewers in false positives. I iterated with the team on per-category tolerances to keep the signal high and the noise low.",
    learnings:
      "[PLACEHOLDER] Anomaly detection lives or dies on false-positive rate. Designing for the reviewer's attention was as important as the statistics.",
    stack: ["SQL", "Power BI", "Excel", "DAX"],
    metrics: [
      { value: "Early", label: "outlier detection vs. month-end" },
      { value: "Ranked", label: "review queue, not a raw ledger" },
    ],
    role: "Solo — data modelling & dashboard",
    timeline: "3 weeks · 2025",
    status: "Completed",
    image: "/images/projects/expense-anomaly.jpg",
    imageAlt: "Placeholder cover for the Expense Anomaly Dashboard case study.",
    featured: true,
    links: {
      github: "https://github.com/",
    },
  },
  {
    slug: "market-data-explorer",
    title: "Market Data Explorer",
    summary:
      "A lightweight tool to pull, clean, and visualise public market data for quick exploratory analysis.",
    overview:
      "[PLACEHOLDER] A small exploratory tool for fetching and charting public market data — built to speed up the first-look phase of any finance analysis.",
    stack: ["Python", "pandas", "Plotly"],
    role: "Solo",
    timeline: "2025",
    status: "Ongoing",
    image: "/images/projects/market-data-explorer.jpg",
    imageAlt: "Placeholder cover for the Market Data Explorer project.",
    featured: false,
    links: {
      github: "https://github.com/",
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
