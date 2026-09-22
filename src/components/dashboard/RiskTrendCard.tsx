import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, Calendar, ArrowRight } from 'lucide-react';

interface RiskTrendCardProps {
  onNavigateTab: (tabId: string) => void;
}

export const RiskTrendCard: React.FC<RiskTrendCardProps> = ({ onNavigateTab }) => {
  const { riskState } = useSecurity();
  const { historicalTrend } = riskState;

  return (
    <div className="cyber-card p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Quantified Risk Trend Trajectory
            </h2>
            <p className="text-xs text-slate-400">
              30-day progression (DEMO / HISTORICAL SIMULATION) correlated with CVE disclosures and patch cycles
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 text-[10px] uppercase">
              Demo Simulation
            </span>
            <span className="px-2 py-0.5 rounded bg-red-500/15 text-red-300 border border-red-500/30 font-bold">
              +{riskState.delta7Days} pts (7-day delta)
            </span>
          </div>
        </div>

        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="dashRiskTrendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="timestamp"
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
              />
              <YAxis
                domain={[0, 100]}
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 shadow-xl text-xs font-mono">
                        <div className="text-slate-400">{data.timestamp}</div>
                        <div className="text-white font-bold mt-0.5">
                          Score: <span className="text-red-400">{data.score}/100</span>
                        </div>
                        {data.majorEvent && (
                          <div className="mt-1 pt-1 border-t border-slate-800 text-cyan-300 font-sans text-[11px]">
                            {data.majorEvent}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#ef4444"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#dashRiskTrendGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
        <span className="text-slate-400">
          Current Baseline: <strong className="text-red-400 font-mono">{riskState.overallScore}/100 ({riskState.riskBand})</strong>
        </span>

        <button
          onClick={() => onNavigateTab('risk-engine')}
          className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
        >
          View Full Analytics <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
