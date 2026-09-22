import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Award, 
  Search, 
  Filter, 
  ArrowRight, 
  Bookmark, 
  AlertTriangle,
  BookOpen
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
  const [statusFilter, setStatusFilter] = useState<string>('all');

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

    const status = getDayStatus(day.day);
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'completed' && status === 'completed') ||
      (statusFilter === 'in-progress' && status === 'in-progress') ||
      (statusFilter === 'revision-due' && status === 'revision-due') ||
      (statusFilter === 'bookmarked' && progress.bookmarkedDays.includes(day.day));

    return matchesWeek && matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Filter Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">30-Day Networking Roadmap</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Structured CCNA-aligned progression with 2 hours daily study target
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics (e.g. VLAN, Subnet, OSPF)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          
          {/* Week Selector */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedWeek('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedWeek === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Weeks
            </button>
            {WEEK_MODULES.map((m) => (
              <button
                key={m.week}
                onClick={() => setSelectedWeek(m.week)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedWeek === m.week
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Week {m.week}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="revision-due">Revision Due</option>
              <option value="bookmarked">Bookmarked</option>
            </select>
          </div>

        </div>
      </div>

      {/* 30-Day Grid Grouped by Weeks */}
      <div className="space-y-8">
        {WEEK_MODULES.filter((m) => selectedWeek === 'all' || m.week === selectedWeek).map((module) => {
          const moduleDays = filteredDays.filter((d) => d.week === module.week);
          if (moduleDays.length === 0) return null;

          return (
            <div key={module.week} className="space-y-3">
              
              {/* Week Section Heading */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
                    MODULE {module.week}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">{module.title}</h2>
                  <p className="text-xs text-slate-500">{module.description}</p>
                </div>
              </div>

              {/* Day Cards Grid */}
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
                      className={`bg-white rounded-xl border p-4 shadow-sm transition-all hover:shadow-md flex flex-col justify-between ${
                        isCurrent 
                          ? 'border-indigo-400 ring-1 ring-indigo-400' 
                          : isRevision
                          ? 'border-amber-300'
                          : isCompleted
                          ? 'border-slate-200 bg-slate-50/40'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="space-y-2.5">
                        
                        {/* Card Header: Day badge, Status chip, Bookmark */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                              DAY {day.day}
                            </span>
                            
                            {/* Status Chip */}
                            {isCompleted && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3" /> Done
                              </span>
                            )}
                            {isCurrent && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                                Current
                              </span>
                            )}
                            {isRevision && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                <AlertTriangle className="w-3 h-3" /> Review
                              </span>
                            )}
                          </div>

                          {/* Bookmark button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(day.day);
                            }}
                            className={`p-1 rounded hover:bg-slate-100 transition-colors ${
                              isBookmarked ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                            }`}
                            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this day'}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                          </button>
                        </div>

                        {/* Title & Subtitle */}
                        <div>
                          <h3 
                            onClick={() => onSelectDay(day.day)}
                            className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                          >
                            {day.title}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                            {day.subtitle}
                          </p>
                        </div>

                        {/* Topics tags */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {day.topics.slice(0, 3).map((topic, i) => (
                            <span 
                              key={i}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600 truncate max-w-[140px]"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                      </div>

                      {/* Card Footer: Time estimate, Score, CTA */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-slate-500 font-medium">
                          <Clock className="w-3 h-3" />
                          <span>{day.timeEstimate}</span>
                          {score !== undefined && (
                            <span className="font-mono text-slate-700 font-semibold">
                              | Quiz: {score}%
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => onSelectDay(day.day)}
                          className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          Start <ArrowRight className="w-3 h-3" />
                        </button>
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
