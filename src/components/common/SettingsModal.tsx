import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Settings, X, Key, Shield, Database, RefreshCw, CheckCircle2, Lock } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    organization,
    geminiApiKey,
    setGeminiApiKey,
    currentUser
  } = useSecurity();

  const [apiKeyInput, setApiKeyInput] = useState<string>(geminiApiKey || '');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setGeminiApiKey(apiKeyInput.trim());
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <BrandLogo size="xs" showText={false} />
            <div>
              <h3 className="text-lg font-bold text-white">Platform Settings & Integrations</h3>
              <p className="text-xs text-slate-400">CyberShield.AI Enterprise Command Configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Session Info */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
          <div className="text-slate-400 uppercase font-mono font-semibold text-[10px]">Active Authenticated Session</div>
          <div className="grid grid-cols-2 gap-2 text-slate-200">
            <div>User: <strong className="text-white">{currentUser?.name || 'Preeti Gandhi'}</strong></div>
            <div>Role: <span className="text-cyan-300">CISO Staff</span></div>
            <div className="col-span-2 truncate">Organization: <span className="text-white">{organization.name}</span></div>
          </div>
        </div>

        {/* Gemini API Key Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span>Google Gemini API Key (Optional)</span>
            </label>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              If left blank, CyberShield AI Copilot uses its built-in rule-based deterministic advisory engine grounded in active telemetry.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-400">Changes stored securely in browser</span>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Settings</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
