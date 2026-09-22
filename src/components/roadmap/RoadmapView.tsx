import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  Bookmark, 
  AlertTriangle
} from 'lucide-react';
import { ROADMAP_DAYS, WEEK_MODULES } from '../../data/roadmap';
import { useProgress } from '../../context/ProgressContext';
import { DayStatus } from '../../types';

interface RoadmapViewProps {
  onSelectDay: (day: number) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ onSelectDay }) => {
  const { progress, toggleBookmark } = useProgress();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');

  const getDayStatus = (day: number): DayStatus => {
    if (progress.completedDays.includes(day)) {
      const score = progress.quizScores[day];
      if (score !== undefined && score < 85) return 'revision-due';
      if (progress.difficultDays.includes(day)) return 'revision-due';
      return 'completed';
    }
    if (progress.currentDay === day) return 'in-progress';
    return 'available';
  };

  const filteredDays = ROADMAP_DAYS.filter((day) => {
    const matchesWeek = selectedWeek === 'all' || day.week === selectedWeek;
    const matchesSearch = 
      day.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      day.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      day.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesWeek && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">30-Day Curriculum Roadmap</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse all 30 days of CCNA foundations, hands-on lab exercises, and cybersecurity forensics.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search topic or concept..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200/90 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-slate-400 bg-white transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Week Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-medium pb-1">
        <button
          onClick={() => setSelectedWeek('all')}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            selectedWeek === 'all'
              ? 'bg-slate-900 text-white font-semibold shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/90 shadow-xs'
          }`}
        >
          All 30 Days
        </button>
        {WEEK_MODULES.map((m) => (
          <button
            key={m.week}
            onClick={() => setSelectedWeek(m.week)}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
              selectedWeek === m.week
                ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/90 shadow-xs'
            }`}
          >
            Week {m.week}: {m.title}
          </button>
        ))}
      </div>

      {/* Days Grid by Modules */}
      <div className="space-y-8">
        {WEEK_MODULES.filter((m) => selectedWeek === 'all' || m.week === selectedWeek).map((module) => {
          const moduleDays = filteredDays.filter((d) => d.week === module.week);
          if (moduleDays.length === 0) return null;

          return (
            <div key={module.week} className="space-y-3.5">
              <div className="flex items-baseline gap-2.5">
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
                  WEEK {module.week}
                </span>
                <h2 className="text-sm sm:text-base font-bold text-slate-900">{module.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {moduleDays.map((day) => {
                  const status = getDayStatus(day.day);
                  const isCompleted = status === 'completed';
                  const isCurrent = status === 'in-progress';
                  const isRevision = status === 'revision-due';
                  const isBookmarked = progress.bookmarkedDays.includes(day.day);
                  const score = progress.quizScores[day.day];

                  return (
                    <div
                      key={day.day}
                      onClick={() => onSelectDay(day.day)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all hover:border-slate-300 hover:shadow-md flex flex-col justify-between ${
                        isCurrent 
                          ? 'border-indigo-400 bg-white ring-2 ring-indigo-400/20 shadow-xs' 
                          : isRevision
                          ? 'border-amber-300 bg-white shadow-xs'
                          : isCompleted
                          ? 'border-slate-200/80 bg-slate-50/60'
                          : 'border-slate-200/90 bg-white shadow-xs'
                      }`}
                    >
                      <div className="space-y-2.5">
                        {/* Day number & Status */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-semibold text-slate-400">
                            Day {day.day < 10 ? `0${day.day}` : day.day}
                          </span>

                          <div className="flex items-center gap-1.5">
                            {isCompleted && (
                              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                                <CheckCircle2 className="w-2.5 h-2.5" /> Done
                              </span>
                            )}
                            {isCurrent && (
                              <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                                Current
                              </span>
                            )}
                            {isRevision && (
                              <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                                <AlertTriangle className="w-2.5 h-2.5" /> Review
                              </span>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(day.day);
                              }}
                              className={`p-1 rounded-md text-slate-300 hover:text-amber-500 hover:bg-slate-100 ${
                                isBookmarked ? 'text-amber-500 fill-amber-500' : ''
                              }`}
                            >
                              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {day.title}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                            {day.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                        <span>{day.timeEstimate}</span>
                        {score !== undefined ? (
                          <span className="font-mono text-slate-700 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                            Quiz: {score}%
                          </span>
                        ) : (
                          <span className="text-indigo-600 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            Start <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
