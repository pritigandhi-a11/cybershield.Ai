import React from 'react';
import { SeverityLevel } from '../../types/security';

interface SeverityBadgeProps {
  severity: SeverityLevel;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  const styles: Record<SeverityLevel, string> = {
    CRITICAL: 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse',
    HIGH: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    MEDIUM: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    LOW: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    INFO: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${styles[severity]}`}>
      {severity}
    </span>
  );
};

interface ExposureBadgeProps {
  level: 'INTERNET_FACING' | 'INTERNAL_DMZ' | 'ISOLATED_VLAN';
}

export const ExposureBadge: React.FC<ExposureBadgeProps> = ({ level }) => {
  const map = {
    INTERNET_FACING: { label: 'Public Internet Edge', style: 'bg-red-500/15 text-red-300 border-red-500/30' },
    INTERNAL_DMZ: { label: 'Internal DMZ', style: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
    ISOLATED_VLAN: { label: 'Air-Gapped VLAN', style: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' }
  };

  const item = map[level];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border ${item.style}`}>
      {item.label}
    </span>
  );
};
