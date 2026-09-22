import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export const StudyTimer: React.FC = () => {
  const { progress, addStudyMinutes } = useProgress();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((sec) => {
          const nextSec = sec + 1;
          if (nextSec % 60 === 0) {
            addStudyMinutes(1);
          }
          return nextSec;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, addStudyMinutes]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalHours = (progress.studyMinutes / 60).toFixed(1);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors border ${
          isActive 
            ? 'bg-indigo-50/70 border-indigo-200 text-indigo-700' 
            : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`}
        title="Session Timer (Target: 2h/day)"
      >
        <Clock className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600 animate-pulse' : 'text-slate-400'}`} />
        <span>{formatTimer(seconds)}</span>
        <span className="text-slate-300">·</span>
        <span className="text-slate-500 font-sans">{totalHours}h</span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 p-3.5 bg-white rounded-lg shadow-lg border border-slate-200 z-50 text-slate-800 text-xs animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-semibold text-slate-700">Study Session Timer</span>
            <span className="text-[11px] text-slate-400">2h daily goal</span>
          </div>

          <div className="my-3 text-center">
            <div className="text-2xl font-mono font-semibold text-slate-900">
              {formatTimer(seconds)}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {progress.studyMinutes} minutes logged today
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={toggleTimer}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-white transition-colors ${
                isActive ? 'bg-slate-800 hover:bg-slate-900' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isActive ? 'Pause' : 'Start Focus'}
            </button>
            <button
              onClick={resetTimer}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <div className="flex justify-between text-[10px] text-slate-500 mb-1">
              <span>Daily Target (120 min)</span>
              <span>{Math.min(100, Math.round((progress.studyMinutes / 120) * 100))}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
              <div
                className="bg-indigo-600 h-1 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (progress.studyMinutes / 120) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
