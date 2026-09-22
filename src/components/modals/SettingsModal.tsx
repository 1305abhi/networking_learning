import React, { useState } from 'react';
import { X, Download, Upload, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { progress, exportProgressJson, importProgressJson, resetProgress } = useProgress();
  const [importText, setImportText] = useState<string>('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    const jsonStr = exportProgressJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `netquest_progress_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage({ type: 'success', text: 'Progress file successfully downloaded!' });
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const success = importProgressJson(importText);
    if (success) {
      setMessage({ type: 'success', text: 'Progress restored successfully!' });
      setImportText('');
    } else {
      setMessage({ type: 'error', text: 'Invalid JSON format. Restoration failed.' });
    }
  };

  const handleReset = () => {
    resetProgress();
    setShowConfirmReset(false);
    setMessage({ type: 'success', text: 'All progress has been reset to Day 1.' });
  };

  return (
    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-200/90 w-full max-w-md shadow-2xl overflow-hidden animate-modal">
        
        <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Platform Settings & Data Storage
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs">
          {message && (
            <div className={`p-3 rounded-xl flex items-center gap-2 ${
              message.type === 'success' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{message.text}</span>
            </div>
          )}

          {/* Export section */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Export Progress
            </h4>
            <p className="text-slate-500 text-xs">
              Save your study metrics, streak, quiz scores, and notes as a portable JSON backup.
            </p>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" /> Download JSON Backup
            </button>
          </div>

          {/* Import section */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Import / Restore Data
            </h4>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste previously exported JSON contents here..."
              className="w-full h-20 p-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none bg-slate-50"
            />
            <button
              onClick={handleImport}
              disabled={!importText.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-all disabled:opacity-40"
            >
              <Upload className="w-3.5 h-3.5" /> Restore Backup
            </button>
          </div>

          {/* Danger zone */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <h4 className="font-bold text-red-600 uppercase tracking-wider text-[11px]">
              Danger Zone
            </h4>
            {!showConfirmReset ? (
              <button
                onClick={() => setShowConfirmReset(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Reset All Progress
              </button>
            ) : (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 space-y-2.5">
                <p className="text-red-900 font-semibold text-xs">
                  Are you sure? This will delete all completed days, notes, and quiz results.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-colors"
                  >
                    Confirm Reset
                  </button>
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-white text-xs transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
