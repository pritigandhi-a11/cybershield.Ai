import React from 'react';
import { RiskBand } from '../../types/risk';

interface RiskGaugeProps {
  score: number; // 0 - 100
  riskBand: RiskBand;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  subtitle?: string;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  riskBand,
  size = 'md',
  showLabel = true,
  subtitle
}) => {
  // Color determination
  const getColor = (s: number) => {
    if (s >= 75) return { stroke: '#ef4444', text: 'text-red-400', glow: 'shadow-red-500/30' };
    if (s >= 55) return { stroke: '#f97316', text: 'text-orange-400', glow: 'shadow-orange-500/30' };
    if (s >= 35) return { stroke: '#eab308', text: 'text-yellow-400', glow: 'shadow-yellow-500/30' };
    return { stroke: '#10b981', text: 'text-emerald-400', glow: 'shadow-emerald-500/30' };
  };

  const { stroke, text, glow } = getColor(score);

  const radius = size === 'lg' ? 70 : size === 'md' ? 52 : 36;
  const strokeWidth = size === 'lg' ? 12 : size === 'md' ? 9 : 7;
  const circumference = 2 * Math.PI * radius;
  // Arc angle (270 degrees arc)
  const arcLength = circumference * 0.75;
  const offset = arcLength - (score / 100) * arcLength;

  const width = size === 'lg' ? 180 : size === 'md' ? 140 : 100;
  const height = size === 'lg' ? 150 : size === 'md' ? 120 : 90;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative" style={{ width, height }}>
        <svg
          viewBox="0 0 160 140"
          className="w-full h-full transform -rotate-135"
        >
          {/* Background Track Arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Active Value Arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <span
            className={`font-black font-mono tracking-tight leading-none ${
              size === 'lg' ? 'text-4xl' : size === 'md' ? 'text-3xl' : 'text-xl'
            } ${text}`}
          >
            {score}
          </span>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
            / 100
          </span>
        </div>
      </div>

      {showLabel && (
        <div className="text-center mt-1">
          <span
            className={`inline-block px-2.5 py-0.5 text-xs font-mono font-extrabold uppercase rounded-full border ${
              riskBand === 'CRITICAL'
                ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
                : riskBand === 'HIGH'
                ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                : riskBand === 'MEDIUM'
                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}
          >
            {riskBand} RISK
          </span>
          {subtitle && <p className="text-[11px] text-slate-400 mt-1">{subtitle}</p>}
        </div>
      )}
    </div>
  );
};
