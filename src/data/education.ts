import type { EducationItem } from "@/types";

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Science (B.Sc.) – Information Systems Management",
    institution: "Bharathiar University",
    college: "Sri Krishna Arts and Science College (Autonomous)",
    period: "2023 – 2026",
    location: "Coimbatore, Tamil Nadu, India",

    coursework: [
      "Data Analytics",
      "Business Intelligence",
      "Database Management Systems",
      "Python Programming",
      "SQL",
      "Software Engineering",
      "Business Analytics",
      "Management Information Systems",
    ],

    achievements: [
      "Successfully completed multiple academic projects in Data Analytics and Automation.",
      "Developed an end-to-end automation solution as the final year project.",
      "Built practical experience using Python, SQL, Power BI, n8n, Selenium, and FastAPI.",
    ],

    finalYearProject: {
      title: "Automated Order Processing System for Zepto using n8n",
      summary:
        "Designed and developed an intelligent automation system capable of searching, identifying, and adding products to the Zepto cart automatically using Python, Selenium, FastAPI, and n8n. The project focused on reducing manual effort while maintaining high product selection accuracy.",
      stack: [
        "Python",
        "n8n",
        "Selenium",
        "FastAPI",
        "Playwright",
      ],
      outcome:
        "Successfully demonstrated as a production-ready final year automation project.",
      link: "https://github.com/siva-progy",
    },
  },
];