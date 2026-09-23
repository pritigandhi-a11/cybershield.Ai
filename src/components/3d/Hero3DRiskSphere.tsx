import React, { useEffect, useRef, useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { ShieldAlert, ShieldCheck, AlertTriangle, Activity, TrendingUp, TrendingDown, Clock, Sparkles } from 'lucide-react';

export const Hero3DRiskSphere: React.FC = () => {
  const { riskState, organization } = useSecurity();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const score = riskState.overallScore;
  const isCritical = score >= 75;
  const isHigh = score >= 55 && score < 75;
  const isMedium = score >= 35 && score < 55;

  // Primary color based on risk severity
  const coreColor = isCritical
    ? { r: 244, g: 63, b: 94 } // Rose-500
    : isHigh
    ? { r: 245, g: 158, b: 11 } // Amber-500
    : isMedium
    ? { r: 56, g: 189, b: 248 } // Sky-400
    : { r: 16, g: 185, b: 129 }; // Emerald-500

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    // 3D Particles on Sphere surface
    const particleCount = 72;
    const particles: { theta: number; phi: number; radius: number; speed: number; size: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos(Math.random() * 2 - 1),
        radius: 85,
        speed: (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 2.2 + 1.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      rotation += 0.012;

      // Mouse influence on 3D tilt
      const tiltX = (mousePos.y / 200) * 0.35;
      const tiltY = (mousePos.x / 200) * 0.35;

      // 1. Draw Background Holographic Radial Glow
      const bgGlow = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 120);
      bgGlow.addColorStop(0, `rgba(${coreColor.r}, ${coreColor.g}, ${coreColor.b}, ${isHovered ? 0.35 : 0.22})`);
      bgGlow.addColorStop(0.5, `rgba(${coreColor.r}, ${coreColor.g}, ${coreColor.b}, 0.08)`);
      bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw 3D Orbital Rings
      const drawOrbitalRing = (radiusX: number, radiusY: number, angle: number, lineWidth: number, alpha: number) => {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle + tiltY);
        ctx.beginPath();
        ctx.ellipse(0, 0, radiusX, radiusY, tiltX, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${coreColor.r}, ${coreColor.g}, ${coreColor.b}, ${alpha})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.restore();
      };

      // Outer & Inner Rings
      drawOrbitalRing(105, 38, rotation * 0.7, 1.5, 0.45);
      drawOrbitalRing(100, 32, -rotation * 0.5 + Math.PI / 3, 1.2, 0.35);
      drawOrbitalRing(92, 45, rotation * 0.3 - Math.PI / 4, 1.0, 0.25);

      // 3. Render 3D Sphere Particles
      particles.forEach(p => {
        p.theta += p.speed;

        // 3D coordinates on sphere
        const x3d = p.radius * Math.sin(p.phi) * Math.cos(p.theta + rotation);
        const y3d = p.radius * Math.cos(p.phi);
        const z3d = p.radius * Math.sin(p.phi) * Math.sin(p.theta + rotation);

        // Apply mouse tilt rotation
        const cosY = Math.cos(tiltY);
        const sinY = Math.sin(tiltY);
        const cosX = Math.cos(tiltX);
        const sinX = Math.sin(tiltX);

        const xRot = x3d * cosY - z3d * sinY;
        const zRot = x3d * sinY + z3d * cosY;
        const yRot = y3d * cosX - zRot * sinX;
        const finalZ = y3d * sinX + zRot * cosX;

        // Perspective projection
        const fov = 260;
        const scale = fov / (fov + finalZ);
        const projX = centerX + xRot * scale;
        const projY = centerY + yRot * scale;

        // Depth-based opacity & size
        const depthAlpha = Math.max(0.12, (finalZ + p.radius) / (p.radius * 2));
        ctx.beginPath();
        ctx.arc(projX, projY, p.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${coreColor.r}, ${coreColor.g}, ${coreColor.b}, ${depthAlpha * 0.9})`;
        ctx.shadowColor = `rgb(${coreColor.r}, ${coreColor.g}, ${coreColor.b})`;
        ctx.shadowBlur = depthAlpha > 0.6 ? 8 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Central Pulsing Shield Core
      const corePulse = Math.sin(rotation * 3) * 3;
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 42 + corePulse);
      coreGrad.addColorStop(0, `rgba(${coreColor.r}, ${coreColor.g}, ${coreColor.b}, 0.7)`);
      coreGrad.addColorStop(0.7, `rgba(${coreColor.r}, ${coreColor.g}, ${coreColor.b}, 0.25)`);
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 42 + corePulse, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [coreColor, mousePos, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - (rect.left + rect.width / 2),
      y: e.clientY - (rect.top + rect.height / 2)
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      className="cyber-card-3d relative p-6 overflow-hidden flex flex-col justify-between group"
    >
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Continuous Cyber Risk Engine
            </span>
            <span className="text-xs font-bold text-white">Quantum 3D Assessment Core</span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          REAL-TIME TELEMETRY
        </span>
      </div>

      {/* Center 3D Holographic Canvas & Score Overlay */}
      <div className="relative flex items-center justify-center my-3">
        <canvas
          ref={canvasRef}
          width={280}
          height={220}
          className="cursor-crosshair transition-transform duration-200"
          style={{
            transform: `perspective(600px) rotateX(${-mousePos.y * 0.05}deg) rotateY(${mousePos.x * 0.05}deg)`
          }}
        />

        {/* Floating Centered Risk Metrics */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center z-20">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold mb-0.5">
            OVERALL RISK
          </span>
          <div className="flex items-baseline gap-1">
            <span
              className={`text-4xl sm:text-5xl font-black font-mono tracking-tight drop-shadow-lg ${
                isCritical ? 'text-rose-400' : isHigh ? 'text-amber-400' : isMedium ? 'text-cyan-400' : 'text-emerald-400'
              }`}
            >
              {score}
            </span>
            <span className="text-xs font-mono text-slate-400 font-semibold">/100</span>
          </div>
          <span
            className={`mt-1.5 px-3 py-0.5 rounded-full text-[10.5px] font-mono font-extrabold uppercase tracking-wider border shadow-md ${
              isCritical
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-950/50 animate-pulse'
                : isHigh
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-950/50'
                : isMedium
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}
          >
            {riskState.riskBand}
          </span>
        </div>
      </div>

      {/* Bottom Trajectory & Telemetry Meta */}
      <div className="relative z-10 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
          <div className="text-[10px] text-slate-400">30D DELTA</div>
          <div className="text-rose-400 font-bold flex items-center justify-center gap-0.5 mt-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>+4.2 pts</span>
          </div>
        </div>

        <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
          <div className="text-[10px] text-slate-400">PREVIOUS</div>
          <div className="text-slate-200 font-bold mt-0.5">{(score - 4.2).toFixed(1)} / 100</div>
        </div>

        <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
          <div className="text-[10px] text-slate-400">UPDATED</div>
          <div className="text-cyan-400 font-bold flex items-center justify-center gap-0.5 mt-0.5">
            <Clock className="w-3 h-3" />
            <span>Live Sync</span>
          </div>
        </div>
      </div>
    </div>
  );
};
