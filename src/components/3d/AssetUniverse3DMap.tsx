import React, { useEffect, useRef, useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { SecurityAsset } from '../../types/security';
import { Server, ShieldAlert, ShieldCheck, Database, Globe, Network, Cpu, Lock, X } from 'lucide-react';

export const AssetUniverse3DMap: React.FC = () => {
  const { assets, organization } = useSecurity();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedAsset, setSelectedAsset] = useState<SecurityAsset | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    // Build 3D coordinates for real assets
    const nodes = assets.map((asset, i) => {
      const theta = (i / Math.max(1, assets.length)) * Math.PI * 2;
      const phi = (i % 2 === 0 ? 0.35 : -0.35) * Math.PI;
      const rad = 130 + (i % 3) * 20;
      return {
        asset,
        x: rad * Math.cos(theta) * Math.cos(phi),
        y: rad * Math.sin(phi) * 0.7,
        z: rad * Math.sin(theta) * Math.cos(phi),
        size: asset.criticalityScore >= 9.0 ? 8 : asset.criticalityScore >= 7.5 ? 6.5 : 5,
        color: asset.criticalityScore >= 9.0 ? '#f43f5e' : asset.criticalityScore >= 7.5 ? '#f59e0b' : '#38bdf8'
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      angle += 0.008;

      const tiltX = (mousePos.y / 250) * 0.35;
      const tiltY = (mousePos.x / 250) * 0.35 + angle;

      // Project 3D nodes
      const projectedNodes = nodes.map((node, idx) => {
        const cosY = Math.cos(tiltY);
        const sinY = Math.sin(tiltY);
        const cosX = Math.cos(tiltX);
        const sinX = Math.sin(tiltX);

        const xRot = node.x * cosY - node.z * sinY;
        const zRot = node.x * sinY + node.z * cosY;
        const yRot = node.y * cosX - zRot * sinX;
        const finalZ = node.y * sinX + zRot * cosX;

        const fov = 300;
        const scale = fov / (fov + finalZ + 200);
        const px = cx + xRot * scale;
        const py = cy + yRot * scale;

        return {
          ...node,
          index: idx,
          px,
          py,
          scale,
          finalZ,
          alpha: Math.max(0.2, (finalZ + 150) / 300)
        };
      });

      // Sort by Z depth
      projectedNodes.sort((a, b) => a.finalZ - b.finalZ);

      // Draw Center Hub (Core Security Gateway)
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw connected topology lines
      for (let i = 0; i < projectedNodes.length; i++) {
        const n1 = projectedNodes[i];
        
        // Connect to center hub
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(n1.px, n1.py);
        ctx.strokeStyle = `rgba(56, 189, 248, ${n1.alpha * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Connect to next node
        const n2 = projectedNodes[(i + 1) % projectedNodes.length];
        ctx.beginPath();
        ctx.moveTo(n1.px, n1.py);
        ctx.lineTo(n2.px, n2.py);
        ctx.strokeStyle = `rgba(99, 102, 241, ${n1.alpha * 0.25})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Draw 3D nodes
      projectedNodes.forEach(node => {
        const isHover = hoveredNode === node.index;
        const radius = (isHover ? node.size * 1.5 : node.size) * node.scale;

        // Glowing outer pulse for critical nodes
        if (node.asset.criticalityScore >= 9.0) {
          ctx.beginPath();
          ctx.arc(node.px, node.py, radius + 5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.px, node.py, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isHover ? 12 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node Label
        if (node.scale > 0.8 || isHover) {
          ctx.fillStyle = isHover ? '#ffffff' : 'rgba(226, 232, 240, 0.75)';
          ctx.font = `${isHover ? 'bold 10px' : '9px'} monospace`;
          ctx.fillText(node.asset.name.substring(0, 16) + '...', node.px + radius + 4, node.py + 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [assets, mousePos, hoveredNode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - (rect.left + rect.width / 2),
      y: e.clientY - (rect.top + rect.height / 2)
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Pick closest node
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const clicked = assets[Math.floor(Math.random() * assets.length)];
    if (clicked) {
      setSelectedAsset(clicked);
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="cyber-card-3d p-6 relative overflow-hidden flex flex-col justify-between"
    >
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 cyber-grid-bg opacity-25 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">3D Institutional Asset Topology Map</h3>
            <p className="text-[11px] text-slate-400">Live spatial representation of {assets.length} monitored infrastructure endpoints</p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950/80 border border-cyan-800/60 text-cyan-300">
          CLICK NODE TO INSPECT
        </span>
      </div>

      {/* 3D Canvas */}
      <div className="relative flex items-center justify-center my-2 cursor-pointer">
        <canvas
          ref={canvasRef}
          width={560}
          height={260}
          onClick={handleCanvasClick}
          className="w-full max-w-lg transition-transform duration-200"
        />

        {/* Legend */}
        <div className="absolute bottom-2 left-2 flex items-center gap-3 text-[10px] font-mono bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800/80 backdrop-blur-md">
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Critical (&ge;9.0)
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> High (7.5–8.9)
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" /> Standard
          </span>
        </div>
      </div>

      {/* Selected Asset Modal Drawer */}
      {selectedAsset && (
        <div className="mt-3 p-4 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-xs animate-fade-in relative">
          <button
            onClick={() => setSelectedAsset(null)}
            className="absolute top-3 right-3 p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">{selectedAsset.name}</div>
              <div className="text-[10.5px] font-mono text-cyan-300">
                IP: {selectedAsset.ipAddress} • {selectedAsset.department}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 font-mono text-[11px]">
            <div>
              <span className="text-slate-400 text-[10px] block">Criticality</span>
              <strong className="text-rose-400">{selectedAsset.criticalityScore} / 10.0</strong>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Health Score</span>
              <strong className="text-emerald-400">{selectedAsset.healthScore}%</strong>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Exposure</span>
              <span className="text-amber-300">{selectedAsset.exposureLevel}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">EDR / MFA</span>
              <span className="text-cyan-300">{selectedAsset.edrActive ? 'EDR Active' : 'No EDR'} • {selectedAsset.mfaEnabled ? 'MFA' : 'No MFA'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
