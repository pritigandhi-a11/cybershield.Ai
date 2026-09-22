import React, { useState } from 'react';
import { useSecurity } from '../context/SecurityContext';
import {
  Sparkles,
  Send,
  Bot,
  User,
  RefreshCw,
  Key
} from 'lucide-react';
import { ApiKeyConfigModal } from '../components/copilot/ApiKeyConfigModal';
import { CopilotMessage } from '../services/aiCopilotService';

export const CopilotPage: React.FC = () => {
  const {
    copilotMessages,
    isCopilotThinking,
    sendCopilotMessage,
    organization,
    riskState,
    investmentScenario,
    geminiApiKey
  } = useSecurity();

  const [inputVal, setInputVal] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);

  const samplePrompts = [
    'Why is our quantified cyber risk score high?',
    'How should we allocate our ₹5 Lakhs budget for maximum risk drop?',
    'What are our major regulatory gaps under RBI CSF & CERT-In?',
    'Explain the blast radius if our Active Directory Domain Controller is compromised.',
    'What is the ROI efficiency of deploying Hardware FIDO2 Passkeys?',
    'Generate an executive summary brief for the Board of Directors.'
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isCopilotThinking) return;
    const t = inputVal.trim();
    setInputVal('');
    sendCopilotMessage(t);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            AI Cybersecurity Risk Copilot & Advisory Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Grounded intelligence assistant. <strong className="text-cyan-300">AI explains the calculated security state; it does not calculate the risk.</strong>
          </p>
        </div>

        <button
          onClick={() => setShowKeyModal(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            geminiApiKey
              ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
              : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>{geminiApiKey ? 'Gemini API Connected' : 'Configure Gemini Key'}</span>
        </button>
      </div>

      {/* Main Chat Interface */}
      <div className="cyber-card p-6 min-h-[560px] flex flex-col justify-between">
        {/* Live Context Header Bar */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-slate-300">Active Grounding:</span>
            <strong className="text-white">{organization.name}</strong>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
            <span>Score: <strong className="text-red-400">{riskState.overallScore}/100</strong></span>
            <span>•</span>
            <span>Budget: <strong className="text-slate-200">₹{(investmentScenario.totalBudgetINR / 100000).toFixed(1)}L</strong></span>
            <span>•</span>
            <span>Projected: <strong className="text-emerald-400">{investmentScenario.projectedRiskScore}/100</strong></span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
          {copilotMessages.map((msg: CopilotMessage) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'USER' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-slate-500">
                {msg.sender === 'USER' ? (
                  <>
                    <span>Security Officer</span>
                    <User className="w-3 h-3 text-slate-400" />
                  </>
                ) : (
                  <>
                    <Bot className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-cyan-400 font-bold">CyberShield AI</span>
                  </>
                )}
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`p-4 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                  msg.sender === 'USER'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none shadow-lg'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans space-y-2">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {isCopilotThinking && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 animate-pulse w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Synthesizing multi-factor telemetry and calculating recommendations...</span>
            </div>
          )}
        </div>

        {/* Suggested Prompts Pills */}
        <div className="pt-3 border-t border-slate-900 mb-3">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Suggested Strategic Inquiries:
          </div>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => sendCopilotMessage(p)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-sans bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors text-left"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar Form */}
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type your inquiry (e.g. Explain how ₹3.5 Lakhs budget should be allocated)..."
            className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isCopilotThinking}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs disabled:opacity-50 hover:brightness-110 flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Send className="w-4 h-4" />
            <span>Send Query</span>
          </button>
        </form>
      </div>

      <ApiKeyConfigModal isOpen={showKeyModal} onClose={() => setShowKeyModal(false)} />
    </div>
  );
};
