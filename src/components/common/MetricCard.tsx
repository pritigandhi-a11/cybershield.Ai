import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  delta?: {
    value: string;
    isPositiveGood: boolean;
    isIncrease: boolean;
  };
  highlightColor?: 'cyan' | 'red' | 'emerald' | 'amber' | 'purple';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  delta,
  highlightColor = 'cyan'
}) => {
  const colorMap = {
    cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    red: 'text-red-400 border-red-500/30 bg-red-500/10',
    emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    amber: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    purple: 'text-purple-400 border-purple-500/30 bg-purple-500/10'
  };

  return (
    <div className="cyber-card p-4 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
            {title}
          </span>
          <div className="text-2xl font-black font-mono tracking-tight text-white mt-1">
            {value}
          </div>
        </div>
        <div className={`p-2 rounded-xl border ${colorMap[highlightColor]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        {subtitle && <span className="text-slate-400">{subtitle}</span>}
        {delta && (
          <span
            className={`font-mono font-semibold px-1.5 py-0.5 rounded text-[11px] ${
              (delta.isIncrease && !delta.isPositiveGood) || (!delta.isIncrease && delta.isPositiveGood)
                ? 'bg-red-500/15 text-red-300'
                : 'bg-emerald-500/15 text-emerald-300'
            }`}
          >
            {delta.isIncrease ? '▲' : '▼'} {delta.value}
          </span>
        )}
      </div>
    </div>
  );
};
