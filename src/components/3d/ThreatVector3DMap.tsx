import React, { useEffect, useRef, useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { ATTACK_SCENARIOS, AttackScenario } from '../../services/telemetryService';
import { Radio, ShieldAlert, Zap, Flame, Cpu, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

export const ThreatVector3DMap: React.FC = () => {
  const { organization, simulateAttack, riskState } = useSecurity();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    // 4 stages along the pipeline
    const stages = [
      { name: 'Adversary Threat Vector', sub: 'MITRE ATT&CK', xRatio: 0.12, color: '#f43f5e' },
      { name: 'Public Internet / CDN', sub: 'Edge Perimeter', xRatio: 0.38, color: '#f59e0b' },
      { name: 'WAF / EDR Inspection', sub: 'Defense Barrier', xRatio: 0.65, color: '#06b6d4' },
      { name: 'Core Critical Assets', sub: 'Institutional Target', xRatio: 0.90, color: '#a855f7' }
    ];

    // Animated particle streams
    const particles = Array.from({ length: 18 }, (_, i) => ({
      progress: (i / 18),
      speed: 0.006 + (i % 3) * 0.002,
      yOffset: (Math.sin(i) * 14)
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const cy = h / 2;

      step += 0.02;

      // Draw horizontal glowing vector backbone
      const lineGrad = ctx.createLinearGradient(0, cy, w, cy);
      lineGrad.addColorStop(0, 'rgba(244, 63, 94, 0.4)');
      lineGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.6)');
      lineGrad.addColorStop(1, 'rgba(168, 85, 247, 0.4)');

      ctx.beginPath();
      ctx.moveTo(w * 0.1, cy);
      ctx.lineTo(w * 0.92, cy);
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw animated particle pulses along the line
      particles.forEach(p => {
        p.progress = (p.progress + p.speed) % 1;
        const startX = w * 0.1;
        const endX = w * 0.92;
        const px = startX + (endX - startX) * p.progress;
        const py = cy + p.yOffset;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.progress < 0.5 ? '#f43f5e' : '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Stages / Gateways
      stages.forEach(s => {
        const sx = w * s.xRatio;

        // Stage outer ring
        ctx.beginPath();
        ctx.arc(sx, cy, 22, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(2, 6, 23, 0.95)';
        ctx.fill();
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(sx, cy, 10, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label above
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(s.name, sx, cy - 32);

        // Subtitle below
        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px monospace';
        ctx.fillText(s.sub, sx, cy + 36);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSimulate = (scen: AttackScenario) => {
    setActiveScenario(scen.name);
    simulateAttack(scen);
    setTimeout(() => setActiveScenario(null), 3000);
  };

  return (
    <div className="cyber-card-3d p-6 relative overflow-hidden flex flex-col justify-between">
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 cyber-grid-bg opacity-25 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">3D Dynamic Threat Pipeline & Attack Vector Paths</h3>
            <p className="text-[11px] text-slate-400">Continuous telemetry correlation across external perimeter and internal DMZ</p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-950/80 border border-rose-800/60 text-rose-300">
          THREAT PROPAGATION ENGINE
        </span>
      </div>

      {/* 3D Canvas Vector Stream */}
      <div className="relative my-2 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={160}
          className="w-full max-w-2xl"
        />
      </div>

      {/* 1-Click Threat Ingestion Buttons for SIH Judges */}
      <div className="pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono font-bold text-slate-300 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-red-400" />
            Live Threat Simulator (SIH 2026 Judge Verification):
          </span>
          {activeScenario && (
            <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/80 border border-red-800 px-2 py-0.5 rounded animate-pulse">
              ⚡ INGESTED: {activeScenario}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {ATTACK_SCENARIOS.map(scen => (
            <button
              key={scen.id}
              onClick={() => handleSimulate(scen)}
              className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-red-950/60 border border-slate-800 hover:border-red-500/50 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-200 group-hover:text-red-300">
                <span className="truncate">{scen.name}</span>
                <span className="text-[10px] font-mono text-red-400 font-bold">+{scen.expectedRiskIncrease} pts</span>
              </div>
              <p className="text-[10.5px] text-slate-400 line-clamp-1 mt-0.5">{scen.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
