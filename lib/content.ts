// Single source of truth for personal, career, and site-wide content.
// Rule: every fact here comes from the owner's verified notes, the CV, or the
// earlier version of the site. If a field is unknown, leave it empty ("").
// Empty fields are not rendered anywhere.

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.salehiyan.com").replace(/\/$/, "");

/** ISO date of the last content update. Shown in the footer and on /legal/privacy. */
export const lastUpdated = "2026-11-10";

export type ExperienceItem = {
  role: string;
  organization: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  focus?: string;
  advisor?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type TeachingItem = {
  course: string;
  terms: string;
  role: string;
  details: string;
  students?: string;
};

export type NewsItem = {
  /** ISO date used for sorting. Use the first day of the year when only the year is known. */
  sortDate: string;
  /** Date text shown to visitors. */
  displayDate: string;
  text: string;
  href?: string;
};

export type EvidenceBullet = {
  text: string;
  href: string;
  linkLabel: string;
};

const headline = "Ph.D. Candidate | Reinforcement Learning and Optimization for Decision-Making Under Uncertainty";

export const siteMetadata = {
  // Page titles must stay under 60 characters, so the home title uses a short form of the headline.
  title: "Ahmad Salehiyan | Ph.D. Candidate, RL and Optimization",
  description:
    "Ph.D. Candidate at Oklahoma State University. Reinforcement learning and optimization for decision-making under uncertainty.",
  ogImage: "/images/og-card.jpg",
  ogImageAlt:
    "Ahmad Salehiyan, Ph.D. Candidate at Oklahoma State University. Reinforcement learning and optimization for decision-making under uncertainty.",
};

export const siteContent = {
  person: {
    name: "Ahmad Salehiyan",
    title: "Ph.D. Candidate",
    headline,
    affiliation: "Oklahoma State University",
    department: "School of Industrial Engineering and Management",
    location: "Stillwater, Oklahoma, USA",
    email: "ahmad@salehiyan.com",
    website: siteUrl,
    linkedin: "https://www.linkedin.com/in/ahmad-salehiyan",
    scholar: "https://scholar.google.com/citations?user=_-hRiskAAAAJ",
    // ORCID iD URL, for example "https://orcid.org/0000-0000-0000-0000". Leave empty until confirmed.
    orcid: "",
    // GitHub profile URL. Leave empty until at least two public repositories exist.
    github: "",
    image: "/images/ahmad-salehiyan.webp",
    imageAlt: "Portrait of Ahmad Salehiyan",
    imageWidth: 900,
    imageHeight: 1549,
  },

  documents: {
    academicCv: "/files/Ahmad-Salehiyan-CV.pdf",
    // Path of the industry resume PDF under /public. Leave empty until the resume is approved.
    industryResume: "",
  },

  hero: {
    summary:
      "I develop reinforcement learning and optimization methods for sequential decisions under uncertainty, with applications in maintenance planning, warehouse logistics, and health data.",
    jobMarketBanner:
      "On the 2026 to 2027 job market for postdoc, faculty, and industry research roles. Available June 2027.",
  },

  about: {
    // Two-sentence research summary for the home page. The long version lives in lib/research.ts.
    researchSummary:
      "I study sequential decision-making under uncertainty: how to act well when the state of a system is only partly observed and resources are shared. My work combines POMDP models, deep and multi-agent reinforcement learning, and stochastic optimization, with applications in condition-based maintenance, warehouse picker routing, and health and industrial data.",
    availability: "Available full time from June 2027. Open to relocation anywhere in the U.S.",
  },

  recruiterSummary:
    "I am looking for data scientist, operations research scientist, and research scientist roles, as well as postdoc and faculty positions. My core methods are reinforcement learning (DQN/DDQN, MAPPO), MDP and POMDP models, mixed-integer optimization, and statistical modeling in Python, R, and SAS. I am available full time from June 2027 and open to relocation anywhere in the U.S.",

  industryBullets: [
    {
      text: "Reinforcement learning for operational decisions. I built a hierarchical DDQN agent for warehouse picker routing that shortened total travel distance by 3.0% to 15.4% against S-shape and largest-gap heuristics.",
      href: "/projects/hierarchical-ddqn-warehouse-routing",
      linkLabel: "Picker routing project",
    },
    {
      text: "Decisions from noisy sensor data. I model equipment health as a POMDP and derive control-limit policies for operate-versus-maintain decisions from multiple sensor signals.",
      href: "/projects/multi-sensor-pomdp-maintenance",
      linkLabel: "POMDP maintenance project",
    },
    {
      text: "Machine learning on large real data. I co-authored an association rule mining and clustering study of 179,524 adult patients in the MIMIC-IV electronic health records data set.",
      href: "/projects/disease-cluster-analysis-mimic-iv",
      linkLabel: "MIMIC-IV project",
    },
    {
      text: "Deep learning models, trained and published. My transformer-based intrusion detection models were evaluated on three public industrial IoT benchmark data sets and published in two journals.",
      href: "/projects/transformer-anomaly-intrusion-detection",
      linkLabel: "Intrusion detection project",
    },
  ] as EvidenceBullet[],

  experience: [
    {
      role: "Graduate Research Assistant",
      organization: "Oklahoma State University",
      period: "Aug 2023 to present",
      summary:
        "Research on machine learning, deep reinforcement learning, and stochastic optimization for decision-making under uncertainty. Advisor: Dr. Akash Deep.",
      highlights: [
        "Designed a POMDP-based framework for condition-based maintenance with multiple sensor streams.",
        "Built a hierarchical DDQN framework for warehouse picker routing and ran its training pipeline on a dual-GPU workstation.",
        "Co-authored the MIMIC-IV comorbidity and mortality study published in the IISE Annual Conference proceedings (2025).",
      ],
    },
    {
      role: "Graduate Teaching Assistant",
      organization: "Oklahoma State University",
      period: "2025 to present",
      summary:
        "Teaching assistant for ENGR 1412 Introductory Engineering Computer Programming (Spring 2026 and Fall 2026) and Engineering Economics help sessions (Summer 2026).",
      highlights: [],
    },
    {
      role: "Research Assistant",
      organization: "K. N. Toosi University of Technology",
      period: "Oct 2018 to Apr 2020",
      summary:
        "Engineered time-domain, frequency-domain, and wavelet-based features from sensor signals for early fault detection in industrial machinery.",
      highlights: [],
    },
    {
      role: "Industrial Engineer",
      organization: "Karin Crane Company",
      period: "Apr 2019 to Oct 2019",
      summary:
        "Coordinated process improvements and documented operational workflows across production teams. Supported resource planning, scheduling, and quality control.",
      highlights: [],
    },
  ] as ExperienceItem[],

  education: [
    {
      degree: "Ph.D., Industrial Engineering and Management",
      institution: "Oklahoma State University",
      period: "Fall 2023 to present (expected Summer 2027)",
      advisor: "Dr. Akash Deep",
      focus: "Dissertation proposal: \"Sequential Decision-Making Under Uncertainty in Smart Engineering Systems.\"",
    },
    {
      degree: "M.S., Applied Statistics",
      institution: "Oklahoma State University",
      period: "Expected Fall 2026 (concurrent)",
      focus: "Experimental design, statistical programming (R and SAS), data analytics, and statistical inference.",
    },
    {
      degree: "M.S., Industrial Engineering",
      institution: "K. N. Toosi University of Technology, Tehran",
      period: "2019 to 2022",
      advisor: "Dr. Abdollah Aghaie",
      focus: "Thesis: \"Predictive Maintenance of Advanced Industrial Machines Using AI Techniques.\"",
    },
    {
      degree: "B.S., Industrial Engineering",
      institution: "Azad University, Qazvin",
      period: "2014 to 2019",
    },
  ] as EducationItem[],

  additionalTraining: "Additional training: ISO 9001:2015 Quality Management Systems.",

  skillGroups: [
    {
      title: "Reinforcement learning and sequential decisions",
      items: ["DQN/DDQN", "MAPPO", "MDP/POMDP", "Value and policy iteration", "Ray RLlib", "PettingZoo", "Gymnasium"],
    },
    {
      title: "Machine learning and deep learning",
      items: [
        "PyTorch",
        "Transformers",
        "GANs",
        "Autoencoders",
        "scikit-learn",
        "Anomaly detection",
        "Clustering",
        "t-SNE",
        "Association rule mining",
      ],
    },
    {
      title: "Optimization",
      items: [
        "Mixed-integer and linear programming",
        "Benders and Lagrangian decomposition",
        "Monte Carlo simulation",
        "Pyomo",
        "GAMS",
      ],
    },
    {
      title: "Statistics",
      items: ["R", "SAS", "Experimental design", "Statistical inference", "Hawkes processes"],
    },
    {
      title: "Data and compute",
      items: [
        "Python",
        "SQL/PostgreSQL",
        "Apache Spark/PySpark (coursework level)",
        "HPC cluster",
        "GPU training",
        "Git",
        "LaTeX",
        "Julia",
      ],
    },
    {
      title: "Visualization",
      items: ["Power BI", "Tableau", "Excel"],
    },
  ] as SkillGroup[],

  teaching: {
    intro:
      "I am a graduate teaching assistant in the School of Industrial Engineering and Management at Oklahoma State University.",
    courses: [
      {
        course: "ENGR 1412 Introductory Engineering Computer Programming",
        terms: "Spring 2026 and Fall 2026",
        role: "Teaching assistant",
        details: "I prepare and post weekly Excel assignments, grade them, and run help sessions for the lab sections.",
      },
      {
        course: "Engineering Economics",
        terms: "Summer 2026",
        role: "Help session leader",
        details: "I ran help sessions for the course.",
        students: "50 students",
      },
    ] as TeachingItem[],
    // Two to four short points about teaching approach. Empty until the owner provides them.
    approach: [] as string[],
  },

  service: {
    reviewing: "Peer reviewer for academic journals in operations research, maintenance engineering, and industrial systems.",
    // Journal names with review counts, for example "Reliability Engineering & System Safety (2 reviews)".
    journals: [] as string[],
    memberships: [
      "INFORMS (since 2024)",
      "IISE and the IISE Reliability and Maintenance Society (since 2024)",
      "SME (Society of Manufacturing Engineers)",
    ],
  },

  leadership: [
    {
      role: "President",
      organization: "Iranian Student Association (IRSA), Oklahoma State University",
      period: "2025 to present (second year)",
    },
    {
      role: "Co-founder and executive",
      organization: "ISA-Alliance, a national network of Iranian student associations",
      period: "",
    },
  ],

  awards: [
    {
      title: "3rd Place, Graduate Poster Category",
      organization: "OSU Student Research Symposium",
      year: "2024",
    },
  ],

  news: [
    {
      sortDate: "2026-11-01",
      displayDate: "Nov 1, 2026",
      text: "Talk at the INFORMS Annual Meeting (session SA20): \"Hierarchical Decision-Making for Condition-Based Maintenance of Large-Scale Fleets with Shared Resources.\"",
      href: "/publications#talks",
    },
    {
      sortDate: "2026-10-19",
      displayDate: "Oct 19, 2026",
      text: "Passed my dissertation proposal defense: \"Sequential Decision-Making Under Uncertainty in Smart Engineering Systems.\"",
      href: "/research",
    },
    {
      sortDate: "2026-03-12",
      displayDate: "Mar 12, 2026",
      text: "New journal article in Computers, Materials & Continua on false data injection detection in smart water infrastructure.",
      href: "/publications#cmc-2026",
    },
    {
      sortDate: "2025-06-24",
      displayDate: "Jun 24, 2025",
      text: "New journal article in Future Internet on intrusion detection in edge and industrial IoT systems.",
      href: "/publications#future-internet-2025",
    },
    {
      sortDate: "2025-01-01",
      displayDate: "2025",
      text: "Paper and talk at the IISE Annual Conference & Expo in Atlanta, GA, on disease clusters in electronic health records.",
      href: "/publications#iise-2025",
    },
  ] as NewsItem[],

  contact: {
    heading: "Get in touch",
    text: "I am open to postdoc, faculty, and industry research positions, and to research collaboration. Email is the best way to reach me.",
  },
};

export function sortedNews(limit?: number) {
  const items = siteContent.news.slice().sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export type ProfileLink = { label: string; href: string };

/** External profile links. Entries with an empty URL are skipped. */
export function profileLinks(): ProfileLink[] {
  const { person } = siteContent;
  return [
    { label: "Google Scholar", href: person.scholar },
    { label: "ORCID", href: person.orcid },
    { label: "LinkedIn", href: person.linkedin },
    { label: "GitHub", href: person.github },
  ].filter((link) => Boolean(link.href));
}
