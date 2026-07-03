import type { Project } from "@/types";
export const projects: Project[] = [
  {
    slug: "zepto-order-automation",

    title: "Automated Order Processing System for Zepto using n8n",

    summary:
      "An intelligent automation system that searches products on Zepto, identifies the exact product, and automatically adds it to the cart using n8n, Python, Selenium, and FastAPI.",

    overview:
      "This project was developed to automate the online grocery ordering process on Zepto. The system receives a product request, launches an automated browser session, searches for the requested product, identifies the correct item among multiple similar products, and adds it to the cart without manual intervention. The workflow is orchestrated using n8n with Python automation running through FastAPI.",

    problem:
      "Online grocery ordering involves repetitive manual searching and selecting products. Similar product names often cause incorrect selections, making automation difficult. The objective was to create a reliable workflow capable of accurately identifying and selecting the intended product.",

    research:
      "Different automation approaches were evaluated using Selenium, Playwright, and browser debugging techniques. Product matching strategies were tested to improve selection accuracy when multiple similar products appeared in search results.",

    solution:
      "A complete automation pipeline was developed where n8n triggers a FastAPI endpoint. Python Selenium controls the browser, searches for products, compares available search results, identifies the correct product using matching logic, adds it to the cart, captures execution logs, and returns the final status to n8n.",

    challenges:
      "The biggest challenge was handling multiple similar search results on Zepto. Dynamic page elements, changing selectors, loading delays, and browser synchronization required robust element detection, retry mechanisms, and fallback strategies.",

    learnings:
      "This project strengthened my skills in workflow automation, Python programming, Selenium browser automation, REST APIs, FastAPI development, debugging complex automation workflows, and integrating multiple technologies into a production-ready solution.",

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
        label: "Reduction in manual ordering time"
      },
      {
        value: "<30 sec",
        label: "Average automation execution"
      },
      {
        value: "100%",
        label: "Exact product identification target"
      }
    ],

    role: "Final Year Project",

    timeline: "2026",

    status: "Completed",

    image: "/images/projects/zepto-cover.png",

    imageAlt: "Zepto Order Automation Dashboard",

    architectureImage: "/images/projects/zepto-architecture.png",

    architectureAlt: "System Architecture Diagram",

    featured: true,

    links: {
      github: "https://github.com/siva-progy",
      live: ""
    }
  }
];

export const featuredProjects = projects.filter((p) => p.featured);

export const otherProjects = projects.filter((p) => !p.featured);