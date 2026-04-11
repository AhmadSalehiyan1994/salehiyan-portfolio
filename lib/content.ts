const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.salehiyan.com").replace(/\/$/, "");

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  domain: string;
  description: string;
  problem: string;
  role: string;
  outcome: string;
  timeline: string;
  impactLabel: string;
  image: string;
  imageAlt: string;
  stack: string[];
  deliverables: string[];
  proofPoints: string[];
  links?: ProjectLink[];
};

export type ExperienceItem = {
  role: string;
  organization: string;
  period: string;
  summary: string;
};

export type InsightStatus = "published" | "draft";

export type Insight = {
  slug: string;
  title: string;
  domain: string;
  description: string;
  status: InsightStatus;
  featured: boolean;
  publishedAt?: string;
};

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  focus?: string;
  advisor?: string;
  link?: string;
};

export const siteContent = {
  person: {
    name: "Ahmad Salehiyan",
    role: "Industrial Engineer and Data-Driven Problem Solver",
    shortBio:
      "I build analytical systems and practical automation that improve reliability, throughput, and decision quality.",
    location: "Stillwater, Oklahoma, USA",
    timeZone: "America/Chicago",
    typicalResponseTime: "Usually replies within 24 hours",
    email: "ahmad@salehiyan.com",
    phone: "+1 405 269 3549",
    linkedin: "https://www.linkedin.com/in/ahmad-salehiyan",
    github: "https://github.com/ahmadsalehiyan",
    website: siteUrl,
    telegram: "https://t.me/AhmadSalehiyan",
    whatsapp: "https://wa.me/14052693549",
    cvPath: "/cv",
    image: "/images/first.png",
    imageAlt: "Ahmad Salehiyan - Industrial Engineer",
  },
  hero: {
    tagline: "From operational complexity to measurable clarity",
    valueProposition:
      "I help reliability and operations teams build analytics, optimization, and decision-support systems that improve planning quality and maintenance performance.",
    audienceLine: "For reliability leaders, operations analysts, and industrial engineering teams.",
    specialties: ["Reliability Engineering", "Optimization Modeling", "Analytics & Reporting"],
    availabilityMessage: "Open to projects in maintenance systems, operational analytics, and decision-support optimization.",
  },
  metrics: [
    {
      label: "KPI visibility improvement",
      value: "+40%",
      note: "From reporting architecture and KPI standardization work",
    },
    {
      label: "Maintenance decision cycle speed",
      value: "2× faster",
      note: "By reducing manual reporting and clarifying escalation signals",
    },
    {
      label: "Reporting consistency across teams",
      value: "+60%",
      note: "From shared definitions, templates, and repeatable outputs",
    },
    {
      label: "Issue-detection responsiveness",
      value: "Up to 70%",
      note: "Through earlier trend surfacing and structured review cadence",
    },
  ],
  trustStrip: [
    "PhD in Industrial Engineering & Management (Expected 2028) - Oklahoma State University",
    "M.Sc. Industrial Engineering (2019-2022) - K.N. Toosi University of Technology",
    "Focus areas - reliability, stochastic modeling, and industrial decision support",
  ],
  proofSignals: [
    {
      title: "Academic Depth",
      detail: "PhD research in reliability engineering and decision-focused analytics at Oklahoma State University.",
    },
    {
      title: "Applied Delivery",
      detail: "Portfolio work shaped around maintenance reporting, optimization models, and machine-learning pilots.",
    },
    {
      title: "Production Mindset",
      detail: "I translate research and technical methods into artifacts teams can review, reuse, and act on.",
    },
  ],
  projects: [
    {
      slug: "maintenance-reporting-system",
      title: "Maintenance Reporting System",
      domain: "Reliability & Operations",
      description:
        "Designed a structured reporting workflow to track maintenance performance and support planning decisions.",
      problem: "Maintenance information was fragmented across reports and spreadsheets, slowing root-cause analysis and planning quality.",
      role: "Designed the reporting structure, KPI logic, and dashboard-ready outputs used to translate raw work-order activity into management insight.",
      outcome:
        "Delivered a consistent reporting architecture that made recurring issues easier to identify and gave teams a clearer view of maintenance performance.",
      timeline: "2022 - 2023",
      impactLabel: "Structured KPI architecture for faster maintenance decisions",
      image: "/images/maintenance.jpg",
      imageAlt: "Maintenance reporting dashboard concept",
      stack: ["Reporting Workflows", "Data Structuring", "Operations Analytics"],
      deliverables: [
        "Maintenance KPI dictionary and reporting definitions",
        "Dashboard-ready data structure for periodic review",
        "Escalation logic for recurring issue visibility",
      ],
      proofPoints: [
        "Standardized maintenance performance reporting across stakeholders",
        "Shortened the path from raw work-order data to manager-ready insight",
        "Created a reusable reporting foundation for future dashboarding",
      ],
      links: [{ label: "View legacy archive", href: "/maintenance/ManagementReporting/" }],
    },
    {
      slug: "integer-programming-models",
      title: "Integer Programming for Planning Decisions",
      domain: "Optimization",
      description:
        "Implemented optimization models and decomposition workflows to structure complex planning and resource-allocation problems.",
      problem: "Complex planning decisions required formal optimization models rather than ad-hoc heuristics or spreadsheet-based reasoning.",
      role: "Built and documented model formulations, decomposition-based solution strategies, and reusable artifacts for future experiments and teaching.",
      outcome:
        "Produced a reusable optimization toolkit that clarifies how different formulations and decomposition methods support structured planning decisions.",
      timeline: "2021 - 2024",
      impactLabel: "Reusable decomposition-ready models for structured planning problems",
      image: "/images/INT.png",
      imageAlt: "Integer programming and optimization illustration",
      stack: ["GAMS", "Integer Programming", "Decomposition Methods"],
      deliverables: [
        "Integer model formulations in GAMS",
        "Worked examples for Benders, Branch-and-Bound, and Dantzig-Wolfe",
        "Reference materials for future planning studies and prototypes",
      ],
      proofPoints: [
        "Converted abstract planning questions into formal optimization models",
        "Documented multiple solution strategies side by side for comparison",
        "Created reference artifacts reusable for teaching and prototyping",
      ],
      links: [{ label: "View legacy archive", href: "/Integer%20Programming/" }],
    },
    {
      slug: "machine-learning-learning-path",
      title: "Machine Learning for Maintenance and Decision Support",
      domain: "Machine Learning",
      description:
        "Curated supervised, unsupervised, and reinforcement learning examples for practical industrial and decision-support use cases.",
      problem: "The available learning materials were fragmented, making it harder to connect machine-learning theory to real operational applications.",
      role: "Built examples, structured the learning path, and translated technical concepts into implementation-oriented notes for future predictive use cases.",
      outcome:
        "Created a practical machine-learning foundation that supports future predictive-maintenance pilots and gives collaborators a clearer starting point.",
      timeline: "2021 - 2024",
      impactLabel: "Practical ML reference track for predictive maintenance use cases",
      image: "/images/AI.jpg",
      imageAlt: "Machine learning concept visualization",
      stack: ["Python", "Supervised Learning", "Unsupervised Learning", "Reinforcement Learning"],
      deliverables: [
        "Supervised, unsupervised, and reinforcement learning examples",
        "Application notes for industrial and maintenance contexts",
        "Experiment-ready artifacts for teaching and prototyping",
      ],
      proofPoints: [
        "Bridged theory with operational use cases relevant to maintenance work",
        "Organized the content into a reusable learning path rather than disconnected examples",
        "Created a stronger base for future predictive-maintenance pilots",
      ],
      links: [{ label: "View legacy archive", href: "/Machin%20learning/" }],
    },
  ] as Project[],

  insights: [
    {
      slug: "machine-learning",
      title: "Machine Learning for Industrial Reliability: From Theory to Deployment",
      domain: "Machine Learning",
      description:
        "A deployment-focused guide to supervised, unsupervised, and reinforcement learning for reliability-centered operations.",
      status: "published",
      featured: true,
      publishedAt: "2024-03-15",
    },
    {
      slug: "integer-programming",
      title: "Integer Programming for High-Stakes Planning Decisions",
      domain: "Optimization",
      description:
        "How mixed-integer formulation quality and classical methods improve discrete planning, allocation, and scheduling outcomes.",
      status: "published",
      featured: true,
      publishedAt: "2024-02-10",
    },
    {
      slug: "maintenance-management",
      title: "Maintenance Management Systems That Scale with Operational Complexity",
      domain: "Reliability & Operations",
      description:
        "A practical framework for service-level-driven maintenance strategy, work-order quality, and CMMS-enabled execution.",
      status: "published",
      featured: true,
      publishedAt: "2024-01-18",
    },
    {
      slug: "maintenance-kpis",
      title: "Designing maintenance KPIs that actually influence decisions",
      domain: "Reliability & Operations",
      description: "How to structure KPIs so they drive actionable insights, not vanity metrics.",
      status: "draft",
      featured: false,
    },
    {
      slug: "decomposition-when",
      title: "When decomposition methods outperform direct optimization",
      domain: "Optimization",
      description: "Understanding when to use Benders, Dantzig-Wolfe, and other decomposition approaches.",
      status: "draft",
      featured: false,
    },
    {
      slug: "small-data-overfitting",
      title: "Avoiding overfitting in small industrial datasets",
      domain: "Machine Learning",
      description: "Practical techniques for building robust models with limited data.",
      status: "draft",
      featured: false,
    },
  ] as Insight[],
  experience: [
    {
      role: "PhD Candidate, Industrial Engineering",
      organization: "Oklahoma State University",
      period: "2023 - Present",
      summary:
        "Researching reliability engineering, stochastic modeling, and data-driven decision making. Advisor: Dr. Akash Deep.",
    },
    {
      role: "Data Analyst & Maintenance Specialist",
      organization: "Operations & Reliability Projects",
      period: "2020 - 2023",
      summary:
        "Designed maintenance reporting workflows, developed optimization models, and built analytics systems for operational reliability. Improved KPI visibility and decision quality.",
    },
  ] as ExperienceItem[],
  education: [
    {
      degree: "Ph.D. Industrial Engineering & Management (In Progress)",
      institution: "Oklahoma State University",
      period: "Expected 2028",
      focus: "Reliability Engineering, Stochastic Modeling, Data-Driven Decision Making",
      advisor: "Dr. Akash Deep",
      link: "https://ceat.okstate.edu/iem",
    },
    {
      degree: "M.Sc. Industrial Engineering (System Management & Productivity)",
      institution: "K.N. Toosi University of Technology",
      period: "2019 - 2022",
      focus: "Thesis: Predictive Maintenance of Advanced Industrial Machines Using AI Techniques",
      advisor: "Dr. Abdollah Aghaie",
    },
    {
      degree: "B.Sc. Industrial Engineering",
      institution: "Islamic Azad University, Qazvin Branch",
      period: "2015 - 2019",
      focus: "Industrial Systems & Operations",
    },
  ] as (EducationItem & { focus?: string; advisor?: string })[],
  certifications: [
    "Google Data Analytics Certificate",
    "Python Programming Certificate",
    "Machine Learning Certificate",
  ],
  skills: {
    languages: ["Python", "Julia", "R", "GAMS", "JavaScript", "HTML/CSS"],
    methods: ["Integer Programming", "Decomposition Methods", "Stochastic Modeling", "Machine Learning", "Data Analysis"],
    tools: ["GAMS", "Python (NumPy, Pandas, Scikit-Learn)", "Tableau", "Excel", "LaTeX"],
    specializations: ["Maintenance Planning", "Reliability Engineering", "Operations Analytics", "Predictive Modeling"],
  },
};

export function getProjectBySlug(slug: string) {
  return siteContent.projects.find((project) => project.slug === slug);
}
