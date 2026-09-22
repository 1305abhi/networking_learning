import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export const StudyTimer: React.FC = () => {
  const { progress, addStudyMinutes } = useProgress();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border shadow-xs ${
          isActive 
            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold' 
            : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:text-slate-900'
        }`}
        title="Session Timer (Target: 2h/day)"
      >
        <Clock className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600 animate-pulse' : 'text-slate-400'}`} />
        <span>{formatTimer(seconds)}</span>
        <span className="text-slate-300">|</span>
        <span className="text-slate-500 font-sans font-medium">{totalHours}h logged</span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-68 p-4 bg-white rounded-xl shadow-lg shadow-slate-200/60 border border-slate-200/90 z-50 text-slate-800 text-xs animate-dropdown">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <span className="font-semibold text-slate-800 text-sm">Study Focus Timer</span>
            <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              2h daily target
            </span>
          </div>

          <div className="my-4 text-center">
            <div className="text-3xl font-mono font-bold tracking-tight text-slate-900">
              {formatTimer(seconds)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {progress.studyMinutes} mins completed today
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={toggleTimer}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all shadow-xs ${
                isActive 
                  ? 'bg-slate-800 hover:bg-slate-900 active:scale-98' 
                  : 'bg-indigo-600 hover:bg-indigo-700 active:scale-98'
              }`}
            >
              {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
              {isActive ? 'Pause Timer' : 'Start Focus'}
            </button>
            <button
              onClick={resetTimer}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* Progress Bar towards daily goal */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex justify-between text-[11px] font-medium text-slate-500 mb-1.5">
              <span>Goal Progress (120 min)</span>
              <span className="font-mono text-slate-700 font-semibold">{Math.min(100, Math.round((progress.studyMinutes / 120) * 100))}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (progress.studyMinutes / 120) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
