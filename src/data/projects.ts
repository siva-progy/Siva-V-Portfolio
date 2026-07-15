import type { Project } from "@/types";
export const projects: Project[] = [
  {
    slug: "zepto-order-automation",

    title: 
      "Intelligent Grocery Order Automation Platform",

    summary:
      "Developed an intelligent workflow automation system that searches, validates, and processes grocery orders on Zepto using n8n, Python, Selenium, and FastAPI, significantly reducing manual effort and improving ordering accuracy.",
      
    overview:
      "This project automates the online grocery ordering workflow by integrating n8n, FastAPI, and Selenium. The system receives a product request, searches Zepto, accurately identifies the intended product from multiple similar results, adds it to the cart, and returns the execution status without requiring manual interaction.",

    problem:
      "Manual online grocery ordering is repetitive and prone to human error, especially when multiple products have similar names. The objective was to automate product selection while maintaining high accuracy and minimizing execution time.",
    
    research:
      "Different automation approaches were evaluated using Selenium, Playwright, and browser debugging techniques. Product matching strategies were tested to improve selection accuracy when multiple similar products appeared in search results.",

    solution:
      "Designed a modular automation workflow where n8n orchestrates the process, FastAPI exposes the automation service, and Selenium controls browser interactions. The system validates product search results, identifies the correct item using matching logic, adds it to the cart, captures execution logs, and returns the final status through an API response.",

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

    image: "/projects/zepto-cover.png",

    imageAlt: "Zepto Order Automation Dashboard",

    architectureImage: "/projects/zepto-architecture.png",

    architectureAlt: "System Architecture Diagram",

    featured: true,

   links: {
  github: "https://github.com/siva-progy/Zepto-Order-Automation",
  video: "https://www.youtube.com/watch?v=TZ0cfVFx8Ec"
  }
  }
];

export const featuredProjects = projects.filter((p) => p.featured);

export const otherProjects = projects.filter((p) => !p.featured);