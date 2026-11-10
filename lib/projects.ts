// Project pages. Each page shows: result, problem, method, figure, tech stack, my role, links.
// Numbers must match the earlier site or a paper PDF provided by the owner. Do not add new numbers.

export type FigureKey = "mimic" | "intrusion" | "hierpick" | "pomdp" | "fleet-marl";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  domain: string;
  /** Meta description, under 155 characters. */
  description: string;
  /** One line. Leads the page and the card. */
  result: string;
  problem: string;
  method: string[];
  figure: FigureKey;
  figureAlt: string;
  figureCaption: string;
  stack: string[];
  role: string;
  status: string;
  links: ProjectLink[];
  /** Extra note, for example a data-sharing statement. */
  note?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "multi-agent-fleet-maintenance",
    title: "Multi-Agent Fleet Maintenance with Safe Reinforcement Learning",
    shortTitle: "Multi-agent fleet maintenance",
    domain: "Dissertation research",
    description:
      "Dissertation work on a two-phase hybrid Safe-MARL approach for maintenance scheduling of heterogeneous fleets. In progress.",
    result: "In progress. This is my dissertation work, and I do not report results yet.",
    problem:
      "A fleet has many assets of different types, and they compete for the same limited maintenance resources. Each asset needs its own decisions, but the decisions are coupled through the shared resources and through safety limits. A single central model does not scale to large fleets.",
    method: [
      "I treat maintenance scheduling for a heterogeneous fleet as a decentralized multi-agent reinforcement learning (MARL) problem.",
      "The approach is a two-phase hybrid safe MARL (Safe-MARL) design. In the first phase, soft constraints let the agents explore. In the second phase, hard constraints enforce the limits.",
      "The research question is the trade-off between safety and learning in decentralized MARL.",
      "The simulation environment uses PettingZoo and Gymnasium. Training uses Ray RLlib with MAPPO.",
    ],
    figure: "fleet-marl",
    figureAlt:
      "Diagram of the two-phase hybrid Safe-MARL approach. Decentralized agents, one per asset in a heterogeneous fleet, share limited maintenance resources. Phase 1 uses soft constraints during exploration. Phase 2 enforces hard constraints.",
    figureCaption: "Two-phase hybrid Safe-MARL: soft constraints during exploration, hard constraints for enforcement.",
    stack: ["PettingZoo", "Gymnasium", "Ray RLlib", "MAPPO", "Python"],
    role: "This is my Ph.D. dissertation research at Oklahoma State University, advised by Dr. Akash Deep. I design the method and build the simulation and training pipeline.",
    status: "Dissertation work. Manuscript in preparation.",
    links: [
      { label: "Talks (INFORMS 2025 and 2026)", href: "/publications#talks" },
      { label: "Research overview", href: "/research" },
    ],
    featured: false,
  },
  {
    slug: "hierarchical-ddqn-warehouse-routing",
    title: "Hierarchical Deep Reinforcement Learning for Warehouse Picker Routing",
    shortTitle: "Warehouse picker routing (HierPick)",
    domain: "Reinforcement learning",
    description:
      "A hierarchical DDQN method for picker routing in two-block warehouses: 3.0% to 15.4% shorter travel distance than standard heuristics.",
    result: "3.0% to 15.4% shorter total travel distance than the S-shape and largest-gap heuristics.",
    problem:
      "An order picker walks through a two-block warehouse to collect the items on a pick list. The route decides the travel distance. Simple heuristics such as S-shape and largest-gap are fast, but they often give longer routes.",
    method: [
      "I decompose the global routing problem into aisle-level subproblems.",
      "Dynamic programming solves each aisle-level subproblem.",
      "A Double Deep Q-Network (DDQN) agent decides the sequence of aisles.",
      "I benchmark the method against the S-shape and largest-gap heuristics.",
    ],
    figure: "hierpick",
    figureAlt:
      "Diagram of the hierarchical method. At the upper level, a DDQN agent decides the sequence of aisles. At the lower level, dynamic programming solves the routing subproblem inside each aisle. Together they give the picker route for a two-block warehouse.",
    figureCaption: "Two levels: a DDQN agent sequences aisles, and dynamic programming routes inside each aisle.",
    stack: ["DDQN", "Dynamic programming", "Python", "GPU training"],
    role: "Lead author. I built the hierarchical DDQN framework and ran its training pipeline on a dual-GPU workstation. Joint work with M. Masae, P. Vichitkunakorn, and A. Deep.",
    status: "SSRN preprint No. 7052096.",
    links: [
      { label: "Preprint (SSRN)", href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7052096" },
      { label: "Publication entry", href: "/publications#hierpick-ssrn" },
    ],
    featured: true,
  },
  {
    slug: "multi-sensor-pomdp-maintenance",
    title: "Multi-Sensor Condition-Based Maintenance under Partial Observability",
    shortTitle: "Multi-sensor POMDP maintenance",
    domain: "Sequential decision-making",
    description:
      "A POMDP framework for condition-based maintenance with multiple sensor signals and control-limit policies for operate-versus-maintain decisions.",
    result: "Control-limit policies for operate-versus-preventive-maintenance decisions from multiple sensor signals.",
    problem:
      "Sensors do not show the true health of a machine. They give several noisy signals. The planner must decide when to keep operating and when to do preventive maintenance without seeing the real state.",
    method: [
      "I model equipment health under partial sensor observations as a partially observable Markov decision process (POMDP).",
      "I derive control-limit policies for the operate-versus-preventive-maintenance decision.",
      "Belief-state aggregation and state-space compression let the method scale to high-dimensional sensor data.",
      "I validated the method on synthetic data and on real condition-monitoring signals.",
    ],
    figure: "pomdp",
    figureAlt:
      "Diagram of the POMDP maintenance framework. Multiple sensor signals update a belief about the hidden health state of the equipment. A control-limit policy compares the belief with a threshold and chooses between continuing to operate and doing preventive maintenance.",
    figureCaption: "Sensor signals update the belief state. A control-limit policy chooses operate or preventive maintenance.",
    stack: ["POMDP", "Control-limit policies", "Belief-state aggregation", "State-space compression"],
    role: "Lead author. I designed and implemented the framework. Joint work with J. Lee, M. Kim, and A. Deep.",
    status: "TechRxiv preprint, 2024. A related manuscript is submitted to INFORMS Journal on Data Science.",
    links: [
      { label: "Publication entries", href: "/publications#pomdp-techrxiv-2024" },
      { label: "Talks (INFORMS 2024, RAMS 2025)", href: "/publications#talks" },
    ],
    featured: true,
  },
  {
    slug: "disease-cluster-analysis-mimic-iv",
    title: "Disease Cluster Analysis in Electronic Health Records (MIMIC-IV)",
    shortTitle: "Disease clusters in MIMIC-IV",
    domain: "Health data analytics",
    description:
      "Association rule mining and clustering of comorbidity and mortality patterns for 179,524 adult patients in the MIMIC-IV records.",
    result: "628 association rules with confidence above 50%, from a cohort of 179,524 adult patients.",
    problem:
      "Many patients have several diseases at once. We want to know which diseases occur together and how these combinations relate to mortality. Electronic health records make this question answerable at scale.",
    method: [
      "The cohort has 179,524 unique adult patients (ages 18 to 91), with 11,733 mortality cases and 846 distinct diseases.",
      "The Apriori algorithm (minimum support 0.01) mines disease co-occurrence rules. Rules are evaluated by support, confidence, and lift.",
      "t-SNE reduces the dimension of the rules, and k-means groups them. Silhouette analysis selects k = 4 (silhouette score 0.44).",
      "Each cluster is profiled by mortality rate, age, and gender.",
    ],
    figure: "mimic",
    figureAlt:
      "Pipeline diagram for the MIMIC-IV study. A cohort of 179,524 adult patients goes through Apriori association rule mining, which gives 628 rules with confidence above 50%. t-SNE reduces the dimension, k-means with k equal to 4 groups the rules, and each cluster is profiled by mortality rate, age, and gender.",
    figureCaption: "Analysis pipeline: cohort, association rule mining, dimension reduction, clustering, and cluster profiles.",
    stack: ["Python", "Apriori association rule mining", "t-SNE", "k-means clustering", "HPC cluster"],
    role: "Co-author. Joint work with P. Vaghfi Mohebbi and A. Deep. Part of the computation ran at the OSU High-Performance Computing Center.",
    status: "Published in the Proceedings of the IISE Annual Conference & Expo, 2025. Presented as a talk.",
    links: [
      { label: "Publication entry", href: "/publications#iise-2025" },
      { label: "Talk (IISE 2025)", href: "/publications#talks" },
    ],
    note: "Code and data. The analysis code can be shared. The data cannot. MIMIC-IV is available only to credentialed users through PhysioNet under its data use agreement, so this site does not publish patient-level data or outputs derived from patient-level data.",
    featured: true,
  },
  {
    slug: "transformer-anomaly-intrusion-detection",
    title: "Transformer-Based Deep Learning for Anomaly and Intrusion Detection",
    shortTitle: "Transformer-based intrusion detection",
    domain: "Deep learning",
    description:
      "Transformer-based models for intrusion and false data injection detection, tested on three public IIoT benchmark data sets. Two journal articles.",
    result: "Two journal articles. The intrusion detection model was evaluated on three public industrial IoT benchmark data sets.",
    problem:
      "Edge and industrial IoT systems and smart water infrastructure face intrusions and false data injection attacks. Detection models must find these attacks in network and sensor data.",
    method: [
      "The first framework combines a Transformer, a generative adversarial network (GAN), and an autoencoder for intrusion detection in edge and industrial IoT systems. I evaluated it on WUSTL-IIoT-2021, EdgeIIoTset, and TON_IoT.",
      "The second framework combines a Transformer and deep reinforcement learning, tuned with an evolutionary optimizer, for false data injection detection in smart water infrastructure.",
    ],
    figure: "intrusion",
    figureAlt:
      "Diagram of the two detection frameworks. The first combines a Transformer, a GAN, and an autoencoder for intrusion detection, evaluated on the WUSTL-IIoT-2021, EdgeIIoTset, and TON_IoT data sets. The second combines a Transformer and deep reinforcement learning with an evolutionary optimizer for false data injection detection in smart water infrastructure.",
    figureCaption: "Two frameworks: Transformer, GAN, and autoencoder for intrusion detection, and Transformer with deep reinforcement learning for false data injection detection.",
    stack: ["PyTorch", "Transformers", "GANs", "Autoencoders", "Deep reinforcement learning"],
    role: "First author of both articles. I developed the two frameworks with my co-authors.",
    status: "Published in Future Internet (2025) and Computers, Materials & Continua (2026).",
    links: [
      { label: "Future Internet article (DOI)", href: "https://doi.org/10.3390/fi17070279" },
      { label: "Computers, Materials & Continua article (DOI)", href: "https://doi.org/10.32604/cmc.2026.075336" },
    ],
    featured: true,
  },
];

export type EarlierWork = {
  title: string;
  period: string;
  description: string;
  link?: ProjectLink;
};

/** Older portfolio items. They no longer have their own pages. Their old URLs redirect to /projects. */
export const earlierWork: EarlierWork[] = [
  {
    title: "Maintenance Reporting System",
    period: "2022 to 2023",
    description: "A structured reporting workflow to track maintenance performance and support planning decisions.",
    link: { label: "Related article: maintenance management systems", href: "/insights/maintenance-management" },
  },
  {
    title: "Integer Programming for Planning Decisions",
    period: "2021 to 2024",
    description: "Integer programming models in GAMS, with worked examples of Benders, branch-and-bound, and Dantzig-Wolfe methods.",
    link: { label: "Related article: integer programming", href: "/insights/integer-programming" },
  },
  {
    title: "Machine Learning for Maintenance and Decision Support",
    period: "2021 to 2024",
    description: "Supervised, unsupervised, and reinforcement learning examples for industrial and maintenance use cases.",
    link: { label: "Related article: machine learning for reliability", href: "/insights/machine-learning" },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function featuredProjects() {
  return projects.filter((project) => project.featured);
}
