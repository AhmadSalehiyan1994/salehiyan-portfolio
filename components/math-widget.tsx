"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type FormulaType = "exponentialReliability" | "custom";

type VariableDefinition = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
  valueFormatter?: (value: number) => string;
};

type MathWidgetProps = {
  title: string;
  description: string;
  equationText: string;
  formula: FormulaType;
  variables: VariableDefinition[];
  xVariableKey: string;
  xAxisLabel: string;
  yAxisLabel: string;
  resultLabel?: string;
  sampleCount?: number;
  yDomain?: [number, number];
  accentColor?: string;
  formulaOptions?: {
    lambdaKey?: string;
  };
  computeY?: (variables: Record<string, number>, x: number) => number;
  resultFormatter?: (value: number) => string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function defaultComputeY(
  formula: FormulaType,
  variables: Record<string, number>,
  x: number,
  formulaOptions?: { lambdaKey?: string },
) {
  if (formula === "exponentialReliability") {
    const lambdaKey = formulaOptions?.lambdaKey || "lambda";
    const lambda = clamp(variables[lambdaKey] ?? 0.001, 0.000001, 10);
    return Math.exp(-lambda * x);
  }

  return 0;
}

export function MathWidget({
  title,
  description,
  equationText,
  formula,
  variables,
  xVariableKey,
  xAxisLabel,
  yAxisLabel,
  resultLabel = "Result",
  sampleCount = 50,
  yDomain = [0, 1],
  accentColor = "#AF423A",
  formulaOptions,
  computeY,
  resultFormatter,
}: MathWidgetProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [values, setValues] = useState<Record<string, number>>(() =>
    variables.reduce<Record<string, number>>((acc, variable) => {
      acc[variable.key] = variable.defaultValue;
      return acc;
    }, {}),
  );

  const maxX = clamp(values[xVariableKey] ?? 1, 0.000001, Number.MAX_SAFE_INTEGER);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const calculator = useMemo(
    () =>
      computeY ||
      ((nextValues: Record<string, number>, x: number) => defaultComputeY(formula, nextValues, x, formulaOptions)),
    [computeY, formula, formulaOptions],
  );

  const outputValue = useMemo(() => {
    return calculator(values, maxX);
  }, [calculator, maxX, values]);

  const points = useMemo(() => {
    const pointList: Array<{ x: number; y: number }> = [];
    for (let index = 0; index <= sampleCount; index += 1) {
      const x = (index / sampleCount) * maxX;
      pointList.push({ x, y: calculator(values, x) });
    }
    return pointList;
  }, [calculator, maxX, sampleCount, values]);

  return (
    <div className="rounded-lg border border-border bg-card/50 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          <p className="mt-2 text-xs font-medium text-foreground/80">{equationText}</p>
        </div>
        <div className="rounded-md border border-border bg-background/60 px-3 py-2 text-sm">
          <span className="text-muted-foreground">{resultLabel} = </span>
          <span className="font-semibold text-foreground">
            {resultFormatter ? resultFormatter(outputValue) : outputValue.toFixed(3)}
          </span>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          {variables.map((variable) => (
            <label key={variable.key} className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {variable.label}
              </span>
              <input
                type="range"
                min={variable.min}
                max={variable.max}
                step={variable.step}
                value={values[variable.key]}
                onChange={(event) => {
                  const numericValue = Number(event.target.value);
                  setValues((previous) => ({ ...previous, [variable.key]: numericValue }));
                }}
                onInput={(event) => {
                  const numericValue = Number((event.target as HTMLInputElement).value);
                  setValues((previous) => ({ ...previous, [variable.key]: numericValue }));
                }}
                className="mt-2 w-full accent-primary"
              />
              <div className="mt-1 text-sm text-muted-foreground">
                {variable.key} = {variable.valueFormatter ? variable.valueFormatter(values[variable.key]) : values[variable.key].toFixed(3)}
                {variable.unit ? ` ${variable.unit}` : ""}
              </div>
            </label>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-background/60 p-4">
          <div className="h-[180px] w-full">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={points} margin={{ top: 8, right: 16, left: 6, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="x"
                    type="number"
                    domain={[0, maxX]}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    tickFormatter={(value) => Number(value).toFixed(0)}
                    label={{ value: xAxisLabel, position: "insideBottom", offset: -6, fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  />
                  <YAxis
                    dataKey="y"
                    type="number"
                    domain={yDomain}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    tickFormatter={(value) => Number(value).toFixed(2)}
                    label={{ value: yAxisLabel, angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      const numeric = typeof value === "number" ? value : Number(value ?? 0);
                      if (String(name) === "y") return [numeric.toFixed(4), yAxisLabel];
                      return [numeric.toFixed(2), xAxisLabel];
                    }}
                    labelFormatter={(label) => `t = ${Number(label).toFixed(2)}`}
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--card))",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="y"
                    stroke={accentColor}
                    strokeWidth={2.5}
                    dot={false}
                    isAnimationActive
                    animationDuration={250}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full rounded-md bg-muted/30" />
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            This widget is reusable. You can embed it in any page or case study with different variables, labels, and formulas.
          </p>
        </div>
      </div>
    </div>
  );
}
