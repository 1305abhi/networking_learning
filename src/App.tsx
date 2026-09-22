import React, { useState } from 'react';
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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <span className="text-slate-900 font-semibold">NetLearn</span>
            <span>• 30-Day Networking Fundamentals & CCNA Readiness</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Local-First Storage</span>
            <span>•</span>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-slate-700 transition-colors"
            >
              Export / Import
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentView('final-assessment')}
              className="hover:text-indigo-600 transition-colors"
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
