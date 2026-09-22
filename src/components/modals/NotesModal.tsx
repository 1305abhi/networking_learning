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
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl border border-slate-200 w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Personal Study Notes — Day {dayNumber}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <p className="text-xs text-slate-500">
            Topic: <span className="font-semibold text-slate-800">{dayMeta?.title}</span>
          </p>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your key takeaways, tricky subnet calculations, or reminder commands..."
            className="w-full h-48 p-3 rounded-lg border border-slate-200 text-xs font-sans text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 leading-relaxed resize-none"
          />
        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end gap-2 text-xs">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
          >
            <Save className="w-3.5 h-3.5" /> Save Notes
          </button>
        </div>

      </div>
    </div>
  );
};
