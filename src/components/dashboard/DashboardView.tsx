import React from 'react';
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Target, 
  BookOpen, 
  ArrowRight, 
  AlertCircle, 
  RotateCcw, 
  Award,
  Sparkles,
  TrendingUp
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

  // Labs completed
  const labCount = Object.keys(progress.labCompletions).length;

  // Revision Due Days (completed days with quiz score < 85% or difficult days)
  const revisionDueDays = ROADMAP_DAYS.filter(
    (d) => progress.difficultDays.includes(d.day) || (progress.completedDays.includes(d.day) && (progress.quizScores[d.day] || 0) < 85)
  );

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Current Day Hero */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700">
                DAY {currentDayMeta.day} OF 30
              </span>
              <span className="text-xs text-slate-500 font-medium">Week {currentDayMeta.week} Module</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {currentDayMeta.title}
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              {currentDayMeta.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => onSelectDay(currentDayMeta.day)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-sm shadow-indigo-200"
            >
              <Play className="w-4 h-4 fill-white" />
              Continue Learning
            </button>
            <button
              onClick={() => setCurrentView('roadmap')}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-sm transition-colors"
            >
              View Full Roadmap
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Today's 2-Hour Commitment Split */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2.5">
            <span className="text-slate-700 font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-500" /> Today's 2-Hour Study Structure
            </span>
            <span>Total: 120 minutes</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <div className="text-slate-500 font-medium">Part A: Theory</div>
              <div className="font-semibold text-slate-800 mt-0.5">45 min</div>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <div className="text-slate-500 font-medium">Part B: Understand</div>
              <div className="font-semibold text-slate-800 mt-0.5">20 min</div>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <div className="text-slate-500 font-medium">Part C: Practice Lab</div>
              <div className="font-semibold text-slate-800 mt-0.5">35 min</div>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <div className="text-slate-500 font-medium">Part D & E: Quiz / Review</div>
              <div className="font-semibold text-slate-800 mt-0.5">20 min</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Progress % */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Overall Progress</span>
            <Target className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">{progressPercent}%</span>
            <span className="text-xs text-slate-500 font-mono">({completedCount}/30 days)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div 
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Current Streak */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Study Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-slate-900">{progress.streak}</span>
            <span className="text-xs text-slate-500">consecutive days</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 truncate">
            {progress.lastStudyDate ? `Active today: ${progress.lastStudyDate}` : 'Start studying today!'}
          </p>
        </div>

        {/* Average Quiz Score */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Quiz Average</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">
              {avgQuizScore > 0 ? `${avgQuizScore}%` : 'N/A'}
            </span>
            <span className="text-xs text-slate-500">
              ({quizEntries.length} quizzes)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            {avgQuizScore >= 80 ? 'Passing benchmark met' : 'Target: 80% passing score'}
          </p>
        </div>

        {/* Total Time Invested */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Time Logged</span>
            <Clock className="w-4 h-4 text-slate-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-slate-900">{totalStudyHours}</span>
            <span className="text-xs text-slate-500">hours total</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            {progress.studyMinutes} focus minutes recorded
          </p>
        </div>
      </div>

      {/* Two Column Layout: Module Breakdown + Quick Revision Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Modules Overview (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Curriculum Modules</h2>
              <p className="text-xs text-slate-500 mt-0.5">30-day CCNA foundation roadmap</p>
            </div>
            <span className="text-xs font-mono font-medium text-slate-600">4 Weeks</span>
          </div>

          <div className="space-y-3">
            {WEEK_MODULES.map((module) => {
              const weekDays = ROADMAP_DAYS.filter((d) => d.week === module.week);
              const weekCompleted = weekDays.filter((d) => progress.completedDays.includes(d.day)).length;
              const weekPercent = Math.round((weekCompleted / weekDays.length) * 100);

              return (
                <div 
                  key={module.week}
                  className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-slate-50/50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-slate-500">WEEK {module.week}</span>
                        <h3 className="text-sm font-semibold text-slate-900">{module.title}</h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{module.description}</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-xs font-mono font-medium text-slate-700">
                        {weekCompleted}/{weekDays.length} Days
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">{weekPercent}%</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${weekPercent}%` }}
                    />
                  </div>

                  {/* Day Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-200/60">
                    {weekDays.map((d) => {
                      const isComplete = progress.completedDays.includes(d.day);
                      const isCurrent = progress.currentDay === d.day;
                      return (
                        <button
                          key={d.day}
                          onClick={() => onSelectDay(d.day)}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                            isComplete 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : isCurrent
                              ? 'bg-indigo-600 text-white font-semibold'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                          title={`Day ${d.day}: ${d.title}`}
                        >
                          D{d.day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revision Queue & Quick Tools (1 col) */}
        <div className="space-y-6">
          
          {/* Revision Queue */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Revision Due Today</h3>
              </div>
              <span className="text-xs font-mono font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                {revisionDueDays.length}
              </span>
            </div>

            {revisionDueDays.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">
                All caught up! No topics flagged for immediate revision.
              </p>
            ) : (
              <div className="space-y-2">
                {revisionDueDays.slice(0, 4).map((d) => (
                  <div 
                    key={d.day}
                    onClick={() => onSelectDay(d.day)}
                    className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors text-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">Day {d.day}: {d.title}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        Score: {progress.quizScores[d.day] ? `${progress.quizScores[d.day]}%` : 'Marked Difficult'}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hands-on Interactive Tools Shortcut */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Interactive Sandboxes</h3>
            
            <div className="space-y-2">
              <button
                onClick={() => setCurrentView('subnet-tool')}
                className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    Subnetting Calculator & Drills
                  </div>
                  <div className="text-[11px] text-slate-500">Calculate CIDR, masks, host bounds</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </button>

              <button
                onClick={() => setCurrentView('packet-tool')}
                className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    Packet Journey & Encapsulation
                  </div>
                  <div className="text-[11px] text-slate-500">L7 down to L1 visualizer</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </button>

              <button
                onClick={() => setCurrentView('cli-simulator')}
                className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    CLI Command Simulator
                  </div>
                  <div className="text-[11px] text-slate-500">ping, tracert, arp, netstat sandbox</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </button>

              <button
                onClick={() => setCurrentView('final-assessment')}
                className="w-full text-left p-2.5 rounded-lg border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-semibold text-indigo-900">
                    Day 30 Final Assessment
                  </div>
                  <div className="text-[11px] text-indigo-700">50-question CCNA readiness exam</div>
                </div>
                <Award className="w-4 h-4 text-indigo-600" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
