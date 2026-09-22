import React, { useState } from 'react';
import { Network } from 'lucide-react';
import { CurrentView } from './types';
import { useProgress } from './context/ProgressContext';
import { Navbar } from './components/layout/Navbar';
import { DashboardView } from './components/dashboard/DashboardView';
import { RoadmapView } from './components/roadmap/RoadmapView';
import { LessonView } from './components/lesson/LessonView';
import { SubnetCalculator } from './components/tools/SubnetCalculator';
import { PacketVisualizer } from './components/tools/PacketVisualizer';
import { CliSimulator } from './components/tools/CliSimulator';
import { PortsExplorer } from './components/tools/PortsExplorer';
import { FinalAssessment } from './components/assessment/FinalAssessment';
import { NotesModal } from './components/modals/NotesModal';
import { SettingsModal } from './components/modals/SettingsModal';

export const App: React.FC = () => {
  const { progress, setCurrentDay } = useProgress();
  const [currentView, setCurrentView] = useState<CurrentView>('dashboard');
  const [activeLessonDay, setActiveLessonDay] = useState<number>(progress.currentDay || 1);
  const [notesDay, setNotesDay] = useState<number | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const handleSelectDay = (day: number) => {
    setActiveLessonDay(day);
    setCurrentDay(day);
    setCurrentView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Top Fixed Header */}
      <Navbar
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main App Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {currentView === 'dashboard' && (
          <DashboardView
            onSelectDay={handleSelectDay}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'roadmap' && (
          <RoadmapView onSelectDay={handleSelectDay} />
        )}

        {currentView === 'lesson' && (
          <LessonView
            dayNumber={activeLessonDay}
            onBackToRoadmap={() => setCurrentView('roadmap')}
            onSelectDay={handleSelectDay}
            openNotes={(d) => setNotesDay(d)}
          />
        )}

        {currentView === 'subnet-tool' && <SubnetCalculator />}

        {currentView === 'packet-tool' && <PacketVisualizer />}

        {currentView === 'cli-simulator' && <CliSimulator />}

        {currentView === 'ports-explorer' && <PortsExplorer />}

        {currentView === 'final-assessment' && <FinalAssessment />}
      </main>

      {/* Footer */}
      <footer className="bg-white/95 backdrop-blur-md border-t border-slate-200/80 py-8 mt-16 text-xs text-slate-500 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Network className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-900 font-bold tracking-tight">NetQuest</span>
            <span className="text-slate-300">•</span>
            <span>30-Day Networking Fundamentals & CCNA Readiness</span>
          </div>
          
          <div className="flex items-center gap-3 text-slate-400">
            <span className="text-slate-400">Local-First Storage</span>
            <span>•</span>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="px-2.5 py-1 rounded-lg hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              Export / Import
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setCurrentView('final-assessment');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-2.5 py-1 rounded-lg text-indigo-600 hover:bg-indigo-50 font-medium transition-colors"
            >
              Day 30 Exam
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <NotesModal
        dayNumber={notesDay}
        onClose={() => setNotesDay(null)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

    </div>
  );
};
