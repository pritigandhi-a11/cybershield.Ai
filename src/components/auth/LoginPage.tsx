import React, { useState, useEffect, useRef } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { IndustryType } from '../../types/organization';
import { INDUSTRY_PRESETS } from '../../services/organizationData';
import {
  ShieldAlert,
  Lock,
  Mail,
  Building2,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Activity,
  Cpu,
  Coins,
  ShieldCheck,
  Zap,
  Info,
  Server,
  Globe2
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { login } = useSecurity();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedOrg, setSelectedOrg] = useState<IndustryType>('BANKING_FINTECH');
  const [email, setEmail] = useState<string>('p.gandhi@aicte-india.org');
  const [password, setPassword] = useState<string>('CyberShield@2026');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const orgList: { key: IndustryType; name: string; industry: string; icon: string; budget: string }[] = [
    {
      key: 'BANKING_FINTECH',
      name: 'Bharat NeoBank & Financial Services Ltd.',
      industry: 'Banking & FinTech',
      icon: '🏦',
      budget: '₹5.0 Lakhs'
    },
    {
      key: 'HEALTHCARE',
      name: 'Apex SuperSpecialty Hospital & Research Network',
      industry: 'Healthcare & Hospital Systems',
      icon: '🏥',
      budget: '₹4.0 Lakhs'
    },
    {
      key: 'HIGHER_EDUCATION',
      name: 'National Institute of Science & Technology (NIST University)',
      industry: 'Higher Education & Research',
      icon: '🎓',
      budget: '₹3.0 Lakhs'
    },
    {
      key: 'CRITICAL_INFRASTRUCTURE',
      name: 'GridPower Energy & Distribution Grid Corp',
      industry: 'Critical Infrastructure & SCADA',
      icon: '⚡',
      budget: '₹7.5 Lakhs'
    },
    {
      key: 'ENTERPRISE_SAAS',
      name: 'CloudScale Technologies (Multi-Tenant SaaS)',
      industry: 'Enterprise SaaS & Cloud',
      icon: '☁️',
      budget: '₹6.0 Lakhs'
    }
  ];

  // 3D Canvas CyberShield Core Animation on Left
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let rotation = 0;

    // Outer node particles
    const nodes = Array.from({ length: 24 }, (_, i) => ({
      angle: (i / 24) * Math.PI * 2,
      radius: 80 + (i % 3) * 15,
      speed: (i % 2 === 0 ? 0.008 : -0.008),
      size: (i % 4 === 0 ? 4.5 : 2.5),
      color: (i % 4 === 0 ? '#38bdf8' : i % 3 === 0 ? '#818cf8' : '#34d399')
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      rotation += 0.01;

      const tiltX = (mousePos.y / 200) * 0.25;
      const tiltY = (mousePos.x / 200) * 0.25;

      // Outer glowing radial background
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 110);
      grad.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
      grad.addColorStop(0.6, 'rgba(99, 102, 241, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 110, 0, Math.PI * 2);
      ctx.fill();

      // Draw 3D Orbital Rings
      const drawRing = (rx: number, ry: number, rot: number, stroke: string, lw: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot + tiltY);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, tiltX, 0, Math.PI * 2);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lw;
        ctx.stroke();
        ctx.restore();
      };

      drawRing(95, 36, rotation * 0.8, 'rgba(56, 189, 248, 0.45)', 1.5);
      drawRing(90, 30, -rotation * 0.6 + Math.PI / 3, 'rgba(99, 102, 241, 0.35)', 1.2);
      drawRing(82, 40, rotation * 0.4 - Math.PI / 4, 'rgba(52, 211, 153, 0.3)', 1.0);

      // Connected nodes
      nodes.forEach(n => {
        n.angle += n.speed;
        const nx = cx + Math.cos(n.angle + rotation) * n.radius;
        const ny = cy + Math.sin(n.angle + rotation) * (n.radius * 0.45);

        // Line to center
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Node circle
        ctx.beginPath();
        ctx.arc(nx, ny, n.size, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Central Pulsing Shield Emblem
      const pulse = Math.sin(rotation * 3) * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 26 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.5)';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [mousePos]);

  // Update default email when organization changes
  const handleOrgChange = (newOrg: IndustryType) => {
    setSelectedOrg(newOrg);
    if (newOrg === 'BANKING_FINTECH') {
      setEmail('ciso@neobank.in');
    } else if (newOrg === 'HEALTHCARE') {
      setEmail('security.lead@apexhospital.org');
    } else if (newOrg === 'HIGHER_EDUCATION') {
      setEmail('registrar-it@nist.ac.in');
    } else if (newOrg === 'CRITICAL_INFRASTRUCTURE') {
      setEmail('grid-master@powercorp.gov.in');
    } else {
      setEmail('platform-sec@cloudscale.io');
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!email.trim() || !password.trim()) {
      setAuthError('Please enter both your work email and security passphrase.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(selectedOrg, email, 'Chief Information Security Officer (CISO)', rememberMe);
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }, 450);
  };

  const handleQuickDemoSwitch = (orgKey: IndustryType) => {
    setSelectedOrg(orgKey);
    handleOrgChange(orgKey);
    setIsLoading(true);
    setTimeout(() => {
      login(orgKey, undefined, 'Chief Information Security Officer (CISO)', true);
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }, 300);
  };

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
      className="min-h-screen w-full bg-[#020617] text-slate-100 flex items-center justify-center p-4 lg:p-8 relative overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-200"
    >
      {/* Dynamic 3D Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Split 3D Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-slate-800/90 bg-slate-950/80 shadow-2xl backdrop-blur-2xl overflow-hidden relative z-10">
        
        {/* Left Column: 3D Cybersecurity Visualization */}
        <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-[#020617] relative overflow-hidden">
          {/* Cyber Grid Texture */}
          <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

          {/* Top Brand Info */}
          <div className="relative z-10">
            <div className="mb-6">
              <BrandLogo
                size="lg"
                showText={true}
                showSubtitle={true}
                showBadge={true}
                badgeText="SIH 2026"
              />
            </div>

            <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight mb-3">
              Continuous Cyber Risk Quantification & <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Risk-to-Rupee</span> Optimization
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg">
              Deterministic mathematical risk modeling ($0–100$), bounded knapsack capital allocation, and cryptographic Merkle blockchain audit anchoring for Indian critical sectors.
            </p>
          </div>

          {/* 3D Security Core Canvas */}
          <div className="my-6 relative z-10 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 shadow-xl backdrop-blur-md">
            <canvas
              ref={canvasRef}
              width={340}
              height={160}
              className="w-full max-w-xs transition-transform duration-200"
              style={{
                transform: `perspective(600px) rotateX(${-mousePos.y * 0.04}deg) rotateY(${mousePos.x * 0.04}deg)`
              }}
            />
            <div className="flex items-center justify-between w-full text-[10.5px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                QUANT CORE ONLINE
              </span>
              <span className="text-emerald-400 font-bold">SHA-256 MERKLE ANCHORED</span>
            </div>
          </div>

          {/* Bottom Capability Badges */}
          <div className="relative z-10 pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 font-medium shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Continuous Monitoring
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-950/60 border border-purple-800/50 text-purple-300 font-medium shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Risk Intelligence
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 font-medium shadow-sm">
              <Coins className="w-3.5 h-3.5 text-emerald-400" /> Budget Optimization
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 font-medium shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Merkle Audit Proof
            </span>
          </div>
        </div>

        {/* Right Column: Clean 3D Glass Sign In Panel */}
        <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between bg-slate-950/90 relative">
          <div>
            <div className="mb-6">
              <div className="mb-2">
                <BrandLogo size="xs" showBadge={true} badgeText="ENTERPRISE ACCESS" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Sign In to Command Center</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
                Access your organization's 3D continuous cyber risk & investment optimization portal.
              </p>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 animate-shake">
                <Info className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              {/* Organization Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Select Organization Profile
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <select
                    value={selectedOrg}
                    onChange={(e) => handleOrgChange(e.target.value as IndustryType)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer"
                  >
                    {orgList.map(org => (
                      <option key={org.key} value={org.key}>
                        {org.icon} {org.name} ({org.industry} • Base: {org.budget})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Work Email / Username */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Work Email / Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ciso@organization.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Password Field with Show/Hide Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Security Passphrase / Token
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
                  >
                    Forgot passphrase?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500/30 accent-cyan-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-300">Remember session on this workstation</span>
                </label>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin text-cyan-200" />
                    <span>Authenticating & Loading 3D Telemetry...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to 3D Command Center</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick SIH Judge Demo Switcher Bar */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-mono uppercase font-bold text-slate-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                SIH 2026 Judge 1-Click Fast Switcher:
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Instant Org Loading</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {orgList.map(org => (
                <button
                  key={org.key}
                  onClick={() => handleQuickDemoSwitch(org.key)}
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/50 text-left transition-all group cursor-pointer"
                  title={`Launch Command Center for ${org.name}`}
                >
                  <div className="text-[11px] font-semibold text-slate-200 group-hover:text-cyan-300 truncate flex items-center gap-1">
                    <span>{org.icon}</span>
                    <span className="truncate">{org.industry}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono group-hover:text-slate-300">
                    Budget: {org.budget}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Enterprise Passphrase Recovery</h4>
                <p className="text-xs text-slate-400">Institutional Identity & Access Management</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              In this demonstration environment, default administrator credentials are pre-filled. To authenticate with any institutional profile, simply select the organization and click <strong>"Sign In to 3D Command Center"</strong> or use the <strong>1-Click Judge Fast Switcher</strong>.
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
              <div className="text-slate-400">Demo Passphrase: <span className="text-cyan-300 font-bold">CyberShield@2026</span></div>
              <div className="text-slate-400">Role: <span className="text-emerald-300">CISO / SecOps Admin</span></div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Understood, Return to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
