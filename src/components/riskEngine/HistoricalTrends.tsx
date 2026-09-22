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
import { TrendingUp, Calendar } from 'lucide-react';

export const HistoricalTrends: React.FC = () => {
  const { riskState } = useSecurity();
  const { historicalTrend } = riskState;

  return (
    <div className="cyber-card p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            30-Day Risk Quantification Trajectory
          </h2>
          <p className="text-xs text-slate-400">
            Historical progression (DEMO / HISTORICAL SIMULATION) of enterprise risk score correlated with CVE disclosures and patch cycles
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 text-[10px] uppercase">
            Demo Simulation
          </span>
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>Last 30 Days</span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={historicalTrend} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="riskTrendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="timestamp"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
            />
            <YAxis
              domain={[0, 100]}
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 shadow-2xl text-xs font-mono">
                      <div className="text-slate-400 mb-1">{data.timestamp}</div>
                      <div className="text-white font-bold">
                        Score: <span className="text-red-400">{data.score}/100</span>
                      </div>
                      <div className="text-slate-400">
                        Active Incidents: {data.incidentCount}
                      </div>
                      {data.majorEvent && (
                        <div className="mt-1 pt-1 border-t border-slate-800 text-cyan-300 font-sans">
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
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#riskTrendGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
