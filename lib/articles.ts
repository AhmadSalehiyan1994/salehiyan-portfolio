// Writing (the /insights section). Read time is computed from the word count, never typed by hand.

export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type ArticleReference = {
  text: string;
  href: string;
};

export type Article = {
  slug: string;
  title: string;
  domain: string;
  summary: string;
  heroImage: string;
  heroImageAlt: string;
  publishedAt: string;
  updatedAt: string;
  /** Drafts are not listed, are excluded from the sitemap, and carry a noindex tag. */
  draft?: boolean;
  takeaways: string[];
  references: ArticleReference[];
  related: {
    text: string;
    publicationIds: string[];
    projectSlugs: string[];
  };
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "machine-learning",
    title: "Machine Learning for Industrial Reliability: From Theory to Deployment",
    domain: "Machine Learning",
    summary:
      "A practical guide to supervised, unsupervised, and reinforcement learning in reliability work, with attention to what the models can and cannot do.",
    heroImage: "/images/industrial-reliability-engineer.jpg",
    heroImageAlt: "Engineer in safety gear using a tablet on a factory floor",
    publishedAt: "2024-03-15",
    updatedAt: "2026-11-10",
    takeaways: [
      "Machine learning performs best when connected to clear operational decisions, not just to dashboards.",
      "Data quality governance and monitoring are more important than model complexity in industrial settings.",
      "Hybrid AI design improves trust by combining statistical learning with rule-based domain constraints.",
    ],
    references: [
      {
        text: "T. P. Carvalho, F. A. A. M. N. Soares, R. Vita, R. P. Francisco, J. P. Basto, S. G. S. Alcalá. A systematic literature review of machine learning methods applied to predictive maintenance. Computers & Industrial Engineering, 137, 106024, 2019.",
        href: "https://doi.org/10.1016/j.cie.2019.106024",
      },
      {
        text: "A. K. S. Jardine, D. Lin, D. Banjevic. A review on machinery diagnostics and prognostics implementing condition-based maintenance. Mechanical Systems and Signal Processing, 20(7), 1483-1510, 2006.",
        href: "https://doi.org/10.1016/j.ymssp.2005.09.012",
      },
      {
        text: "R. S. Sutton, A. G. Barto. Reinforcement Learning: An Introduction, second edition. MIT Press, 2018.",
        href: "http://incompleteideas.net/book/the-book-2nd.html",
      },
    ],
    related: {
      text: "My own work on this topic uses transformer-based deep learning for intrusion detection and a POMDP model for maintenance decisions from sensor data.",
      publicationIds: ["future-internet-2025", "pomdp-techrxiv-2024"],
      projectSlugs: ["transformer-anomaly-intrusion-detection", "multi-sensor-pomdp-maintenance"],
    },
    sections: [
      {
        id: "what-is-ml",
        title: "What machine learning is, and what it is not",
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
          "From there, the process should include asset taxonomy standardization, feature engineering from maintenance logs and sensor trends, model training, threshold tuning, and post-deployment monitoring. If any stage is weak, especially data labeling and monitoring, the model may look good offline but fail in production.",
        ],
      },
      {
        id: "training-methods",
        title: "Choosing between supervised, unsupervised, and reinforcement learning",
        paragraphs: [
          "Supervised learning is the strongest choice when you have quality historical labels, such as known failure categories or downtime events. It gives better control over validation and is usually the easiest to evaluate.",
          "Unsupervised learning is useful when labels are scarce but pattern discovery is still valuable. Clustering and anomaly detection can uncover hidden operating modes, yet outputs must be interpreted with engineering context. Reinforcement learning can optimize sequential maintenance decisions, but it should be introduced after your data and simulation foundations are already stable.",
        ],
      },
      {
        id: "limitations",
        title: "Why ML projects stall before business value",
        paragraphs: [
          "Most industrial ML failures are not caused by weak algorithms. They are caused by weak implementation. Common blockers include inconsistent data definitions across teams, missing feedback loops, and no ownership model for retraining.",
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
      "An engineering view of integer programming formulations and classical solution methods for planning, allocation, and scheduling under constraints.",
    heroImage: "/images/INT.png",
    heroImageAlt: "Integer programming and optimization modeling",
    publishedAt: "2024-02-10",
    updatedAt: "2026-11-10",
    takeaways: [
      "Integer programming is the right tool when decisions are discrete and constraints are strict.",
      "Model quality depends on objective design, constraint realism, and scenario coverage.",
      "Branch-and-bound, cuts, and decomposition methods are complementary tools. They do not compete.",
    ],
    references: [
      {
        text: "A. H. Land, A. G. Doig. An Automatic Method of Solving Discrete Programming Problems. Econometrica, 28(3), 497-520, 1960.",
        href: "https://www.jstor.org/stable/1910129",
      },
      {
        text: "G. B. Dantzig, P. Wolfe. Decomposition Principle for Linear Programs. Operations Research, 8(1), 101-111, 1960.",
        href: "https://doi.org/10.1287/opre.8.1.101",
      },
      {
        text: "J. F. Benders. Partitioning procedures for solving mixed-variables programming problems. Numerische Mathematik, 4, 238-252, 1962.",
        href: "https://doi.org/10.1007/BF01386316",
      },
    ],
    related: {
      text: "In my research I combine exact methods with learning. My picker-routing work uses dynamic programming inside each aisle and a DDQN agent across aisles.",
      publicationIds: ["hierpick-ssrn"],
      projectSlugs: ["hierarchical-ddqn-warehouse-routing"],
    },
    sections: [
      {
        id: "ip-foundation",
        title: "Why integer programming matters in industrial systems",
        paragraphs: [
          "Integer programming is the discipline of optimizing decisions when variables must be whole or binary, such as selecting maintenance windows, assigning crews, or activating backup capacity. Unlike continuous linear models, integer models respect operational realities where partial decisions are impossible.",
          "This matters because many critical engineering decisions are inherently discrete. If your solution recommends 2.4 technicians or 0.37 of a machine restart, the model is mathematically neat but cannot be used.",
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
          "Teams should publish not just the recommended plan, but also shadow prices, binding constraints, and what-if deltas. This makes the model useful beyond a single run.",
        ],
      },
      {
        id: "business-impact",
        title: "Where integer programming creates measurable value",
        paragraphs: [
          "In reliability and maintenance settings, integer programming can reduce avoidable downtime by improving outage sequencing, crew utilization, and spare-part allocation under uncertainty. In supply and production contexts, it clarifies trade-offs between service level, inventory cost, and schedule stability.",
          "The main value is repeatability: once the optimization structure is in place, teams can respond to disruptions with scenario-driven speed instead of spreadsheet improvisation.",
        ],
      },
    ],
  },
  {
    slug: "maintenance-management",
    title: "Maintenance Management Systems That Scale with Operational Complexity",
    domain: "Reliability & Operations",
    summary:
      "A structured guide to building maintenance systems around service level, work-order quality, and CMMS-enabled execution.",
    heroImage: "/images/maintenance.jpg",
    heroImageAlt: "Maintenance management and reliability operations",
    publishedAt: "2024-01-18",
    updatedAt: "2026-11-10",
    takeaways: [
      "Maintenance strategy should be aligned to asset criticality and service-level expectations.",
      "Work-order systems are management systems, not administrative checklists.",
      "CMMS value comes from data discipline, governance, and planning integration.",
    ],
    references: [
      {
        text: "B. de Jonge, P. A. Scarf. A review on maintenance optimization. European Journal of Operational Research, 285(3), 805-824, 2020.",
        href: "https://doi.org/10.1016/j.ejor.2019.09.047",
      },
      {
        text: "A. K. S. Jardine, D. Lin, D. Banjevic. A review on machinery diagnostics and prognostics implementing condition-based maintenance. Mechanical Systems and Signal Processing, 20(7), 1483-1510, 2006.",
        href: "https://doi.org/10.1016/j.ymssp.2005.09.012",
      },
      {
        text: "A. Deep, S. Zhou, D. Veeramani, Y. Chen. Partially observable Markov decision process-based optimal maintenance planning with time-dependent observations. European Journal of Operational Research, 311(2), 533-544, 2023.",
        href: "https://doi.org/10.1016/j.ejor.2023.05.022",
      },
    ],
    related: {
      text: "My research studies the decision side of condition-based maintenance: when to keep operating and when to maintain, given noisy sensor signals.",
      publicationIds: ["deviation-informed", "pomdp-techrxiv-2024"],
      projectSlugs: ["multi-sensor-pomdp-maintenance", "multi-agent-fleet-maintenance"],
    },
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
          "Finally, connect insights to planning routines: weekly risk reviews, monthly reliability deep dives, and quarterly strategy recalibration. This is how maintenance moves from reacting to failures to planning ahead.",
        ],
      },
    ],
  },

  // Draft posts (W3). They are built from my own open-access papers and stay hidden until approved:
  // not listed on /insights, not in the sitemap, and served with a noindex tag.
  // To publish one, delete its "draft: true" line.
  {
    slug: "transformer-gan-autoencoder-intrusion-detection",
    title: "Three Models in One Detector: A Transformer, a GAN, and an Autoencoder for IIoT Intrusion Detection",
    domain: "Deep Learning",
    summary:
      "Notes from our Future Internet paper on what each part of a hybrid intrusion detection model does, and why the data preparation matters as much as the model.",
    heroImage: "/images/AI.jpg",
    heroImageAlt: "Abstract illustration of machine learning",
    publishedAt: "2026-11-10",
    updatedAt: "2026-11-10",
    draft: true,
    takeaways: [
      "Each part has one job: the Transformer reads sequences, the GAN adds rare attack samples, and the autoencoder reduces noise.",
      "Class imbalance is handled before training, with undersampling, SMOTE oversampling, and stratified splits.",
      "A metaheuristic, an improved chimp optimization algorithm, tunes the hyperparameters instead of manual search.",
    ],
    references: [
      {
        text: "A. Salehiyan, P. S. Moghaddam, M. Kaveh. An Optimized Transformer-GAN-AE for Intrusion Detection in Edge and IIoT Systems: Experimental Insights from WUSTL-IIoT-2021, EdgeIIoTset, and TON_IoT Datasets. Future Internet, 17(7), 279, 2025.",
        href: "https://doi.org/10.3390/fi17070279",
      },
    ],
    related: {
      text: "This post summarizes one of my journal articles. The companion project page covers both of my intrusion detection papers.",
      publicationIds: ["future-internet-2025", "cmc-2026"],
      projectSlugs: ["transformer-anomaly-intrusion-detection"],
    },
    sections: [
      {
        id: "problem",
        title: "The problem",
        paragraphs: [
          "Edge and industrial IoT (IIoT) networks connect many different devices, and the traffic they produce is high-dimensional and uneven. Attacks are rare compared with normal traffic, and the records are noisy. A single deep learning model usually handles one of these difficulties well and the others poorly.",
          "In this paper we built a hybrid model, which we call Transformer-GAN-AE, and gave each difficulty to the part best suited to it.",
        ],
      },
      {
        id: "three-parts",
        title: "What each part does",
        paragraphs: [
          "The Transformer extracts temporal features. Its multi-head self-attention captures long-range dependencies in sequential traffic data.",
          "The generative adversarial network (GAN) learns the data distribution. We use it to add samples for minority classes, which are the rare attack types.",
          "The autoencoder (AE) denoises and regularizes. It reduces the effect of noise, and a high reconstruction error can itself point to an anomaly.",
        ],
      },
      {
        id: "tuning",
        title: "Tuning with an improved chimp optimization algorithm",
        paragraphs: [
          "Hybrid models have many hyperparameters, and GAN training is sensitive to them. We tuned the hyperparameters with an improved chimp optimization algorithm (IChOA). Our change to the standard algorithm is a fifth elite agent, which we call the Balancer.",
          "In our experiments, IChOA made GAN training more stable and faster to converge.",
        ],
      },
      {
        id: "data",
        title: "Data preparation",
        paragraphs: [
          "Before training, we remove redundant, incomplete, and corrupted records, encode categorical attributes, and scale numerical features to the range 0 to 1. We reduce class imbalance by undersampling the dominant classes and oversampling the minority classes with SMOTE. For the sequence modules, we cut the data into fixed-length time windows. Train, validation, and test sets come from stratified sampling.",
          "We evaluated the model on three public benchmark data sets: WUSTL-IIoT-2021, EdgeIIoTset, and TON_IoT.",
        ],
      },
      {
        id: "results",
        title: "Results",
        paragraphs: [
          "We compared the model with six baselines: a standard GAN, a convolutional neural network, a deep belief network, a time-series transformer, BERT, and XGBoost. The Transformer-GAN-AE model gave the best results among them, with a best accuracy of 98.92%. The paper reports the full tables, including recall, AUC, and run time for each data set.",
        ],
      },
    ],
  },
  {
    slug: "attack-detection-as-a-decision-problem",
    title: "Attack Detection as a Decision Problem: A Transformer Encoder with a Reinforcement Learning Agent",
    domain: "Deep Learning",
    summary:
      "Notes from our Computers, Materials & Continua paper on detecting false data injection in smart water systems with a Transformer encoder, a deep reinforcement learning agent, and an evolutionary tuner.",
    heroImage: "/images/AI.jpg",
    heroImageAlt: "Abstract illustration of machine learning",
    publishedAt: "2026-11-10",
    updatedAt: "2026-11-10",
    draft: true,
    takeaways: [
      "The detector is a reinforcement learning agent: the state is a window of sensor readings, the action is normal or attack, and the reward is plus one or minus one.",
      "The data sets are recorded histories, so the agent's actions change what it learns but not the physical process.",
      "An improved grey wolf optimizer selects the hyperparameters of both the Transformer and the agent.",
    ],
    references: [
      {
        text: "A. Salehiyan, N. Serrano, F. Hernando-Gallego, D. Martín, J. V. Álvarez-Bravo. A Novel Evolutionary Optimized Transformer-Deep Reinforcement Learning Framework for False Data Injection Detection in Industry 4.0 Smart Water Infrastructures. Computers, Materials & Continua, 87(2), 68, 2026.",
        href: "https://doi.org/10.32604/cmc.2026.075336",
      },
    ],
    related: {
      text: "This post summarizes one of my journal articles. The companion project page covers both of my intrusion detection papers.",
      publicationIds: ["cmc-2026", "future-internet-2025"],
      projectSlugs: ["transformer-anomaly-intrusion-detection"],
    },
    sections: [
      {
        id: "problem",
        title: "The problem",
        paragraphs: [
          "In a false data injection (FDI) attack, an attacker changes sensor measurements or control signals so that the monitoring system sees a wrong picture of the plant. Smart water infrastructure is exposed to this kind of attack because treatment and distribution depend on networked sensors and controllers.",
        ],
      },
      {
        id: "formulation",
        title: "Detection as a sequential decision",
        paragraphs: [
          "A Transformer encoder reads a window of multivariate sensor readings and produces an embedding. Multi-head self-attention models the temporal dependencies in the window.",
          "A deep reinforcement learning (DRL) agent takes that embedding as its state. The action is binary: 0 for normal operation and 1 for an FDI attack. The reward is +1 when the action matches the label and -1 otherwise. Training uses an epsilon-greedy schedule, a replay buffer, and a target network with soft updates.",
          "One point should be stated plainly. The data sets are fixed historical trajectories, so the agent's actions affect only the reward stream and the later policy updates. They do not change the physical process.",
        ],
      },
      {
        id: "tuning",
        title: "Tuning with an improved grey wolf optimizer",
        paragraphs: [
          "We selected the hyperparameters of the Transformer and the DRL module with an improved grey wolf optimizer (IGWO). The classical optimizer updates positions from three leaders. Our version adds a fourth leader that balances exploration and exploitation.",
          "The selected values were a learning rate of 0.004, a batch size of 64, a dropout of 0.2, 6 attention heads, 4 encoder layers, and a discount factor of 0.91. Baseline models were tuned by grid search.",
        ],
      },
      {
        id: "data",
        title: "Data and protocol",
        paragraphs: [
          "We used three water data sets. SWaT comes from a scaled-down water treatment testbed, with 51 features sampled every second. WADI covers a water distribution system that combines real equipment and simulation, with 123 features sampled every second. BATADAL is simulation-based, with 43 features sampled every minute.",
          "Missing values are imputed, features are scaled to the range 0 to 1, and labels are binary. The split is 70% training, 10% validation, and 20% testing. Each experiment was repeated five times with different random seeds.",
        ],
      },
      {
        id: "results",
        title: "Results",
        paragraphs: [
          "We compared the framework with BERT, a plain Transformer, DRL alone, LSTM, CNN, and SVM baselines. It reached a maximum detection accuracy of 99.19%. The paper reports accuracy, recall, AUC, and execution time for each data set.",
        ],
      },
    ],
  },
];

export function wordCount(article: Article) {
  const text = [
    article.summary,
    ...article.takeaways,
    ...article.sections.flatMap((section) => [section.title, ...section.paragraphs]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

/** Read time in minutes: words / 220, rounded up. */
export function readTimeMinutes(article: Article) {
  return Math.max(1, Math.ceil(wordCount(article) / 220));
}

export function publishedArticles() {
  return articles
    .filter((article) => !article.draft)
    .slice()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function formatDate(iso: string) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [year, month, day] = iso.split("-").map(Number);
  return `${months[month - 1]} ${day}, ${year}`;
}
