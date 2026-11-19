# Ahmad Salehiyan — organized website record

Collected November 19, 2026 from all 18 pages listed in the live website sitemap, with the downloadable academic CV retained alongside the record. This document organizes what the website says; it is not an independent verification, a Wikipedia article, or a claim that all listed work is complete. Full page text and outbound links are preserved in `FULL-WEBSITE-TEXT.md` and `pages.json`.

## Identity and current research

Sources: [Homepage](https://www.salehiyan.com/), [Research](https://www.salehiyan.com/research), [CV](https://www.salehiyan.com/cv).

- Name: Ahmad Salehiyan.
- Current title: Ph.D. Candidate, Industrial Engineering and Management, Oklahoma State University.
- Advisor: Dr. Akash Deep.
- Main focus: reinforcement learning and optimization for sequential decision-making under uncertainty.
- Applications: maintenance planning, warehouse logistics, health data, and industrial security.
- Methods: POMDPs, deep and multi-agent reinforcement learning, stochastic optimization, and statistical modeling.
- Dissertation proposal: **Sequential Decision-Making Under Uncertainty in Smart Engineering Systems**.
- Proposal defense reported passed: October 19, 2026.
- Seeking postdoctoral, faculty, and industry research positions; full-time availability June 2027, with U.S. relocation open. These are stated plans, not completed appointments.

## Education

Source: [Homepage education section](https://www.salehiyan.com/#education).

| Program | Institution | Dates/status stated on the website | Focus/advisor |
|---|---|---|---|
| Ph.D., Industrial Engineering and Management | Oklahoma State University | Fall 2023–present; expected Summer 2027 | Dissertation proposal above; Akash Deep |
| M.S., Applied Statistics | Oklahoma State University | Concurrent; expected Fall 2026 | Experimental design, R/SAS, data analytics, statistical inference |
| M.S., Industrial Engineering | K. N. Toosi University of Technology, Tehran | 2019–2022 | Predictive Maintenance of Advanced Industrial Machines Using AI Techniques; Abdollah Aghaie |
| B.S., Industrial Engineering | Azad University, Qazvin | 2014–2019 | Industrial engineering |

The expected degrees are not recorded here as awarded. The independent OSU student directory checked earlier lists different prior-degree end dates; that discrepancy remains unresolved. This table faithfully records the personal website.

## Research papers — eight entries, separated by status

Source: [Publications and talks](https://www.salehiyan.com/publications).

### Published journal articles — two

1. **A Novel Evolutionary Optimized Transformer-Deep Reinforcement Learning Framework for False Data Injection Detection in Industry 4.0 Smart Water Infrastructures.** A. Salehiyan, N. Serrano, F. Hernando-Gallego, D. Martín, J. V. Álvarez-Bravo. *Computers, Materials & Continua*, 87(2), 68, 2026. [DOI](https://doi.org/10.32604/cmc.2026.075336).
2. **An Optimized Transformer–GAN–AE for Intrusion Detection in Edge and IIoT Systems: Experimental Insights from WUSTL-IIoT-2021, EdgeIIoTset, and TON_IoT Datasets.** A. Salehiyan, P. S. Moghaddam, M. Kaveh. *Future Internet*, 17(7), 279, 2025. [DOI](https://doi.org/10.3390/fi17070279).

### Published conference proceedings — one

3. **Disease Cluster Analysis in Electronic Health Records: Insights into Mortality and Comorbidity Patterns.** P. Vaghfi Mohebbi, A. Salehiyan, A. Deep. *Proceedings of the IISE Annual Conference & Expo*, pp. 1–6, 2025.

### Under review — one

4. **Deviation-Informed Maintenance Planning: Cost Implications of Departures from Sensor-Based Optimal Policy.** A. Salehiyan, J. Lee, M. Kim, A. Deep. Listed as submitted to *INFORMS Journal on Data Science*, 2025. Not presented as accepted or published.

### Preprints — two

5. **A Scalable POMDP-based Framework for Real-Time Maintenance Planning using Multiple Sensor Signals.** A. Salehiyan, J. Lee, M. Kim, A. Deep. TechRxiv preprint, 2024.
6. **A Hierarchical Deep Q-Learning Approach for Picker Routing in Two-Block Warehouses.** A. Salehiyan, M. Masae, P. Vichitkunakorn, A. Deep. SSRN preprint No. 7052096. The website does not display a year in this entry.

### In preparation — two

7. **A Multi-Agent Framework for Scalable Fleet Maintenance Planning under System Constraints.** A. Salehiyan, A. Deep. Dissertation work and job-market paper; no results reported yet.
8. **Deep Reinforcement Learning Framework for Maintenance Planning in Multi-Component Systems with Stochastic Interdependence.** A. Salehiyan, A. S. Dabas, A. Deep. In preparation.

## Five research projects

### 1. Multi-Agent Fleet Maintenance with Safe Reinforcement Learning

[Project page](https://www.salehiyan.com/projects/multi-agent-fleet-maintenance).

- Status: ongoing dissertation research; manuscript in preparation; no numerical results or deployment claimed.
- Problem: heterogeneous assets competing for limited maintenance resources under safety constraints.
- Approach: decentralized agents, with soft constraints during exploration and hard constraints during enforcement.
- Tools: PettingZoo, Gymnasium, Ray RLlib, MAPPO, Python.
- Stated role: designing the method and building the simulation/training pipeline, advised by Akash Deep.
- Limitations: no claimed numerical improvement or safety guarantee; operational transfer requires validation of the simulator and assumptions.

### 2. Hierarchical Deep Reinforcement Learning for Warehouse Picker Routing

[Project page](https://www.salehiyan.com/projects/hierarchical-ddqn-warehouse-routing).

- Status: SSRN preprint.
- Approach: dynamic programming for aisle-level subproblems; a Double Deep Q-Network selects aisle sequence in two-block warehouses.
- Reported result: **3.0%–15.4% shorter total travel distance** versus S-shape and largest-gap heuristics in the evaluated settings.
- Stated role: lead author; built the framework and ran training on a dual-GPU workstation.
- Coauthors: M. Masae, P. Vichitkunakorn, A. Deep.
- Limitations: result is travel-distance reduction, not demonstrated labor-cost savings or proof of optimality; no production deployment or public implementation linked.

### 3. Multi-Sensor Condition-Based Maintenance under Partial Observability

[Project page](https://www.salehiyan.com/projects/multi-sensor-pomdp-maintenance).

- Status: 2024 TechRxiv preprint and related submitted manuscript.
- Approach: POMDP equipment-health model, control-limit policies, belief-state aggregation, and state-space compression.
- Decision: continue operating versus preventive maintenance using multiple noisy sensor signals.
- Website reports validation on synthetic data and real condition-monitoring signals.
- Stated role: lead author; designed and implemented the framework with J. Lee, M. Kim, A. Deep.
- Limitations: policy structure depends on model assumptions; degradation, observation noise, and cost models require validation for new assets. This is model-based POMDP work, distinct from the fleet MARL project.

### 4. Disease Cluster Analysis in Electronic Health Records (MIMIC-IV)

[Project page](https://www.salehiyan.com/projects/disease-cluster-analysis-mimic-iv).

- Status: IISE conference proceedings and talk, 2025.
- Cohort stated: **179,524 unique adult patients**, ages 18–91; **11,733 mortality cases** and **846 diseases**.
- Apriori minimum support: 0.01; **628 association rules** with confidence above 50%.
- t-SNE followed by k-means; **four clusters**, silhouette score **0.44**.
- Cluster profiles: mortality rate, age, and gender.
- Stated role: coauthor with P. Vaghfi Mohebbi and A. Deep; part of computation used OSU HPC resources.
- Code is described as shareable. Restricted MIMIC-IV patient data are not publicly supplied by the site.

### 5. Transformer-Based Deep Learning for Anomaly and Intrusion Detection

[Project page](https://www.salehiyan.com/projects/transformer-anomaly-intrusion-detection).

- Status: two published journal articles, 2025 and 2026.
- First framework: transformer + GAN + autoencoder for industrial intrusion detection.
- Evaluation datasets: WUSTL-IIoT-2021, EdgeIIoTset, TON_IoT.
- Second framework: transformer + deep reinforcement learning, tuned with an evolutionary optimizer, for false-data-injection detection in smart water infrastructure.
- Tools: PyTorch, transformers, GANs, autoencoders, deep reinforcement learning.
- Stated role: first author of both articles; developed frameworks with coauthors.

## Earlier work — three entries

Source: [Projects](https://www.salehiyan.com/projects#earlier-work).

- **Maintenance Reporting System (2022–2023):** structured maintenance-performance reporting to support planning.
- **Integer Programming for Planning Decisions (2021–2024):** GAMS models and worked examples of Benders, branch-and-bound, and Dantzig–Wolfe methods.
- **Machine Learning for Maintenance and Decision Support (2021–2024):** supervised, unsupervised, and reinforcement-learning examples for industrial and maintenance applications.

## Professional experience

Source: [Homepage](https://www.salehiyan.com/).

| Role | Organization | Period | Work described |
|---|---|---|---|
| Graduate Research Assistant | Oklahoma State University | August 2023–present | POMDP maintenance framework, hierarchical DDQN routing, MIMIC-IV study; advisor Akash Deep |
| Graduate Teaching Assistant | Oklahoma State University | 2025–present | Engineering computing labs and engineering economics help sessions |
| Research Assistant | K. N. Toosi University of Technology | October 2018–April 2020 | Time-domain, frequency-domain, and wavelet sensor features for early machinery fault detection |
| Industrial Engineer | Karin Crane Company | April–October 2019 | Process improvements, workflow documentation, resource planning, scheduling, and quality control |

## Teaching — two listed courses

Source: [Teaching](https://www.salehiyan.com/teaching).

- **ENGR 1412 Introductory Engineering Computer Programming — Spring and Fall 2026.** Graduate Teaching Assistant and Lab Instructor: Excel lab instruction, weekly assignments, grading, and help sessions.
- **Engineering Economics — Summer 2026.** Graduate Teaching Assistant: course help sessions, concept explanations, and problem-solving support.

Older cached descriptions of other teaching terms were not substituted for the current live record.

## Talks and presentations — six entries

Source: [Publications and talks](https://www.salehiyan.com/publications).

| Date | Presentation | Venue/status |
|---|---|---|
| November 1, 2026 | Hierarchical Decision-Making for Condition-Based Maintenance of Large-Scale Fleets with Shared Resources | INFORMS Annual Meeting, session SA20; talk |
| 2025 | A Multi-Agent Framework for Scalable Fleet Maintenance Planning under System Constraints | INFORMS Annual Meeting, Atlanta; talk |
| 2025 | Disease Cluster Analysis in Electronic Health Records: Insights into Mortality and Comorbidity Patterns | IISE Annual Conference & Expo, Atlanta; talk |
| 2025 | A Scalable Algorithm for Condition-Based Maintenance with High-Dimensional Sensor Data | RAMS, Miramar Beach; talk |
| October 2024 | POMDP-Based Optimal Maintenance Planning Using Multiple Sensor Signals | INFORMS Annual Meeting, Seattle; talk |
| 2024 | POMDP-Based Optimal Maintenance Planning Using Multiple Sensor Signals | OSU Student Research Symposium, Stillwater; poster, third place |

## Awards, service, leadership, and training

Source: [Homepage](https://www.salehiyan.com/).

- Award listed: third place, Graduate Poster Category, OSU Student Research Symposium, 2024.
- Peer-review service listed: seven ORCID-recorded reviews — six for *Computers & Electrical Engineering*, one for *Water Research*.
- Memberships: INFORMS since 2024; IISE and IISE Reliability and Maintenance Society since 2024; SME.
- President, Iranian Student Association (IRSA), Oklahoma State University, 2025–present; described as second year.
- Co-founder and executive, ISA-Alliance, described as a national network of Iranian student associations.
- Additional training listed: ISO 9001:2015 Quality Management Systems.

These roles and distinctions are transcribed from the site. They are not independently adjudicated here.

## Technical skills

Source: [Homepage skills](https://www.salehiyan.com/#skills).

- **Reinforcement learning / decisions:** DQN/DDQN, MAPPO, MDP/POMDP, value and policy iteration, Ray RLlib, PettingZoo, Gymnasium.
- **Machine learning:** PyTorch, transformers, GANs, autoencoders, scikit-learn, anomaly detection, clustering, t-SNE, association-rule mining.
- **Optimization:** mixed-integer and linear programming, Benders and Lagrangian decomposition, Monte Carlo simulation, Pyomo, GAMS.
- **Statistics:** R, SAS, experimental design, statistical inference, Hawkes processes.
- **Data and computation:** Python, SQL/PostgreSQL, Spark/PySpark (explicitly coursework level), HPC, GPU training, Git, LaTeX, Julia.
- **Visualization:** Power BI, Tableau, Excel.

## Public technical writing — four articles

Source: [Writing](https://www.salehiyan.com/insights).

1. [Reinforcement Learning for Maintenance Planning: States, Rewards, and Constraints](https://www.salehiyan.com/insights/reinforcement-learning-maintenance-planning).
2. [Machine Learning for Industrial Reliability: From Theory to Deployment](https://www.salehiyan.com/insights/machine-learning).
3. [Integer Programming for High-Stakes Planning Decisions](https://www.salehiyan.com/insights/integer-programming).
4. [Maintenance Management Systems That Scale with Operational Complexity](https://www.salehiyan.com/insights/maintenance-management).

These are website explainers, not four additional peer-reviewed papers. The maintenance RL article includes a deliberately hypothetical cost example. It was prepared with assistant help in this conversation; its presence on the website does not make it independent reporting or human-only writing.

## Public professional profiles

- [Official website](https://www.salehiyan.com/)
- [Google Scholar](https://scholar.google.com/citations?user=_-hRiskAAAAJ)
- [ORCID](https://orcid.org/0009-0009-2877-8715)
- [LinkedIn](https://www.linkedin.com/in/ahmad-salehiyan)
- [GitHub](https://github.com/AhmadSalehiyan1994)
- [Academic CV download](https://www.salehiyan.com/files/Ahmad-Salehiyan-CV.pdf)

## Future directions, not completed achievements

The research page describes a future agenda combining fault-tolerant control and safe reinforcement learning for heterogeneous multi-agent systems, task allocation, resilient coordination, and autonomous robotics. The dissertation and two in-preparation manuscripts remain ongoing. Expected graduation and job-market availability are plans.

## Coverage and use

The collection covers the 18 sitemap pages: homepage; research; publications; projects index; five project details; teaching; writing index; four published articles; CV; contact; and privacy. Contact and privacy pages are retained in the full capture but do not add research achievements. Hidden drafts and administrative/API routes were not treated as public accomplishments.

This record can support a CV review, personal biography, or a human editor's source assessment. Website assertions alone are not independent evidence of Wikipedia notability. No Wikipedia submission or website modification was performed in this collection task.
