import type { FigureKey } from "@/lib/projects";

// Diagrams are drawn from the method descriptions only. They show structure, not results.
// Connectors are plain lines (no arrowheads). Flow reads from top to bottom.

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines?: string[];
  accent?: boolean;
};

function Box({ x, y, w, h, title, lines = [], accent = false }: BoxProps) {
  const total = 1 + lines.length;
  const lineHeight = 18;
  const startY = y + h / 2 - ((total - 1) * lineHeight) / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        className={accent ? "fill-card stroke-primary" : "fill-card stroke-border"}
        strokeWidth={accent ? 2 : 1.5}
      />
      <text x={x + w / 2} y={startY} textAnchor="middle" dominantBaseline="middle" className="fill-foreground" fontSize={15} fontWeight={600}>
        {title}
      </text>
      {lines.map((line, index) => (
        <text
          key={line}
          x={x + w / 2}
          y={startY + (index + 1) * lineHeight}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-muted-foreground"
          fontSize={13}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function Line({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-muted-foreground" strokeWidth={1.5} />;
}

function Label({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-primary" fontSize={12} fontWeight={600} letterSpacing={0.6}>
      {children}
    </text>
  );
}

function MimicFigure() {
  return (
    <>
      <Box x={40} y={10} w={360} h={64} title="MIMIC-IV cohort" lines={["179,524 adult patients, 846 diseases"]} />
      <Line x1={220} y1={74} x2={220} y2={98} />
      <Box x={40} y={98} w={360} h={64} title="Apriori association rule mining" lines={["Minimum support 0.01"]} />
      <Line x1={220} y1={162} x2={220} y2={186} />
      <Box x={40} y={186} w={360} h={64} title="628 association rules" lines={["Confidence above 50%"]} accent />
      <Line x1={220} y1={250} x2={220} y2={274} />
      <Box x={40} y={274} w={360} h={64} title="t-SNE and k-means clustering" lines={["k = 4, silhouette score 0.44"]} />
      <Line x1={220} y1={338} x2={220} y2={362} />
      <Box x={40} y={362} w={360} h={64} title="Cluster profiles" lines={["Mortality rate, age, gender"]} />
    </>
  );
}

function IntrusionFigure() {
  return (
    <>
      <Label x={220} y={16}>INTRUSION DETECTION (EDGE AND INDUSTRIAL IOT)</Label>
      <Box x={20} y={32} w={124} h={52} title="Transformer" />
      <Box x={158} y={32} w={124} h={52} title="GAN" />
      <Box x={296} y={32} w={124} h={52} title="Autoencoder" />
      <Line x1={82} y1={84} x2={82} y2={104} />
      <Line x1={220} y1={84} x2={220} y2={104} />
      <Line x1={358} y1={84} x2={358} y2={104} />
      <Line x1={82} y1={104} x2={358} y2={104} />
      <Line x1={220} y1={104} x2={220} y2={122} />
      <Box x={40} y={122} w={360} h={74} title="Hybrid detection framework" lines={["Evaluated on WUSTL-IIoT-2021,", "EdgeIIoTset, and TON_IoT"]} accent />

      <Label x={220} y={234}>FALSE DATA INJECTION (SMART WATER)</Label>
      <Box x={20} y={250} w={190} h={64} title="Transformer" />
      <Box x={230} y={250} w={190} h={64} title="Deep reinforcement" lines={["learning"]} />
      <Line x1={115} y1={314} x2={115} y2={334} />
      <Line x1={325} y1={314} x2={325} y2={334} />
      <Line x1={115} y1={334} x2={325} y2={334} />
      <Line x1={220} y1={334} x2={220} y2={352} />
      <Box x={40} y={352} w={360} h={74} title="Detection framework" lines={["Tuned with an evolutionary optimizer"]} accent />
    </>
  );
}

function HierpickFigure() {
  return (
    <>
      <Box x={40} y={10} w={360} h={64} title="Pick list in a two-block warehouse" lines={["Items to collect, by aisle"]} />
      <Line x1={220} y1={74} x2={220} y2={104} />
      <Label x={220} y={118}>UPPER LEVEL</Label>
      <Box x={40} y={132} w={360} h={72} title="DDQN agent" lines={["Decides the sequence of aisles"]} accent />
      <Line x1={220} y1={204} x2={220} y2={234} />
      <Label x={220} y={248}>LOWER LEVEL</Label>
      <Box x={40} y={262} w={360} h={72} title="Dynamic programming" lines={["Solves the routing subproblem in each aisle"]} />
      <Line x1={220} y1={334} x2={220} y2={362} />
      <Box x={40} y={362} w={360} h={64} title="Picker route" lines={["Total travel distance"]} />
    </>
  );
}

function PomdpFigure() {
  return (
    <>
      <Box x={20} y={10} w={124} h={56} title="Sensor 1" />
      <Box x={158} y={10} w={124} h={56} title="Sensor 2" />
      <Box x={296} y={10} w={124} h={56} title="Sensor n" />
      <Line x1={82} y1={66} x2={82} y2={88} />
      <Line x1={220} y1={66} x2={220} y2={88} />
      <Line x1={358} y1={66} x2={358} y2={88} />
      <Line x1={82} y1={88} x2={358} y2={88} />
      <Line x1={220} y1={88} x2={220} y2={110} />
      <Box x={40} y={110} w={360} h={72} title="Belief state" lines={["Estimate of the hidden health state"]} />
      <Line x1={220} y1={182} x2={220} y2={210} />
      <Box x={40} y={210} w={360} h={72} title="Control-limit policy" lines={["Compare the belief with a threshold"]} accent />
      <Line x1={220} y1={282} x2={220} y2={304} />
      <Line x1={115} y1={304} x2={325} y2={304} />
      <Line x1={115} y1={304} x2={115} y2={326} />
      <Line x1={325} y1={304} x2={325} y2={326} />
      <Box x={20} y={326} w={190} h={64} title="Operate" lines={["Keep running"]} />
      <Box x={230} y={326} w={190} h={64} title="Preventive maintenance" lines={["Maintain now"]} />
    </>
  );
}

function FleetFigure() {
  return (
    <>
      <Label x={220} y={16}>HETEROGENEOUS FLEET, ONE AGENT PER ASSET</Label>
      <Box x={20} y={32} w={124} h={56} title="Agent 1" />
      <Box x={158} y={32} w={124} h={56} title="Agent 2" />
      <Box x={296} y={32} w={124} h={56} title="Agent n" />
      <Line x1={82} y1={88} x2={82} y2={110} />
      <Line x1={220} y1={88} x2={220} y2={110} />
      <Line x1={358} y1={88} x2={358} y2={110} />
      <Line x1={82} y1={110} x2={358} y2={110} />
      <Line x1={220} y1={110} x2={220} y2={132} />
      <Box x={40} y={132} w={360} h={64} title="Shared maintenance resources" lines={["Limited, and shared by all assets"]} />
      <Line x1={220} y1={196} x2={220} y2={224} />
      <Box x={40} y={224} w={360} h={72} title="Phase 1: exploration" lines={["Soft constraints"]} />
      <Line x1={220} y1={296} x2={220} y2={324} />
      <Box x={40} y={324} w={360} h={72} title="Phase 2: enforcement" lines={["Hard constraints"]} accent />
    </>
  );
}

const figures: Record<FigureKey, { height: number; render: () => JSX.Element }> = {
  mimic: { height: 436, render: MimicFigure },
  intrusion: { height: 436, render: IntrusionFigure },
  hierpick: { height: 436, render: HierpickFigure },
  pomdp: { height: 400, render: PomdpFigure },
  "fleet-marl": { height: 406, render: FleetFigure },
};

type ProjectFigureProps = {
  figure: FigureKey;
  alt: string;
  caption?: string;
  id: string;
};

export function ProjectFigure({ figure, alt, caption, id }: ProjectFigureProps) {
  const { height, render: Figure } = figures[figure];
  return (
    <figure className="mx-auto w-full max-w-[520px]">
      <svg viewBox={`0 0 440 ${height}`} role="img" aria-labelledby={`${id}-title`} className="h-auto w-full" xmlns="http://www.w3.org/2000/svg">
        <title id={`${id}-title`}>{alt}</title>
        <Figure />
      </svg>
      {caption ? <figcaption className="mt-3 text-center text-sm text-muted-foreground">{caption}</figcaption> : null}
    </figure>
  );
}
