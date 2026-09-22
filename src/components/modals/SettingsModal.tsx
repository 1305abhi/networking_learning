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
    a.download = `netlearn_progress_${new Date().toISOString().split('T')[0]}.json`;
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
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl border border-slate-200 w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Platform Settings & Data Storage
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5 text-xs">
          
          {message && (
            <div className={`p-3 rounded-lg flex items-center gap-2 ${
              message.type === 'success' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* Export section */}
          <div className="space-y-2">
            <span className="font-bold text-slate-900 block">Export Progress Backup</span>
            <p className="text-slate-500 leading-relaxed">
              Download your study streak, completed modules, and quiz history as a JSON file to transfer between devices.
            </p>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" /> Download JSON Backup
            </button>
          </div>

          {/* Import section */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <span className="font-bold text-slate-900 block">Restore Progress</span>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste exported JSON string here..."
              className="w-full h-20 p-2.5 rounded-lg border border-slate-200 font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              onClick={handleImport}
              disabled={!importText.trim()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-medium transition-colors"
            >
              <Upload className="w-3.5 h-3.5" /> Restore Progress
            </button>
          </div>

          {/* Reset section */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <span className="font-bold text-red-600 block">Danger Zone</span>
            {!showConfirmReset ? (
              <button
                onClick={() => setShowConfirmReset(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-red-200 bg-red-50/50 hover:bg-red-50 text-red-700 font-medium transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Reset All Progress
              </button>
            ) : (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 space-y-2">
                <p className="text-red-800 font-semibold">Are you sure? This will delete all completed days and quiz scores.</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="px-3 py-1.5 rounded bg-red-600 text-white font-bold hover:bg-red-700"
                  >
                    Confirm Reset
                  </button>
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="px-3 py-1.5 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
