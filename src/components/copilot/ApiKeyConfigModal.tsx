import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Key, X, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface ApiKeyConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyConfigModal: React.FC<ApiKeyConfigModalProps> = ({ isOpen, onClose }) => {
  const { geminiApiKey, setGeminiApiKey } = useSecurity();
  const [keyInput, setKeyInput] = useState(geminiApiKey);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setGeminiApiKey(keyInput.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md cyber-card p-6 border-cyan-500/30 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Google Gemini API Configuration</h2>
            <p className="text-xs text-slate-400">Optional server-side key for advanced generative reasoning</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1 font-mono">
              GEMINI_API_KEY
            </label>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
            />
            <p className="text-[11px] text-slate-400 mt-1.5">
              *If left blank, CyberShield AI uses the built-in deterministic grounded reasoning engine (100% offline & zero-hallucination).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 space-y-1 text-[11px]">
            <div className="font-semibold text-cyan-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Security & Privacy Guarantee:
            </div>
            <p className="text-slate-400">
              Your API key is stored securely in local session memory and never sent to unauthorized third-party telemetry servers.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 transition-colors"
            >
              {saved ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{saved ? 'Key Saved!' : 'Save Key'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
