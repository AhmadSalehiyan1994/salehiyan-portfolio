// Research content: statement, themes, publications, talks, and the job market paper.
// Rule: an item is "published" only if it has a journal or proceedings volume or a DOI.
// Submitted, under review, and preprint items stay in their own groups.

export type PublicationGroup = "journal" | "conference" | "review" | "preprint" | "in-preparation";

export type Author = {
  /** Short form shown in citations, for example "A. Salehiyan". */
  short: string;
  /** Given and family name for BibTeX and structured data. Leave empty if unknown. */
  given?: string;
  family?: string;
  me?: boolean;
};

export type Publication = {
  id: string;
  group: PublicationGroup;
  authors: Author[];
  title: string;
  /** Journal, proceedings, or preprint server. */
  venue?: string;
  volume?: string;
  issue?: string;
  /** Article number or page range. */
  pages?: string;
  year?: string;
  /** ISO date, only when the publisher states it. */
  datePublished?: string;
  /** Status line for items that are not published yet. */
  status?: string;
  doi?: string;
  /** Publisher landing page. */
  url?: string;
  /** Open-access PDF only. */
  pdf?: string;
  preprint?: string;
  code?: string;
  slides?: string;
  /** Slug of the matching project page. */
  project?: string;
  /** Show on the home page "Selected publications" list. */
  selected?: boolean;
};

export type Talk = {
  id: string;
  title: string;
  meeting: string;
  /** City and state. Leave empty if not confirmed. */
  city?: string;
  /** ISO date used for sorting. */
  sortDate: string;
  displayDate: string;
  type: "Talk" | "Poster";
  note?: string;
  slides?: string;
  /**
   * Optional photo from the event. To add one, put the file in /public/images/talks/
   * and fill in src, alt, width, and height (in pixels). Nothing is shown when this is missing.
   */
  image?: { src: string; alt: string; width: number; height: number };
};

export type ResearchTheme = {
  id: string;
  title: string;
  short: string;
  description: string;
  publicationIds: string[];
  projectSlugs: string[];
};

const me: Author = { short: "A. Salehiyan", given: "Ahmad", family: "Salehiyan", me: true };
const deep: Author = { short: "A. Deep", given: "Akash", family: "Deep" };

export const publications: Publication[] = [
  {
    id: "cmc-2026",
    group: "journal",
    authors: [
      me,
      { short: "N. Serrano", given: "Nuria", family: "Serrano" },
      { short: "F. Hernando-Gallego", given: "Francisco", family: "Hernando-Gallego" },
      { short: "D. Martín", given: "Diego", family: "Martín" },
      { short: "J. V. Álvarez-Bravo", given: "José Vicente", family: "Álvarez-Bravo" },
    ],
    title:
      "A Novel Evolutionary Optimized Transformer-Deep Reinforcement Learning Framework for False Data Injection Detection in Industry 4.0 Smart Water Infrastructures",
    venue: "Computers, Materials & Continua",
    volume: "87",
    issue: "2",
    pages: "68",
    year: "2026",
    datePublished: "2026-03-12",
    doi: "10.32604/cmc.2026.075336",
    url: "https://www.techscience.com/cmc/v87n2/66611",
    project: "transformer-anomaly-intrusion-detection",
    selected: true,
  },
  {
    id: "future-internet-2025",
    group: "journal",
    authors: [
      me,
      { short: "P. S. Moghaddam", given: "Pardis Sadatian", family: "Moghaddam" },
      { short: "M. Kaveh", given: "Masoud", family: "Kaveh" },
    ],
    title:
      "An Optimized Transformer–GAN–AE for Intrusion Detection in Edge and IIoT Systems: Experimental Insights from WUSTL-IIoT-2021, EdgeIIoTset, and TON_IoT Datasets",
    venue: "Future Internet",
    volume: "17",
    issue: "7",
    pages: "279",
    year: "2025",
    datePublished: "2025-06-24",
    doi: "10.3390/fi17070279",
    url: "https://www.mdpi.com/1999-5903/17/7/279",
    pdf: "https://www.mdpi.com/1999-5903/17/7/279/pdf",
    project: "transformer-anomaly-intrusion-detection",
    selected: true,
  },
  {
    id: "iise-2025",
    group: "conference",
    authors: [{ short: "P. Vaghfi Mohebbi", given: "Parisa", family: "Vaghfi Mohebbi" }, me, deep],
    title: "Disease Cluster Analysis in Electronic Health Records: Insights into Mortality and Comorbidity Patterns",
    venue: "Proceedings of the IISE Annual Conference & Expo",
    pages: "1-6",
    year: "2025",
    project: "disease-cluster-analysis-mimic-iv",
    selected: true,
  },
  {
    id: "deviation-informed",
    group: "review",
    authors: [me, { short: "J. Lee" }, { short: "M. Kim" }, deep],
    title: "Deviation-Informed Maintenance Planning: Cost Implications of Departures from Sensor-Based Optimal Policy",
    status: "Submitted to INFORMS Journal on Data Science, 2025.",
    project: "multi-sensor-pomdp-maintenance",
    selected: true,
  },
  {
    id: "pomdp-techrxiv-2024",
    group: "preprint",
    authors: [me, { short: "J. Lee" }, { short: "M. Kim" }, deep],
    title: "A Scalable POMDP-based Framework for Real-Time Maintenance Planning using Multiple Sensor Signals",
    venue: "TechRxiv",
    year: "2024",
    status: "TechRxiv preprint, 2024.",
    project: "multi-sensor-pomdp-maintenance",
  },
  {
    id: "hierpick-ssrn",
    group: "preprint",
    authors: [me, { short: "M. Masae" }, { short: "P. Vichitkunakorn" }, deep],
    title: "A Hierarchical Deep Q-Learning Approach for Picker Routing in Two-Block Warehouses",
    venue: "SSRN",
    status: "SSRN preprint No. 7052096.",
    preprint: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7052096",
    project: "hierarchical-ddqn-warehouse-routing",
    selected: true,
  },
  {
    id: "fleet-marl",
    group: "in-preparation",
    authors: [me, deep],
    title: "A Multi-Agent Framework for Scalable Fleet Maintenance Planning under System Constraints",
    status: "In preparation (dissertation work).",
    project: "multi-agent-fleet-maintenance",
  },
  {
    id: "multi-component-drl",
    group: "in-preparation",
    authors: [me, { short: "A. S. Dabas" }, deep],
    title:
      "Deep Reinforcement Learning Framework for Maintenance Planning in Multi-Component Systems with Stochastic Interdependence",
    status: "In preparation.",
  },
];

export const publicationGroups: { group: PublicationGroup; title: string }[] = [
  { group: "journal", title: "Journal articles" },
  { group: "conference", title: "Conference proceedings" },
  { group: "review", title: "Under review" },
  { group: "preprint", title: "Preprints" },
  { group: "in-preparation", title: "In preparation" },
];

export function isPublished(publication: Publication) {
  return publication.group === "journal" || publication.group === "conference";
}

export function getPublication(id: string) {
  return publications.find((publication) => publication.id === id);
}

export function selectedPublications() {
  // Published items first, then items under review, then preprints.
  const order: PublicationGroup[] = ["journal", "conference", "review", "preprint", "in-preparation"];
  return publications
    .filter((publication) => publication.selected)
    .sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group));
}

export const talks: Talk[] = [
  {
    id: "informs-2026",
    title: "Hierarchical Decision-Making for Condition-Based Maintenance of Large-Scale Fleets with Shared Resources",
    meeting: "INFORMS Annual Meeting",
    sortDate: "2026-11-01",
    displayDate: "Nov 1, 2026",
    type: "Talk",
    note: "Session SA20",
  },
  {
    id: "informs-2025",
    title: "A Multi-Agent Framework for Scalable Fleet Maintenance Planning under System Constraints",
    meeting: "INFORMS Annual Meeting",
    city: "Atlanta, GA",
    sortDate: "2025-10-01",
    displayDate: "2025",
    type: "Talk",
  },
  {
    id: "iise-2025",
    title: "Disease Cluster Analysis in Electronic Health Records: Insights into Mortality and Comorbidity Patterns",
    meeting: "IISE Annual Conference & Expo",
    city: "Atlanta, GA",
    sortDate: "2025-06-01",
    displayDate: "2025",
    type: "Talk",
  },
  {
    id: "rams-2025",
    title: "A Scalable Algorithm for Condition-Based Maintenance with High-Dimensional Sensor Data",
    meeting: "Reliability and Maintainability Symposium (RAMS)",
    city: "Miramar Beach, FL",
    sortDate: "2025-01-01",
    displayDate: "2025",
    type: "Talk",
  },
  {
    id: "informs-2024",
    title: "POMDP-Based Optimal Maintenance Planning Using Multiple Sensor Signals",
    meeting: "INFORMS Annual Meeting",
    city: "Seattle, WA",
    sortDate: "2024-10-01",
    displayDate: "Oct 2024",
    type: "Talk",
  },
  {
    id: "osu-symposium-2024",
    title: "POMDP-Based Optimal Maintenance Planning Using Multiple Sensor Signals",
    meeting: "OSU Student Research Symposium",
    city: "Stillwater, OK",
    sortDate: "2024-01-01",
    displayDate: "2024",
    type: "Poster",
    note: "3rd Place Award",
  },
];

export function sortedTalks(limit?: number) {
  const items = talks.slice().sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export const researchStatement: string[] = [
  "My research is about sequential decision-making under uncertainty in engineering systems. Many operational decisions must be made from noisy sensor data, with limited resources, and with consequences that unfold over time. I build models and algorithms that make these decisions in a principled way.",
  "My work has three themes. First, I study maintenance planning under partial observability. I model equipment health as a partially observable Markov decision process (POMDP) with multiple sensor signals, and in my dissertation I extend this to fleets with multi-agent reinforcement learning under safety constraints. Second, I use reinforcement learning for logistics. I designed a hierarchical deep Q-learning method for picker routing in two-block warehouses. Third, I apply machine learning to health data and industrial security, including comorbidity analysis of electronic health records and transformer-based intrusion detection.",
  "Across these themes I combine stochastic models, optimization, and deep reinforcement learning, and I evaluate methods in simulation and on benchmark and real-world data sets.",
];

export const researchThemes: ResearchTheme[] = [
  {
    id: "maintenance",
    title: "Sequential decision-making for maintenance under partial observability",
    short: "POMDP models for single machines and multi-agent reinforcement learning for fleets.",
    description:
      "Sensors give a noisy picture of equipment health. I model the maintenance problem as a POMDP with multiple sensor signals and derive control-limit policies for operate-versus-preventive-maintenance decisions. My dissertation extends this line to fleets, where many assets share limited resources, with multi-agent reinforcement learning.",
    publicationIds: ["deviation-informed", "pomdp-techrxiv-2024", "fleet-marl"],
    projectSlugs: ["multi-sensor-pomdp-maintenance", "multi-agent-fleet-maintenance"],
  },
  {
    id: "logistics",
    title: "Reinforcement learning for logistics",
    short: "Hierarchical deep Q-learning for warehouse picker routing.",
    description:
      "Order picking is a routing problem that must be solved many times a day. I decompose picker routing in two-block warehouses into aisle-level subproblems solved by dynamic programming, and a DDQN agent that decides the aisle sequence.",
    publicationIds: ["hierpick-ssrn"],
    projectSlugs: ["hierarchical-ddqn-warehouse-routing"],
  },
  {
    id: "health-security",
    title: "Machine learning for health data and industrial security",
    short: "Electronic health record analysis and transformer-based intrusion detection.",
    description:
      "I apply machine learning to large real-world data. In health data, I study comorbidity and mortality patterns in the MIMIC-IV electronic health records. In industrial security, I develop transformer-based deep learning models for intrusion detection and false data injection detection.",
    publicationIds: ["iise-2025", "future-internet-2025", "cmc-2026"],
    projectSlugs: ["disease-cluster-analysis-mimic-iv", "transformer-anomaly-intrusion-detection"],
  },
];

export const dissertation = {
  title: "Sequential Decision-Making Under Uncertainty in Smart Engineering Systems",
  advisor: "Dr. Akash Deep",
  summary:
    "My dissertation studies maintenance scheduling for heterogeneous fleets as a multi-agent problem. I am developing a two-phase hybrid safe multi-agent reinforcement learning (Safe-MARL) approach: soft constraints during exploration and hard constraints for enforcement. The work studies the trade-off between safety and learning in decentralized MARL.",
  status: "This work is in progress. I do not report results yet.",
  projectSlug: "multi-agent-fleet-maintenance",
};

export const futureAgenda =
  "My longer-term direction is heterogeneous multi-agent reinforcement learning that combines two kinds of guarantees: the resilience guarantees of fault-tolerant control and the constraint guarantees of safe reinforcement learning. I plan to study task allocation and resilient coordination, with autonomous robotic systems as a target application.";

export const jobMarketPaper = {
  publicationId: "fleet-marl",
  title: "A Multi-Agent Framework for Scalable Fleet Maintenance Planning under System Constraints",
  authors: "A. Salehiyan, A. Deep",
  status: "In preparation (dissertation work). Results are not reported yet.",
  abstract: [
    "Large fleets of heterogeneous assets must be maintained with shared and limited resources.",
    "This paper studies fleet maintenance scheduling as a decentralized multi-agent reinforcement learning problem with safety constraints.",
    "It proposes a two-phase hybrid Safe-MARL approach: soft constraints guide exploration in the first phase, and hard constraints enforce the limits in the second.",
    "The paper examines the trade-off between safety and learning in decentralized multi-agent reinforcement learning.",
  ],
  figure: "fleet-marl" as const,
  figureAlt:
    "Diagram of the two-phase hybrid Safe-MARL approach. Decentralized agents, one per asset in a heterogeneous fleet, share limited maintenance resources. Phase 1 uses soft constraints during exploration. Phase 2 enforces hard constraints.",
  links: [
    { label: "Project page", href: "/projects/multi-agent-fleet-maintenance" },
    { label: "Related talks", href: "/publications#talks" },
  ],
};
