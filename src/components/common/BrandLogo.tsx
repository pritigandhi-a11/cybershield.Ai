import React from 'react';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showSubtitle?: boolean;
  showBadge?: boolean;
  badgeText?: string;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  showSubtitle = false,
  showBadge = false,
  badgeText = 'SIH 2026',
  className = '',
  onClick
}) => {
  const sizeMap = {
    xs: {
      img: 'w-6 h-6 rounded-lg',
      title: 'text-xs',
      sub: 'text-[9px]',
      badge: 'text-[8px] px-1 py-0.2'
    },
    sm: {
      img: 'w-8 h-8 rounded-xl',
      title: 'text-sm',
      sub: 'text-[10px]',
      badge: 'text-[9px] px-1.5 py-0.5'
    },
    md: {
      img: 'w-10 h-10 rounded-xl',
      title: 'text-base',
      sub: 'text-[11px]',
      badge: 'text-[10px] px-1.5 py-0.5'
    },
    lg: {
      img: 'w-14 h-14 rounded-2xl',
      title: 'text-xl',
      sub: 'text-xs',
      badge: 'text-xs px-2 py-0.5'
    },
    xl: {
      img: 'w-20 h-20 rounded-3xl',
      title: 'text-3xl',
      sub: 'text-sm',
      badge: 'text-xs px-2.5 py-1'
    }
  };

  const currentSize = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* 3D Glowing Brand Logo Image Container */}
      <div className="relative flex-shrink-0">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/40 via-blue-500/30 to-indigo-500/40 blur-sm opacity-80 group-hover:opacity-100 transition-all duration-300" />
        <div className={`relative overflow-hidden ${currentSize.img} border border-cyan-400/40 bg-slate-950/90 shadow-lg shadow-cyan-500/20 p-0.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
          <img
            src="/logo.jpg"
            alt="CyberShield.AI Logo"
            className="w-full h-full object-cover rounded-[inherit]"
            onError={(e) => {
              // Fallback to relative path if absolute fails
              (e.currentTarget as HTMLImageElement).src = '/logo.jpg';
            }}
          />
        </div>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className={`font-black tracking-tight ${currentSize.title} bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300`}>
              CyberShield<span className="text-cyan-400">.AI</span>
            </span>
            {showBadge && (
              <span className={`font-mono uppercase font-bold rounded border border-cyan-500/40 bg-cyan-500/15 text-cyan-300 shadow-sm shadow-cyan-500/20 ${currentSize.badge}`}>
                {badgeText}
              </span>
            )}
          </div>
          {showSubtitle && (
            <p className={`text-slate-400 font-medium ${currentSize.sub} leading-tight line-clamp-1`}>
              Continuous Cyber Risk Quantification & Risk-to-Rupee Optimization
            </p>
          )}
        </div>
      )}
    </div>
  );
};
