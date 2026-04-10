"use client";

import { MathWidget } from "@/components/math-widget";

export function ReliabilityCurveDemo() {
  return (
    <MathWidget
      title="Reliability curve quick demo"
      description="Exponential model: R(t) = exp(-λt). Adjust λ and time to see the impact."
      equationText="R(t) = e^(-λt)"
      formula="exponentialReliability"
      xVariableKey="time"
      xAxisLabel="Time horizon (hours)"
      yAxisLabel="Reliability R(t)"
      resultLabel="R(t)"
      formulaOptions={{ lambdaKey: "lambda" }}
      variables={[
        {
          key: "lambda",
          label: "Failure rate (λ) per hour",
          min: 0.001,
          max: 0.08,
          step: 0.001,
          defaultValue: 0.02,
          unit: "/hour",
          valueFormatter: (value) => value.toFixed(3),
        },
        {
          key: "time",
          label: "Time horizon",
          min: 12,
          max: 240,
          step: 6,
          defaultValue: 72,
          unit: "hours",
          valueFormatter: (value) => value.toFixed(0),
        },
      ]}
      resultFormatter={(value) => value.toFixed(3)}
      accentColor="#AF423A"
    />
  );
}
