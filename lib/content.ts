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
  highlights: string[];
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

export const siteMetadata = {
  "title": "Ahmad Salehiyan | Machine Learning and Decision-Making Under Uncertainty",
  "description": "Ph.D. researcher at Oklahoma State University working on machine learning, deep reinforcement learning, and stochastic optimization, with applications in health data analytics and engineering systems."
};

export const siteContent = {
  person: {
    name: "Ahmad Salehiyan",
    role: "Ph.D. Researcher in Industrial Engineering and Management",
    shortBio:
      "I am a Ph.D. researcher in Industrial Engineering and Management at Oklahoma State University (expected Summer 2027), with concurrent graduate training in Applied Statistics. My research combines machine learning, deep reinforcement learning, and stochastic optimization for data-driven decision-making under uncertainty. My published work includes an analysis of comorbidity and mortality patterns in the MIMIC-IV electronic health records dataset (179,524 adult patients) and transformer-based deep learning models in two peer-reviewed journals.",
    location: "Stillwater, Oklahoma, USA",
    timeZone: "America/Chicago",
    typicalResponseTime: "Usually replies within 24 hours",
    email: "ahmad@salehiyan.com",
    phone: "+1 (405) 269-3549",
    linkedin: "https://www.linkedin.com/in/ahmad-salehiyan",
    github: "https://github.com/ahmadsalehiyan",
    scholar: "https://scholar.google.com/citations?user=_-hRiskAAAAJ",
    website: siteUrl,
    telegram: "https://t.me/AhmadSalehiyan",
    whatsapp: "https://wa.me/14052693549",
    cvPath: "/cv",
    image: "/images/first.png",
    imageAlt: "Ahmad Salehiyan - Ph.D. Researcher",
    researchInterests: "health data analytics and electronic health records; predictive modeling and risk stratification; deep learning and deep reinforcement learning; sequential decision-making under uncertainty (MDP/POMDP); stochastic optimization.",
  },
  hero: {
    tagline: "Hi, I'm Ahmad",
    valueProposition:
      "Ph.D. researcher in Industrial Engineering and Management at Oklahoma State University. I build machine learning and optimization methods for decision-making under uncertainty, with applications in health data analytics and engineering systems.",
    audienceLine: "Health data analytics and engineering systems.",
    specialties: ["Machine Learning", "Deep Reinforcement Learning", "Stochastic Optimization"],
    availabilityMessage: "Open to projects in maintenance systems, operational analytics, and decision-support optimization.",
  },
  metrics: [
  {
    "label": "MIMIC-IV adult patients",
    "value": "179,524",
    "note": "Electronic health records cohort"
  },
  {
    "label": "Distinct diseases",
    "value": "846",
    "note": "MIMIC-IV comorbidity analysis"
  },
  {
    "label": "Association rules",
    "value": "628",
    "note": "Confidence above 50%"
  },
  {
    "label": "Picker travel distance improvement",
    "value": "3.0%–15.4%",
    "note": "Versus S-shape and largest-gap heuristics"
  }
],
  trustStrip: [
    "PhD in Industrial Engineering & Management (Expected Summer 2027) - Oklahoma State University",
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
  "slug": "disease-cluster-analysis-mimic-iv",
  "title": "Disease Cluster Analysis in Electronic Health Records (MIMIC-IV)",
  "domain": "Health Data Analytics",
  "description": "Cohort of 179,524 adult patients (ages 18–91), 11,733 mortality cases, 846 distinct diseases. Apriori association rule mining (minimum support 0.01) found 628 association rules with confidence above 50%. k-means clustering after t-SNE, k = 4 by silhouette analysis (score 0.44). Published in IISE Annual Conference & Expo proceedings, 2025.",
  "problem": "Comorbidity and mortality patterns in electronic health records.",
  "role": "Apriori association rule mining (minimum support 0.01), t-SNE, and k-means clustering; k = 4 by silhouette analysis (score 0.44).",
  "outcome": "628 association rules with confidence above 50%; published in IISE Annual Conference & Expo proceedings, 2025.",
  "timeline": "2025",
  "impactLabel": "628 association rules with confidence above 50%; published in IISE Annual Conference & Expo proceedings, 2025.",
  "image": "/images/AI.jpg",
  "imageAlt": "Disease Cluster Analysis in Electronic Health Records (MIMIC-IV)",
  "stack": [
    "EHR",
    "MIMIC-IV",
    "Python",
    "clustering"
  ],
  "deliverables": [
    "628 association rules with confidence above 50%; published in IISE Annual Conference & Expo proceedings, 2025."
  ],
  "proofPoints": [
    "179,524 adult patients (ages 18–91)",
    "11,733 mortality cases and 846 distinct diseases"
  ]
},
{
  "slug": "transformer-anomaly-intrusion-detection",
  "title": "Transformer-Based Deep Learning for Anomaly and Intrusion Detection",
  "domain": "Deep Learning",
  "description": "Hybrid Transformer–GAN–Autoencoder evaluated on WUSTL-IIoT-2021, EdgeIIoTset, and TON_IoT (Future Internet, 2025); Transformer and deep reinforcement learning framework for false data injection detection (Computers, Materials & Continua, 2026).",
  "problem": "Anomaly, intrusion, and false data injection detection in engineering systems.",
  "role": "Developed hybrid Transformer–GAN–Autoencoder and evolutionary-optimized Transformer–deep reinforcement learning frameworks.",
  "outcome": "Published in Future Internet (2025) and Computers, Materials & Continua (2026).",
  "timeline": "2025–2026",
  "impactLabel": "Published in Future Internet (2025) and Computers, Materials & Continua (2026).",
  "image": "/images/AI.jpg",
  "imageAlt": "Transformer-Based Deep Learning for Anomaly and Intrusion Detection",
  "stack": [
    "deep learning",
    "transformers",
    "PyTorch"
  ],
  "deliverables": [
    "Published in Future Internet (2025) and Computers, Materials & Continua (2026)."
  ],
  "proofPoints": [
    "Evaluated on WUSTL-IIoT-2021, EdgeIIoTset, and TON_IoT",
    "False data injection detection in smart water infrastructure"
  ]
},
{
  "slug": "hierarchical-ddqn-warehouse-routing",
  "title": "Hierarchical Deep Reinforcement Learning for Warehouse Picker Routing",
  "domain": "Reinforcement Learning",
  "description": "Dynamic programming within aisles, DDQN across aisles; 3.0%–15.4% improvement in travel distance over S-shape and largest-gap heuristics. SSRN preprint.",
  "problem": "Picker routing in two-block warehouses.",
  "role": "Dynamic programming within aisles; a hierarchical DDQN agent sequences aisles.",
  "outcome": "3.0%–15.4% improvement in total travel distance over S-shape and largest-gap heuristics.",
  "timeline": "SSRN preprint",
  "impactLabel": "3.0%–15.4% improvement in total travel distance over S-shape and largest-gap heuristics.",
  "image": "/images/RL.PNG",
  "imageAlt": "Hierarchical Deep Reinforcement Learning for Warehouse Picker Routing",
  "stack": [
    "reinforcement learning",
    "DDQN"
  ],
  "deliverables": [
    "3.0%–15.4% improvement in total travel distance over S-shape and largest-gap heuristics."
  ],
  "proofPoints": [
    "Dynamic programming for aisle-level subproblems",
    "SSRN preprint No. 7052096"
  ]
},
{
  "slug": "multi-sensor-pomdp-maintenance",
  "title": "Multi-Sensor Condition-Based Maintenance under Partial Observability",
  "domain": "Decision-Making",
  "description": "POMDP model with control-limit policies. TechRxiv preprint, 2024.",
  "problem": "Equipment health evolution under partial sensor observations.",
  "role": "Implemented a POMDP model using multiple sensor streams and derived control-limit policies.",
  "outcome": "TechRxiv preprint, 2024.",
  "timeline": "2024",
  "impactLabel": "TechRxiv preprint, 2024.",
  "image": "/images/maintenance.jpg",
  "imageAlt": "Multi-Sensor Condition-Based Maintenance under Partial Observability",
  "stack": [
    "POMDP",
    "decision-making"
  ],
  "deliverables": [
    "TechRxiv preprint, 2024."
  ],
  "proofPoints": [
    "Belief-state aggregation and state-space compression",
    "Control-limit policies for operate-versus-preventive-maintenance decisions"
  ]
},
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
      links: [{ label: "View legacy archive", href: "/maintenance/ManagementReporting/index.html" }],
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
      links: [{ label: "View legacy archive", href: "/Integer%20Programming/index.html" }],
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
      links: [{ label: "View legacy archive", href: "/Machin%20learning/index.html" }],
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
    "role": "Graduate Research Assistant",
    "organization": "Oklahoma State University",
    "period": "Aug 2023 – Present",
    "summary": "Research in machine learning, deep reinforcement learning, and stochastic optimization for decision-making under uncertainty. Advisor: Dr. Akash Deep.",
    "highlights": [
      "Co-authored the MIMIC-IV comorbidity and mortality study published in the IISE Annual Conference proceedings (2025).",
      "Developed POMDP-based multi-sensor maintenance policies and hierarchical DDQN warehouse picker routing."
    ]
  },
  {
    "role": "Graduate Teaching Assistant / Instructor",
    "organization": "Oklahoma State University",
    "period": "2025 – Present",
    "summary": "Courses: ENGR 1412 Introductory Engineering Computer Programming (Fall 2026), Python Programming (Fall 2025), Engineering Economics (Summer 2025), Python for Data Analysis (Spring 2025).",
    "highlights": [
      "Fall 2026: weekly Excel assignments, grading, and help sessions for ENGR 1412 lab sections.",
      "Taught Python Programming, Engineering Economics, and Python for Data Analysis in 2025."
    ]
  },
  {
    "role": "Research Assistant",
    "organization": "K. N. Toosi University of Technology",
    "period": "Oct 2018 – Apr 2020",
    "summary": "Engineered time-domain, frequency-domain, and wavelet-based features from sensor signals for early fault detection in industrial machinery.",
    "highlights": [
      "Used feature-importance analysis to identify critical signals.",
      "Designed statistical thresholds for fault diagnosis."
    ]
  },
  {
    "role": "Industrial Engineer",
    "organization": "Karin Crane Company",
    "period": "Apr 2019 – Oct 2019",
    "summary": "Coordinated process improvements and documented operational workflows across production teams; supported resource planning, scheduling, and quality control.",
    "highlights": [
      "Documented operational workflows and coordinated process improvements.",
      "Supported resource planning, scheduling, and quality control."
    ]
  }
] as ExperienceItem[],
  education: [
  {
    "degree": "Ph.D., Industrial Engineering and Management",
    "institution": "Oklahoma State University",
    "period": "Expected Summer 2027",
    "advisor": "Dr. Akash Deep",
    "focus": "Dissertation (proposed): “Sequential Decision-Making Under Uncertainty in Smart Engineering Systems.”",
    "link": "https://ceat.okstate.edu/iem"
  },
  {
    "degree": "M.S., Applied Statistics",
    "institution": "Oklahoma State University",
    "period": "Expected 2026",
    "focus": "Experimental design, statistical programming (R/SAS), data analytics, and statistical inference."
  },
  {
    "degree": "M.S., Industrial Engineering",
    "institution": "K. N. Toosi University of Technology, Tehran",
    "period": "2019–2022",
    "focus": "Thesis: “Predictive Maintenance of Advanced Industrial Machines Using AI Techniques.”",
    "advisor": "Dr. Abdollah Aghaie"
  },
  {
    "degree": "B.S., Industrial Engineering",
    "institution": "Islamic Azad University, Qazvin",
    "period": "2014–2019"
  }
] as EducationItem[],
  certifications: [
    "Google Data Analytics Certificate",
    "Python Programming Certificate",
    "Machine Learning Certificate",
  ],
  skillGroups: [
  {
    "title": "Analytics programming",
    "items": [
      "Python (NumPy, SciPy, pandas, PyTorch, Gym)",
      "R",
      "SAS",
      "Julia",
      "GAMS",
      "Pyomo"
    ]
  },
  {
    "title": "Databases and large-scale data",
    "items": [
      "SQL and PostgreSQL (relational databases)",
      "Apache Spark / PySpark (coursework level)",
      "High-performance computing cluster",
      "GPU model training"
    ]
  },
  {
    "title": "Machine learning and deep learning",
    "items": [
      "Transformer architectures (the model family underlying large language models)",
      "Generative adversarial networks",
      "Autoencoders",
      "Deep Q-networks (DQN, DDQN)",
      "k-means clustering",
      "Association rule mining (Apriori)",
      "t-SNE",
      "Anomaly detection",
      "Time-series feature extraction"
    ]
  },
  {
    "title": "Health data",
    "items": [
      "Electronic health records (MIMIC-IV)",
      "Coded diagnosis data",
      "Comorbidity and mortality analysis"
    ]
  },
  {
    "title": "Decision-making and optimization",
    "items": [
      "MDP",
      "POMDP",
      "Monte Carlo simulation",
      "Mixed-integer and linear programming",
      "Benders and Lagrangian decomposition",
      "Value and policy iteration"
    ]
  },
  {
    "title": "Research tools and existing tools",
    "items": [
      "Git/GitHub",
      "LaTeX",
      "Simulation environments",
      "Experiment logging",
      "JavaScript",
      "HTML/CSS",
      "Scikit-Learn",
      "Power BI",
      "Tableau",
      "Primavera P6",
      "Excel",
      "Anaconda",
      "jQuery"
    ]
  }
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
