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
  Key,
  Shield,
  UserCheck,
  Award,
  Radio,
  FileCheck,
  TrendingDown
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

export type DemoRoleId = 'ADMIN' | 'SECURITY_TEAM' | 'MANAGEMENT' | 'AUDITOR';

export interface DemoRoleConfig {
  id: DemoRoleId;
  roleName: string;
  roleTitle: string;
  organizationName: string;
  organizationId: IndustryType;
  orgCode: string;
  email: string;
  password: string;
  description: string;
  accent: {
    border: string;
    borderSelected: string;
    bg: string;
    bgSelected: string;
    badgeBg: string;
    badgeText: string;
    text: string;
    button: string;
    glow: string;
  };
}

export const DEMO_ROLES: Record<DemoRoleId, DemoRoleConfig> = {
  ADMIN: {
    id: 'ADMIN',
    roleName: 'Chief Information Security Officer (CISO)',
    roleTitle: 'ADMIN',
    organizationName: 'Bharat NeoBank & Financial Services Ltd.',
    organizationId: 'BANKING_FINTECH',
    orgCode: 'org-fintech-01',
    email: 'admin@demo.cybershield.ai',
    password: 'Demo@Admin123',
    description: 'Executive CISO with full administrative authority, risk weights control, and knapsack capital optimization.',
    accent: {
      border: 'border-amber-500/30 hover:border-amber-400/60',
      borderSelected: 'border-amber-400 ring-1 ring-amber-400/50',
      bg: 'bg-gradient-to-br from-amber-950/20 via-slate-900/80 to-slate-950/90',
      bgSelected: 'bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-slate-950',
      badgeBg: 'bg-amber-500/15 border-amber-500/40',
      badgeText: 'text-amber-300',
      text: 'text-amber-300',
      button: 'hover:bg-amber-500/20 text-amber-300 border-amber-500/30',
      glow: 'shadow-amber-500/10'
    }
  },
  SECURITY_TEAM: {
    id: 'SECURITY_TEAM',
    roleName: 'SOC Lead & SecOps Analyst',
    roleTitle: 'SECURITY TEAM',
    organizationName: 'Bharat NeoBank & Financial Services Ltd.',
    organizationId: 'BANKING_FINTECH',
    orgCode: 'org-fintech-01',
    email: 'security@demo.cybershield.ai',
    password: 'Demo@Security123',
    description: 'SOC operations, live MITRE telemetry ingestion, vulnerability triage, and real-time attack simulations.',
    accent: {
      border: 'border-cyan-500/30 hover:border-cyan-400/60',
      borderSelected: 'border-cyan-400 ring-1 ring-cyan-400/50',
      bg: 'bg-gradient-to-br from-cyan-950/20 via-slate-900/80 to-slate-950/90',
      bgSelected: 'bg-gradient-to-br from-cyan-950/40 via-slate-900/90 to-slate-950',
      badgeBg: 'bg-cyan-500/15 border-cyan-500/40',
      badgeText: 'text-cyan-300',
      text: 'text-cyan-300',
      button: 'hover:bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      glow: 'shadow-cyan-500/10'
    }
  },
  MANAGEMENT: {
    id: 'MANAGEMENT',
    roleName: 'Chief Risk Officer (CRO) & Board Member',
    roleTitle: 'MANAGEMENT',
    organizationName: 'Bharat NeoBank & Financial Services Ltd.',
    organizationId: 'BANKING_FINTECH',
    orgCode: 'org-fintech-01',
    email: 'management@demo.cybershield.ai',
    password: 'Demo@Management123',
    description: 'Executive Risk-to-Rupee financial dashboards, loss avoidance ROI metrics (7.7x), and budget decision matrices.',
    accent: {
      border: 'border-purple-500/30 hover:border-purple-400/60',
      borderSelected: 'border-purple-400 ring-1 ring-purple-400/50',
      bg: 'bg-gradient-to-br from-purple-950/20 via-slate-900/80 to-slate-950/90',
      bgSelected: 'bg-gradient-to-br from-purple-950/40 via-slate-900/90 to-slate-950',
      badgeBg: 'bg-purple-500/15 border-purple-500/40',
      badgeText: 'text-purple-300',
      text: 'text-purple-300',
      button: 'hover:bg-purple-500/20 text-purple-300 border-purple-500/30',
      glow: 'shadow-purple-500/10'
    }
  },
  AUDITOR: {
    id: 'AUDITOR',
    roleName: 'Statutory Compliance & Regulatory Auditor',
    roleTitle: 'AUDITOR',
    organizationName: 'Bharat NeoBank & Financial Services Ltd.',
    organizationId: 'BANKING_FINTECH',
    orgCode: 'org-fintech-01',
    email: 'auditor@demo.cybershield.ai',
    password: 'Demo@Auditor123',
    description: 'RBI CSF, PCI-DSS 4.0, CERT-In, and DPDP compliance radars with SHA-256 Merkle blockchain verification.',
    accent: {
      border: 'border-emerald-500/30 hover:border-emerald-400/60',
      borderSelected: 'border-emerald-400 ring-1 ring-emerald-400/50',
      bg: 'bg-gradient-to-br from-emerald-950/20 via-slate-900/80 to-slate-950/90',
      bgSelected: 'bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-slate-950',
      badgeBg: 'bg-emerald-500/15 border-emerald-500/40',
      badgeText: 'text-emerald-300',
      text: 'text-emerald-300',
      button: 'hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      glow: 'shadow-emerald-500/10'
    }
  }
};

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { login } = useSecurity();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Form State
  const [selectedOrg, setSelectedOrg] = useState<IndustryType>('BANKING_FINTECH');
  const [email, setEmail] = useState<string>('admin@demo.cybershield.ai');
  const [password, setPassword] = useState<string>('Demo@Admin123');
  const [selectedRole, setSelectedRole] = useState<DemoRoleId>('ADMIN');
  
  // UI Controls
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCredentialsInPanel, setShowCredentialsInPanel] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const orgList: { key: IndustryType; name: string; industry: string; icon: string; budget: string; orgId: string }[] = [
    {
      key: 'BANKING_FINTECH',
      name: 'Bharat NeoBank & Financial Services Ltd.',
      industry: 'Banking & FinTech',
      icon: '🏦',
      budget: '₹5.0 Lakhs',
      orgId: 'org-fintech-01'
    },
    {
      key: 'HEALTHCARE',
      name: 'Apex SuperSpecialty Hospital & Research Network',
      industry: 'Healthcare & Hospital Systems',
      icon: '🏥',
      budget: '₹4.0 Lakhs',
      orgId: 'org-health-01'
    },
    {
      key: 'CRITICAL_INFRASTRUCTURE',
      name: 'GridPower Energy & Distribution Grid Corp',
      industry: 'Critical Infrastructure & SCADA',
      icon: '⚡',
      budget: '₹7.5 Lakhs',
      orgId: 'org-infra-01'
    },
    {
      key: 'ENTERPRISE_SAAS',
      name: 'CloudScale Technologies (Multi-Tenant SaaS)',
      industry: 'Enterprise SaaS & Cloud',
      icon: '☁️',
      budget: '₹6.0 Lakhs',
      orgId: 'org-saas-01'
    },
    {
      key: 'HIGHER_EDUCATION',
      name: 'National Institute of Science & Technology (NIST)',
      industry: 'Higher Education & Research',
      icon: '🎓',
      budget: '₹3.0 Lakhs',
      orgId: 'org-edu-01'
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
    const nodes = Array.from({ length: 28 }, (_, i) => ({
      angle: (i / 28) * Math.PI * 2,
      radius: 85 + (i % 4) * 12,
      speed: (i % 2 === 0 ? 0.007 : -0.007),
      size: (i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : 2),
      color: (i % 4 === 0 ? '#38bdf8' : i % 3 === 0 ? '#818cf8' : '#34d399')
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      rotation += 0.012;

      const tiltX = (mousePos.y / 200) * 0.2;
      const tiltY = (mousePos.x / 200) * 0.2;

      // Outer glowing radial background
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 120);
      grad.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
      grad.addColorStop(0.5, 'rgba(99, 102, 241, 0.09)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
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

      drawRing(105, 38, rotation * 0.7, 'rgba(56, 189, 248, 0.45)', 1.5);
      drawRing(98, 32, -rotation * 0.5 + Math.PI / 3, 'rgba(99, 102, 241, 0.4)', 1.2);
      drawRing(90, 42, rotation * 0.35 - Math.PI / 4, 'rgba(52, 211, 153, 0.35)', 1.0);

      // Connected nodes with data rays
      nodes.forEach((n, idx) => {
        n.angle += n.speed;
        const nx = cx + Math.cos(n.angle + rotation) * n.radius;
        const ny = cy + Math.sin(n.angle + rotation) * (n.radius * 0.48);

        // Line to center
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = idx % 3 === 0 ? 'rgba(56, 189, 248, 0.25)' : 'rgba(99, 102, 241, 0.12)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Node circle
        ctx.beginPath();
        ctx.arc(nx, ny, n.size, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Central Shield Core
      const pulse = Math.sin(rotation * 2.5) * 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 28 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.45)';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner Core Hexagon
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3 + rotation * 0.5;
        const hx = cx + Math.cos(angle) * (14 + pulse * 0.5);
        const hy = cy + Math.sin(angle) * (14 + pulse * 0.5);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [mousePos]);

  // Handle Demo Role Auto-Fill (Explicit 1-Click Fill without instant submit)
  const handleSelectDemoRole = (roleId: DemoRoleId) => {
    const config = DEMO_ROLES[roleId];
    setSelectedRole(roleId);
    setSelectedOrg(config.organizationId);
    setEmail(config.email);
    setPassword(config.password);
    setAuthError('');
  };

  // Handle Organization Change
  const handleOrgChange = (newOrg: IndustryType) => {
    setSelectedOrg(newOrg);
    setAuthError('');
  };

  // Handle Sign In Submission & Validation
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const trimmedEmail = email.trim();
    const trimmedPass = password.trim();

    if (!trimmedEmail || !trimmedPass) {
      setAuthError('Invalid demo credentials. Please enter email and password.');
      return;
    }

    // Check if matching any of the 4 demo roles or valid credentials
    const matchingDemo = Object.values(DEMO_ROLES).find(
      r => r.email.toLowerCase() === trimmedEmail.toLowerCase() && r.password === trimmedPass
    );

    let assignedRole = 'Chief Information Security Officer (CISO)';
    let targetOrg = selectedOrg;

    if (matchingDemo) {
      assignedRole = matchingDemo.roleName;
      targetOrg = matchingDemo.organizationId; // Locked to org-fintech-01
    } else if (trimmedPass === 'CyberShield@2026' || trimmedPass.startsWith('Demo@')) {
      // General demo passphrase accepted
      assignedRole = 'Security Operations & Risk Analyst';
    } else if (trimmedEmail.includes('@') && trimmedPass.length >= 4) {
      // Allow custom exploration
      assignedRole = 'Authenticated Enterprise Officer';
    } else {
      setAuthError('Invalid demo credentials. Use one of the 4 SIH demo role presets below.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setLoginSuccess(true);
      login(targetOrg, trimmedEmail, assignedRole, rememberMe);
      setIsLoading(false);

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }, 300);
    }, 450);
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
      className="min-h-screen w-full bg-[#020617] text-slate-100 flex items-center justify-center p-3 sm:p-6 lg:p-10 relative overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-200"
    >
      {/* Background Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Split-Screen Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-slate-800/90 bg-slate-950/85 shadow-2xl backdrop-blur-2xl overflow-hidden relative z-10">
        
        {/* ====================================================================
            LEFT COLUMN: CYBERSHIELD.AI BRANDING & 3D CYBER NETWORK VISUAL
        ==================================================================== */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-gradient-to-br from-slate-900/95 via-slate-950 to-[#020617] relative overflow-hidden">
          {/* Subtle Cyber Grid Texture */}
          <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

          {/* Top Brand Block */}
          <div className="relative z-10">
            <div className="mb-5">
              <BrandLogo
                size="lg"
                showText={true}
                showSubtitle={true}
                showBadge={true}
                badgeText="SIH 2026"
              />
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug mb-3">
              Continuous Cyber Risk Quantification & <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Risk-to-Rupee</span> Optimization
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg">
              Enterprise SOC decision intelligence engine powered by deterministic 6-factor mathematical risk quantification, bounded knapsack ROI capital allocation, and SHA-256 Merkle blockchain audit proof.
            </p>
          </div>

          {/* 3D Cyber Security Shield & Network Canvas */}
          <div className="my-5 relative z-10 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 shadow-xl backdrop-blur-md">
            <canvas
              ref={canvasRef}
              width={340}
              height={170}
              className="w-full max-w-xs transition-transform duration-200"
              style={{
                transform: `perspective(600px) rotateX(${-mousePos.y * 0.03}deg) rotateY(${mousePos.x * 0.03}deg)`
              }}
            />
            
            {/* Live Telemetry Status Indicators */}
            <div className="flex items-center justify-between w-full text-[10px] font-mono text-slate-400 pt-2.5 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                QUANT RISK CORE: 68.4 / 100
              </span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                SHA-256 ANCHORED
              </span>
            </div>
          </div>

          {/* SIH Judge Quick Guide Cards */}
          <div className="relative z-10 space-y-2 pt-2 border-t border-slate-800/70">
            <div className="text-[10px] font-mono uppercase font-bold text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              National Finale Demonstration Focus
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
                <div className="font-bold text-white text-[11px] flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-cyan-400" /> Protected Org
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                  Bharat NeoBank (org-fintech-01)
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
                <div className="font-bold text-white text-[11px] flex items-center gap-1">
                  <Coins className="w-3 h-3 text-emerald-400" /> Optimization
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                  Risk-to-Rupee Knapsack Solver
                </div>
              </div>
            </div>
          </div>

          {/* Capability Badges Footer */}
          <div className="relative z-10 pt-4 mt-3 border-t border-slate-800/50 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 font-mono text-[10px]">
              <CheckCircle2 className="w-3 h-3" /> Zero Hallucination
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-purple-950/60 border border-purple-800/50 text-purple-300 font-mono text-[10px]">
              <Radio className="w-3 h-3" /> 6-Factor Model
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 font-mono text-[10px]">
              <Coins className="w-3 h-3" /> Budget ROI (7.7x)
            </span>
          </div>
        </div>

        {/* ====================================================================
            RIGHT COLUMN: LOGIN CARD + SIH DEMO ACCESS PANEL
        ==================================================================== */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-slate-950/90 relative">
          <div>
            {/* Header */}
            <div className="mb-5">
              <div className="mb-1.5">
                <BrandLogo size="xs" showBadge={true} badgeText="ENTERPRISE ACCESS" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Welcome to CyberShield.AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Sign in to access your organization's cyber-risk command center.
              </p>
            </div>

            {/* Error Notification */}
            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-300 text-xs flex items-center gap-2 animate-shake shadow-lg shadow-red-950/40">
                <Info className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span className="font-medium">{authError}</span>
              </div>
            )}

            {/* Sign In Form */}
            <form onSubmit={handleSignIn} className="space-y-3.5">
              {/* Organization Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Organization</span>
                  <span className="text-[10px] font-mono text-cyan-400">
                    {selectedOrg === 'BANKING_FINTECH' ? 'Locked to org-fintech-01' : 'Institutional Profile'}
                  </span>
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
                        {org.icon} {org.name} ({org.industry})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@demo.cybershield.ai"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Password Field with Show/Hide Buttons */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Password
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
                    <Lock className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-28 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span className="text-[10px] uppercase font-mono">HIDE</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span className="text-[10px] uppercase font-mono">SHOW</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Toggle */}
              <div className="flex items-center justify-between pt-0.5">
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
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75 uppercase tracking-wider"
              >
                {isLoading ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin text-cyan-200" />
                    <span>AUTHENTICATING COMMAND CENTER...</span>
                  </>
                ) : loginSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-bounce" />
                    <span>ACCESS GRANTED · REDIRECTING...</span>
                  </>
                ) : (
                  <>
                    <span>SIGN IN</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-cyan-200" />
                  </>
                )}
              </button>
            </form>

            {/* ================================================================
                SIH DEMO ACCESS PANEL (4 Selectable Demo Roles)
            ================================================================ */}
            <div className="mt-6 pt-5 border-t border-slate-800/90">
              {/* Panel Header */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-white tracking-tight uppercase">
                        SIH DEMO ACCESS
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-500/15 border border-amber-500/40 text-amber-300">
                        DEMO ONLY
                      </span>
                    </div>
                  </div>
                </div>

                {/* Show/Hide Credentials Toggle */}
                <button
                  type="button"
                  onClick={() => setShowCredentialsInPanel(!showCredentialsInPanel)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-[10.5px] font-mono text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Key className="w-3 h-3 text-cyan-400" />
                  <span>{showCredentialsInPanel ? 'Mask Credentials' : 'Show Credentials'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 mb-3">
                Use demo credentials to explore CyberShield.AI. Click <strong className="text-slate-200">"Use Demo Account"</strong> to auto-fill, then click <strong className="text-cyan-300">"SIGN IN"</strong>.
              </p>

              {/* 4 Demo Role Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(Object.keys(DEMO_ROLES) as DemoRoleId[]).map((roleKey) => {
                  const role = DEMO_ROLES[roleKey];
                  const isSelected = selectedRole === roleKey && email === role.email;

                  return (
                    <div
                      key={roleKey}
                      className={`p-3 rounded-2xl border transition-all flex flex-col justify-between ${
                        isSelected ? `${role.accent.borderSelected} ${role.accent.bgSelected} shadow-lg ${role.accent.glow}` : `${role.accent.border} ${role.accent.bg}`
                      }`}
                    >
                      <div>
                        {/* Role Header & Badge */}
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`font-black text-xs tracking-tight ${role.accent.text} flex items-center gap-1.5`}>
                            <UserCheck className="w-3.5 h-3.5" />
                            {role.roleTitle}
                          </span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border font-semibold ${role.accent.badgeBg} ${role.accent.badgeText}`}>
                            {role.orgCode}
                          </span>
                        </div>

                        {/* Organization */}
                        <div className="text-[10px] text-slate-400 truncate mb-1" title={role.organizationName}>
                          <strong className="text-slate-300">Org:</strong> {role.organizationName}
                        </div>

                        {/* Credentials Details (Masked or Unmasked) */}
                        <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-[10px] space-y-0.5 mb-2">
                          <div className="truncate text-slate-300">
                            <span className="text-slate-500">Email:</span> {role.email}
                          </div>
                          <div className="text-slate-300">
                            <span className="text-slate-500">Pass:</span> {showCredentialsInPanel ? role.password : '••••••••••••'}
                          </div>
                        </div>
                      </div>

                      {/* 1-Click Auto Fill Button */}
                      <button
                        type="button"
                        onClick={() => handleSelectDemoRole(roleKey)}
                        className={`w-full py-1.5 px-2.5 rounded-xl border text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-slate-900/90 ${role.accent.button}`}
                      >
                        <Zap className="w-3 h-3 text-cyan-400" />
                        <span>Use Demo Account</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Requirement */}
          <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>SIH 2026 Demo Environment · Prototype Access</span>
            <span className="text-cyan-500/70">v2.4.0-SECURE</span>
          </div>
        </div>
      </div>

      {/* Forgot Passphrase Helper Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Enterprise Demo Passphrases</h4>
                <p className="text-xs text-slate-400">SIH 2026 Evaluation Helper</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              In this prototype environment, select any of the four role cards (<strong>ADMIN</strong>, <strong>SECURITY TEAM</strong>, <strong>MANAGEMENT</strong>, or <strong>AUDITOR</strong>) below the form to automatically populate credentials for <strong>Bharat NeoBank & Financial Services Ltd.</strong>
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1 text-slate-300">
              <div>Admin Passphrase: <span className="text-amber-300 font-bold">Demo@Admin123</span></div>
              <div>Security Passphrase: <span className="text-cyan-300 font-bold">Demo@Security123</span></div>
              <div>Management Passphrase: <span className="text-purple-300 font-bold">Demo@Management123</span></div>
              <div>Auditor Passphrase: <span className="text-emerald-300 font-bold">Demo@Auditor123</span></div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Return to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
