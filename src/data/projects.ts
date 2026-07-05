import type { Project } from "@/types";
export const projects: Project[] = [
  {
    slug: "zepto-order-automation",

    title: 
      "Intelligent Grocery Order Automation Platform",

    summary:
      "Developed an intelligent workflow automation system that searches, validates, and processes grocery orders on Zepto using n8n, Python, Selenium, and FastAPI, significantly reducing manual effort and improving ordering accuracy.",

    overview:
      "Designed and developed an end-to-end workflow automation platform that automates grocery ordering on Zepto. The system receives product requests, launches a browser session, identifies the correct product from multiple search results, adds it to the cart, and returns the execution status through an automated workflow orchestrated with n8n and FastAPI.",

    problem:
      "Manual online grocery ordering is repetitive and prone to human error, especially when multiple products have similar names. The objective was to automate product selection while maintaining high accuracy and minimizing execution time.",
    
    research:
      "Different automation approaches were evaluated using Selenium, Playwright, and browser debugging techniques. Product matching strategies were tested to improve selection accuracy when multiple similar products appeared in search results.",

    solution:
      "Built an automation pipeline where n8n orchestrates the workflow, FastAPI exposes REST endpoints, and Python Selenium performs browser automation. The system validates search results, selects the correct product using custom matching logic, updates the shopping cart, captures execution logs, and returns automation status in real time.",

    challenges:
      "The biggest challenge was handling multiple similar search results on Zepto. Dynamic page elements, changing selectors, loading delays, and browser synchronization required robust element detection, retry mechanisms, and fallback strategies.",

    learnings:
      "Strengthened practical skills in workflow automation, REST API integration, browser automation, debugging, automation reliability, and full-stack system integration while building a production-ready solution.",

    stack: [
      "Python",
      "Selenium",
      "n8n",
      "FastAPI",
      "Playwright",
      "Chrome DevTools",
      "REST API"
    ],

    metrics: [
      {
        value: "96%",
        label: "Reduction in manual effort"
      },
      {
        value: "<30 sec",
        label: "Average order completion"
      },
      {
        value: "100%",
        label: "Target product accuracy"
      }
    ],

    role: "Developer & Automation Engineer",

    timeline: "2026",

    status: "Completed",

    image: "/images/projects/zepto-cover.png",

    imageAlt: "Zepto Order Automation Dashboard",

    architectureImage: "/images/projects/zepto-architecture.png",

    architectureAlt: "System Architecture Diagram",

    featured: true,

    links: {
  github: "https://github.com/siva-progy",
  video:"https://www.youtube.com/watch?v=TZ0cfVFx8Ec"
  }
  }
];

export const featuredProjects = projects.filter((p) => p.featured);

export const otherProjects = projects.filter((p) => !p.featured);