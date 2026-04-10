export type PublicationSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type PublicationArticle = {
  slug: "machine-learning" | "integer-programming" | "maintenance-management";
  title: string;
  domain: string;
  summary: string;
  heroImage: string;
  heroImageAlt: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  takeaways: string[];
  sections: PublicationSection[];
};

export const publications: PublicationArticle[] = [
  {
    slug: "machine-learning",
    title: "Machine Learning for Industrial Reliability: From Theory to Deployment",
    domain: "Machine Learning",
    summary:
      "A practical guide to using supervised, unsupervised, and reinforcement learning in reliability-centric operations without overpromising black-box AI outcomes.",
    heroImage: "/images/AI.jpg",
    heroImageAlt: "Machine learning in industrial systems",
    publishedAt: "2024-03-15",
    updatedAt: "2026-04-09",
    readTime: "14 min read",
    takeaways: [
      "Machine learning performs best when connected to clear operational decisions, not vanity dashboards.",
      "Data quality governance and monitoring are more important than model complexity in industrial settings.",
      "Hybrid AI design improves trust by combining statistical learning with rule-based domain constraints.",
    ],
    sections: [
      {
        id: "what-is-ml",
        title: "What machine learning is—and what it is not",
        paragraphs: [
          "Machine learning is a method for learning patterns from historical data so future outcomes can be estimated with measurable confidence. In industrial engineering contexts, that usually means predicting failure risk, anomaly likelihood, or service-level deviations before they become expensive disruptions.",
          "It is not a substitute for engineering judgment. A model can score risk, but it cannot define asset criticality policy, maintenance philosophy, or safety thresholds on its own. Those decisions still require structured domain leadership.",
        ],
      },
      {
        id: "ml-pipeline",
        title: "A deployment-focused ML pipeline for reliability teams",
        paragraphs: [
          "A reliable pipeline starts with data framing, not algorithm selection. Teams should first define which decision they are trying to improve: work-order prioritization, shutdown planning, or spare-parts staging. Once the decision is explicit, the target variable and evaluation window become clear.",
          "From there, the process should include asset taxonomy standardization, feature engineering from maintenance logs and sensor trends, model training, threshold tuning, and post-deployment monitoring. If any stage is weak—especially data labeling and monitoring—the model may look good offline but fail in production.",
        ],
      },
      {
        id: "training-methods",
        title: "Choosing between supervised, unsupervised, and reinforcement learning",
        paragraphs: [
          "Supervised learning is the strongest choice when you have quality historical labels, such as known failure categories or downtime events. It provides better control over validation and usually produces the clearest business case.",
          "Unsupervised learning is useful when labels are scarce but pattern discovery is still valuable. Clustering and anomaly detection can uncover hidden operating modes, yet outputs must be interpreted with engineering context. Reinforcement learning can optimize sequential maintenance decisions, but it should be introduced after your data and simulation foundations are already stable.",
        ],
      },
      {
        id: "limitations",
        title: "Why ML projects stall before business value",
        paragraphs: [
          "Most industrial ML failures are not caused by weak algorithms; they are caused by weak implementation systems. Common blockers include inconsistent data definitions across teams, missing feedback loops, and no ownership model for retraining.",
          "Bias and opacity also become practical concerns when recommendations affect critical assets. For that reason, every deployment should include explainability notes, guardrails, and escalation logic so planners know when to trust predictions and when to override them.",
        ],
      },
      {
        id: "hybrid-ai",
        title: "Why hybrid AI is the practical next step",
        paragraphs: [
          "A pure black-box approach rarely satisfies reliability stakeholders. Hybrid AI combines statistical models with transparent rules (for example, safety constraints, minimum inspection frequencies, or regulatory conditions), creating recommendations that are both data-driven and policy-compliant.",
          "In practice, hybrid systems improve adoption because engineers can audit the reasoning path. The result is not only stronger predictive performance but also stronger organizational trust in how decisions are made.",
        ],
      },
    ],
  },
  {
    slug: "integer-programming",
    title: "Integer Programming for High-Stakes Planning Decisions",
    domain: "Optimization",
    summary:
      "A practical, engineering-first explanation of integer programming formulations and classical solution approaches for planning, allocation, and scheduling under constraints.",
    heroImage: "/images/INT.png",
    heroImageAlt: "Integer programming and optimization modeling",
    publishedAt: "2024-02-10",
    updatedAt: "2026-04-09",
    readTime: "13 min read",
    takeaways: [
      "Integer programming is the right tool when decisions are discrete and constraints are strict.",
      "Model quality depends on objective design, constraint realism, and scenario coverage.",
      "Branch-and-bound, cuts, and decomposition methods are complementary—not competing—tools.",
    ],
    sections: [
      {
        id: "ip-foundation",
        title: "Why integer programming matters in industrial systems",
        paragraphs: [
          "Integer programming is the discipline of optimizing decisions when variables must be whole or binary, such as selecting maintenance windows, assigning crews, or activating backup capacity. Unlike continuous linear models, integer models respect operational realities where partial decisions are impossible.",
          "This matters because many critical engineering decisions are inherently discrete. If your solution recommends 2.4 technicians or 0.37 of a machine restart, the model is mathematically elegant but operationally unusable.",
        ],
      },
      {
        id: "ip-formulation",
        title: "Formulation quality defines solution quality",
        paragraphs: [
          "A useful model starts with a clear objective: minimize total cost, minimize risk-adjusted downtime, or maximize service level under a fixed budget. That objective must then be paired with realistic constraints including labor calendars, lead times, sequence dependencies, and service-level minimums.",
          "Good formulations also include explicit assumptions and scenario boundaries. This prevents overconfidence and makes the model maintainable as operations change.",
        ],
      },
      {
        id: "classical-approaches",
        title: "Classical methods: branch-and-bound, cuts, and decomposition",
        paragraphs: [
          "Branch-and-bound remains the backbone of many mixed-integer solvers. It systematically explores candidate solutions while pruning regions that cannot improve the objective, making hard problems tractable in practice.",
          "Cutting-plane methods tighten relaxations and accelerate convergence, especially when combined with branch-and-bound in branch-and-cut workflows. Decomposition methods such as Dantzig-Wolfe and Benders become valuable when large models exhibit exploitable block structures or scenario partitions.",
        ],
      },
      {
        id: "implementation",
        title: "From mathematical model to production planning tool",
        paragraphs: [
          "A model is only useful when embedded in planning operations. Production-grade deployment requires clean data pipelines, repeatable solve orchestration, run-time controls, and sensitivity analysis outputs that planners can interpret quickly.",
          "Teams should publish not just the recommended plan, but also shadow prices, binding constraints, and what-if deltas. This converts optimization from a one-time project into a decision platform.",
        ],
      },
      {
        id: "business-impact",
        title: "Where integer programming creates measurable value",
        paragraphs: [
          "In reliability and maintenance settings, integer programming can reduce avoidable downtime by improving outage sequencing, crew utilization, and spare-part allocation under uncertainty. In supply and production contexts, it clarifies trade-offs between service level, inventory cost, and schedule stability.",
          "The strategic value comes from repeatability: once the optimization structure is in place, teams can respond to disruptions with scenario-driven speed instead of spreadsheet improvisation.",
        ],
      },
    ],
  },
  {
    slug: "maintenance-management",
    title: "Maintenance Management Systems That Scale with Operational Complexity",
    domain: "Reliability & Operations",
    summary:
      "A structured playbook for building maintenance systems around service level, work-order quality, and CMMS-enabled execution.",
    heroImage: "/images/maintenance.jpg",
    heroImageAlt: "Maintenance management and reliability operations",
    publishedAt: "2024-01-18",
    updatedAt: "2026-04-09",
    readTime: "15 min read",
    takeaways: [
      "Maintenance strategy should be aligned to asset criticality and service-level expectations.",
      "Work-order systems are management systems, not administrative checklists.",
      "CMMS value comes from data discipline, governance, and planning integration.",
    ],
    sections: [
      {
        id: "service-level",
        title: "Start with equipment service level, not tool selection",
        paragraphs: [
          "Equipment service level reflects how reliably assets are available for intended operation. It is the most direct bridge between maintenance strategy and business performance because it captures uptime, quality impact, and production stability in one frame.",
          "When service-level expectations are unclear, teams often jump to software or dashboards before defining operating philosophy. The result is activity without directional improvement.",
        ],
      },
      {
        id: "maintenance-philosophies",
        title: "Choosing the right maintenance philosophy by context",
        paragraphs: [
          "Reactive maintenance is unavoidable in emergencies but expensive as a default strategy. Corrective and preventive approaches improve control by converting surprises into scheduled work, while predictive and condition-based approaches improve timing by acting on asset condition signals.",
          "The right mix depends on criticality, failure behavior, data availability, and operational risk tolerance. Mature organizations maintain a portfolio strategy rather than forcing one philosophy across all assets.",
        ],
      },
      {
        id: "work-orders",
        title: "Work-order systems as the operational backbone",
        paragraphs: [
          "Work-order quality determines whether maintenance data can support strategic decisions. Every order should capture failure mode, cause coding, labor effort, material usage, and completion quality with enough structure to support trend analysis.",
          "A high-quality system also includes prioritization logic, approval pathways, and closure discipline. Without those controls, maintenance history becomes noisy and analytical models lose credibility.",
        ],
      },
      {
        id: "cmms",
        title: "CMMS implementation that actually improves outcomes",
        paragraphs: [
          "A CMMS should centralize maintenance information, enforce process standards, and make planning trade-offs visible across teams. The software itself is not the differentiator; governance and process design are.",
          "Successful CMMS programs align master data standards, KPI definitions, backlog management, and review cadence. When these elements are integrated, the platform becomes a reliability control system rather than a ticket archive.",
        ],
      },
      {
        id: "roadmap",
        title: "A practical modernization roadmap",
        paragraphs: [
          "Start with data hygiene and work-order standardization, then establish asset criticality tiers and KPI governance. Next, deploy predictive analytics selectively on high-impact assets where intervention timing materially affects downtime cost.",
          "Finally, connect insights to planning routines: weekly risk reviews, monthly reliability deep dives, and quarterly strategy recalibration. This is how maintenance evolves from cost center behavior to operational strategy.",
        ],
      },
    ],
  },
];

export const publicationBySlug: Record<PublicationArticle["slug"], PublicationArticle> = {
  "machine-learning": publications[0],
  "integer-programming": publications[1],
  "maintenance-management": publications[2],
};
