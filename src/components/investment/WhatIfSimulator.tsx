import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { ArrowRight, Sparkles, TrendingDown, Info, AlertTriangle } from 'lucide-react';
import { RiskGauge } from '../common/RiskGauge';

export const WhatIfSimulator: React.FC = () => {
  const { riskState, investmentScenario, budgetOptimizationCurve, budgetINR } = useSecurity();

  return (
    <div className="space-y-6">
      {/* Before vs After Side-by-Side Comparison */}
      <div className="cyber-card-glow p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              What-If Scenario Simulation: Before vs. After
            </h2>
            <p className="text-xs text-slate-400">
              Visualizes organizational risk shift resulting from the selected ₹{(budgetINR / 100000).toFixed(1)} Lakhs security package
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Current State (Before) */}
          <div className="md:col-span-5 p-4 rounded-xl bg-slate-950/80 border border-red-500/30 flex flex-col items-center text-center">
            <span className="text-[11px] font-mono uppercase font-bold text-red-400 mb-2">
              Current Baseline Posture
            </span>
            <RiskGauge
              score={riskState.overallScore}
              riskBand={riskState.riskBand}
              size="md"
              showLabel={true}
            />
            <div className="mt-3 text-xs text-slate-400 space-y-1">
              <div>Vulnerability Exposure: <strong className="text-red-400">{riskState.factors.vulnerabilityExposure.score}/100</strong></div>
              <div>Controls Gap: <strong className="text-red-400">{riskState.factors.securityControlsGap.score}/100</strong></div>
            </div>
          </div>

          {/* Delta Arrow */}
          <div className="md:col-span-1 flex flex-col items-center justify-center text-center">
            <div className="p-3 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 shadow-lg">
              <ArrowRight className="w-5 h-5 hidden md:block" />
              <TrendingDown className="w-5 h-5 md:hidden text-emerald-400" />
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-400 mt-1">
              -{investmentScenario.totalModeledReduction} pts
            </span>
          </div>

          {/* Projected State (After) */}
          <div className="md:col-span-5 p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex flex-col items-center text-center">
            <span className="text-[11px] font-mono uppercase font-bold text-emerald-400 mb-2">
              Projected Post-Remediation Posture
            </span>
            <RiskGauge
              score={investmentScenario.projectedRiskScore}
              riskBand={investmentScenario.projectedRiskBand}
              size="md"
              showLabel={true}
            />
            <div className="mt-3 text-xs text-slate-400 space-y-1">
              <div>Allocated Capital: <strong className="text-emerald-400">₹{(investmentScenario.allocatedBudgetINR / 100000).toFixed(2)}L</strong></div>
              <div>Projected Status: <strong className="text-emerald-300 font-bold">{investmentScenario.projectedRiskBand} RISK</strong></div>
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="mt-4 p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2 text-[11px] text-slate-400">
          <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Methodology Note:</strong> Modeled risk reduction is an empirical estimate calculated from CVSS scores, asset criticality hierarchy, and control coverage. It is a decision-support metric, not a guaranteed commercial warranty.
          </span>
        </div>
      </div>

      {/* Diminishing Returns Pareto Curve */}
      <div className="cyber-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Diminishing Returns Curve (Risk vs. Capital Allocation)
            </h2>
            <p className="text-xs text-slate-400">
              Pareto efficiency frontier: Identifies the sweet-spot budget before marginal risk reduction diminishes
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-semibold">
            Knapsack Optimization Curve
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={budgetOptimizationCurve} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="budgetFormatted"
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              />
              <YAxis
                domain={[10, 80]}
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-3 rounded-lg bg-slate-900 border border-cyan-500/40 shadow-2xl text-xs font-mono">
                        <p className="text-cyan-300 font-bold">Budget: {data.budgetFormatted}</p>
                        <p className="text-white">Projected Risk: <strong className="text-emerald-400">{data.projectedRiskScore}/100</strong></p>
                        <p className="text-slate-400">Interventions: {data.actionsCount} Actions</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="projectedRiskScore"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 4 }}
                activeDot={{ r: 6, fill: '#38bdf8' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
