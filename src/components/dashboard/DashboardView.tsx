import React from 'react';
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Target, 
  ArrowRight, 
  RotateCcw, 
  Award,
  TrendingUp,
  Binary,
  Layers,
  Terminal,
  ListFilter
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { ROADMAP_DAYS, WEEK_MODULES } from '../../data/roadmap';
import { CurrentView } from '../../types';

interface DashboardViewProps {
  onSelectDay: (day: number) => void;
  setCurrentView: (view: CurrentView) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onSelectDay, setCurrentView }) => {
  const { progress } = useProgress();

  const currentDayMeta = ROADMAP_DAYS.find((d) => d.day === progress.currentDay) || ROADMAP_DAYS[0];
  const completedCount = progress.completedDays.length;
  const progressPercent = Math.round((completedCount / 30) * 100);

  // Calculate quiz average
  const quizEntries = Object.values(progress.quizScores);
  const avgQuizScore = quizEntries.length > 0 
    ? Math.round(quizEntries.reduce((a, b) => a + b, 0) / quizEntries.length)
    : 0;

  // Study hours
  const totalStudyHours = (progress.studyMinutes / 60).toFixed(1);

  // Revision Due Days
  const revisionDueDays = ROADMAP_DAYS.filter(
    (d) => progress.difficultDays.includes(d.day) || (progress.completedDays.includes(d.day) && (progress.quizScores[d.day] || 0) < 85)
  );

  return (
    <div className="space-y-6">
      
      {/* Hero Banner: Clean & Minimal */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="font-semibold text-indigo-600">Day {currentDayMeta.day} of 30</span>
              <span>•</span>
              <span>Week {currentDayMeta.week}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {currentDayMeta.title}
            </h1>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              {currentDayMeta.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectDay(currentDayMeta.day)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-colors shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Continue Day {currentDayMeta.day}
            </button>
            <button
              onClick={() => setCurrentView('roadmap')}
              className="px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors"
            >
              Roadmap
            </button>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Overall Curriculum: <strong className="text-slate-800 font-mono">{completedCount} of 30 days</strong> completed</span>
            <span>({progressPercent}%)</span>
          </div>
          <div className="w-full sm:w-64 bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Metrics Row: Crisp & Clean */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4">
          <div className="text-[11px] font-medium text-slate-500">Curriculum Progress</div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">
            {progressPercent}%
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">{completedCount} / 30 Days Finished</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4">
          <div className="text-[11px] font-medium text-slate-500">Current Streak</div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            {progress.streak} <span className="text-xs font-sans text-slate-400 font-normal">days</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Consecutive learning</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4">
          <div className="text-[11px] font-medium text-slate-500">Quiz Average</div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">
            {avgQuizScore > 0 ? `${avgQuizScore}%` : '—'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">{quizEntries.length} quizzes taken</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4">
          <div className="text-[11px] font-medium text-slate-500">Study Time</div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">
            {totalStudyHours} <span className="text-xs font-sans text-slate-400 font-normal">hrs</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">{progress.studyMinutes} focus minutes</div>
        </div>
      </div>

      {/* Two Column Layout: Module Progression + Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Modules Overview (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Weekly Modules</h2>
            <button
              onClick={() => setCurrentView('roadmap')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View Full 30-Day Grid →
            </button>
          </div>

          <div className="space-y-3">
            {WEEK_MODULES.map((module) => {
              const weekDays = ROADMAP_DAYS.filter((d) => d.week === module.week);
              const weekCompleted = weekDays.filter((d) => progress.completedDays.includes(d.day)).length;
              const weekPercent = Math.round((weekCompleted / weekDays.length) * 100);

              return (
                <div 
                  key={module.week}
                  onClick={() => setCurrentView('roadmap')}
                  className="p-3.5 rounded-lg border border-slate-200/70 hover:border-slate-300 hover:bg-slate-50/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-medium text-slate-400">Week {module.week}</span>
                        <h3 className="text-xs font-bold text-slate-900">{module.title}</h3>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{module.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-semibold text-slate-800">
                        {weekCompleted}/{weekDays.length}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-1 mt-2.5 overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${weekPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar: Revision Queue & Quick Tools (1 col) */}
        <div className="space-y-5">
          
          {/* Revision Queue */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Revision Due</span>
              <span className="text-xs font-mono text-slate-500">{revisionDueDays.length}</span>
            </div>

            {revisionDueDays.length === 0 ? (
              <p className="text-xs text-slate-400 py-2">
                All caught up! No flagged revision items.
              </p>
            ) : (
              <div className="space-y-1.5">
                {revisionDueDays.slice(0, 3).map((d) => (
                  <div 
                    key={d.day}
                    onClick={() => onSelectDay(d.day)}
                    className="p-2 rounded border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors text-xs flex items-center justify-between"
                  >
                    <span className="text-slate-800 truncate pr-2">Day {d.day}: {d.title}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Tools */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block pb-2 border-b border-slate-100">
              Tools & Drills
            </span>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setCurrentView('subnet-tool')}
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-left transition-colors"
              >
                <Binary className="w-4 h-4 text-indigo-600 mb-1" />
                <div className="font-semibold text-slate-800">Subnet Calc</div>
                <div className="text-[10px] text-slate-400">CIDR & binary</div>
              </button>

              <button
                onClick={() => setCurrentView('packet-tool')}
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-left transition-colors"
              >
                <Layers className="w-4 h-4 text-indigo-600 mb-1" />
                <div className="font-semibold text-slate-800">Packet Flow</div>
                <div className="text-[10px] text-slate-400">Encapsulation</div>
              </button>

              <button
                onClick={() => setCurrentView('cli-simulator')}
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-left transition-colors"
              >
                <Terminal className="w-4 h-4 text-indigo-600 mb-1" />
                <div className="font-semibold text-slate-800">CLI Sandbox</div>
                <div className="text-[10px] text-slate-400">ping & tracert</div>
              </button>

              <button
                onClick={() => setCurrentView('ports-explorer')}
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-left transition-colors"
              >
                <ListFilter className="w-4 h-4 text-indigo-600 mb-1" />
                <div className="font-semibold text-slate-800">Ports Matrix</div>
                <div className="text-[10px] text-slate-400">0–1023 reference</div>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
