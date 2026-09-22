import React, { useState, useEffect } from 'react';
import { X, Save, FileText } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { ROADMAP_DAYS } from '../../data/roadmap';

interface NotesModalProps {
  dayNumber: number | null;
  onClose: () => void;
}

export const NotesModal: React.FC<NotesModalProps> = ({ dayNumber, onClose }) => {
  const { progress, saveNote } = useProgress();
  const [noteText, setNoteText] = useState<string>('');

  useEffect(() => {
    if (dayNumber) {
      setNoteText(progress.notes[dayNumber] || '');
    }
  }, [dayNumber, progress.notes]);

  if (!dayNumber) return null;

  const dayMeta = ROADMAP_DAYS.find((d) => d.day === dayNumber);

  const handleSave = () => {
    saveNote(dayNumber, noteText);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-200/90 w-full max-w-lg shadow-2xl overflow-hidden animate-modal">
        
        <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Personal Study Notes — Day {dayNumber}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200/70 p-2.5 rounded-xl">
            Topic: <span className="font-semibold text-slate-800">{dayMeta?.title}</span>
          </div>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your key takeaways, tricky subnet calculations, or reminder commands..."
            className="w-full h-52 p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-sans text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 leading-relaxed resize-none bg-white shadow-xs"
          />
        </div>

        <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-white text-xs font-medium text-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-xs active:scale-98"
          >
            <Save className="w-3.5 h-3.5" /> Save Notes
          </button>
        </div>

      </div>
    </div>
  );
};
