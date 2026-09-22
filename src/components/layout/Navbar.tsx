import React from 'react';
import { 
  Network, 
  LayoutDashboard, 
  Map, 
  Binary, 
  Layers, 
  Terminal, 
  ListFilter, 
  CreditCard, 
  Award, 
  Flame, 
  Settings 
} from 'lucide-react';
import { CurrentView } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { StudyTimer } from './StudyTimer';

interface NavbarProps {
  currentView: CurrentView;
  setCurrentView: (view: CurrentView) => void;
  openSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, openSettings }) => {
  const { progress } = useProgress();

  const navItems = [
    { id: 'dashboard' as CurrentView, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap' as CurrentView, label: 'Roadmap', icon: Map },
    { id: 'subnet-tool' as CurrentView, label: 'Subnet Calc', icon: Binary },
    { id: 'packet-tool' as CurrentView, label: 'Packet Flow', icon: Layers },
    { id: 'cli-simulator' as CurrentView, label: 'CLI Tools', icon: Terminal },
    { id: 'ports-explorer' as CurrentView, label: 'Ports (0-1023)', icon: ListFilter },
    { id: 'final-assessment' as CurrentView, label: 'Day 30 Exam', icon: Award }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentView('dashboard')} 
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-8 h-8 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                  NetLearn <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-semibold">30-Day CCNA</span>
                </div>
              </div>
            </button>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-indigo-700 font-semibold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-2.5">
            {/* Streak Counter */}
            <div 
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-800"
              title="Consecutive Days Streak"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{progress.streak}d</span>
            </div>

            {/* Study Focus Timer */}
            <StudyTimer />

            {/* Settings & Data Import/Export */}
            <button
              onClick={openSettings}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              title="Data Export & Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation bar */}
      <div className="md:hidden border-t border-slate-100 px-2 py-1.5 flex overflow-x-auto gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3 h-3" />
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
