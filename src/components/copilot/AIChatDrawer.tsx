import React, { useState, useRef, useEffect } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Sparkles, Send, X, Bot, User, RefreshCw, ChevronRight, Shield } from 'lucide-react';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({ isOpen, onClose }) => {
  const { copilotMessages, isCopilotThinking, sendCopilotMessage, organization, riskState, investmentScenario } = useSecurity();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [copilotMessages, isOpen]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isCopilotThinking) return;
    const text = inputText.trim();
    setInputText('');
    sendCopilotMessage(text);
  };

  const handlePromptClick = (prompt: string) => {
    if (isCopilotThinking) return;
    sendCopilotMessage(prompt);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-slate-950/95 border-l border-slate-800 shadow-2xl backdrop-blur-xl flex flex-col justify-between animate-slide-left">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">CyberShield AI Copilot</h2>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                GROUNDED
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[280px]">
              Active context: {organization.name}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Context Badge Bar */}
      <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1 text-red-400">
          <Shield className="w-3 h-3" /> Risk: {riskState.overallScore}/100
        </span>
        <span className="text-slate-300">
          Budget: ₹{(investmentScenario.totalBudgetINR / 100000).toFixed(1)}L
        </span>
        <span className="text-emerald-400">
          Target: {investmentScenario.projectedRiskScore}/100
        </span>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {copilotMessages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'USER' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-slate-500">
              {msg.sender === 'USER' ? (
                <>
                  <span>You</span>
                  <User className="w-3 h-3 text-slate-400" />
                </>
              ) : (
                <>
                  <Bot className="w-3 h-3 text-cyan-400" />
                  <span className="text-cyan-400 font-bold">CyberShield AI</span>
                </>
              )}
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`p-3.5 rounded-2xl max-w-[90%] text-xs leading-relaxed ${
                msg.sender === 'USER'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans space-y-2">
                {msg.text}
              </div>

              {/* Suggested Follow-up Prompts */}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Suggested Inquiries:
                  </span>
                  {msg.suggestedActions.map((prompt, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => handlePromptClick(prompt)}
                      className="w-full text-left p-2 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 text-[11px] text-cyan-300 hover:text-cyan-200 transition-colors flex items-center justify-between group"
                    >
                      <span>{prompt}</span>
                      <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isCopilotThinking && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-300 animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            <span>Analyzing multi-vector telemetry and computing grounded response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Form */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/80">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about risk drivers, budget allocation, CVEs..."
            className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isCopilotThinking}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white disabled:opacity-50 hover:brightness-110 flex items-center justify-center transition-all shadow-md shadow-cyan-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
