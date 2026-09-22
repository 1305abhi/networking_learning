import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  Binary, 
  Layers, 
  Terminal, 
  ListFilter, 
  Settings,
  Flame,
  Menu,
  X,
  Network
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
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toolItems = [
    { id: 'subnet-tool' as CurrentView, label: 'Subnet Calculator', desc: 'IPv4 CIDR, mask & host math', icon: Binary },
    { id: 'packet-tool' as CurrentView, label: 'Packet Journey', desc: 'L7 to L1 encapsulation visualizer', icon: Layers },
    { id: 'cli-simulator' as CurrentView, label: 'CLI Sandbox', desc: 'Interactive ping, traceroute, netstat', icon: Terminal },
    { id: 'ports-explorer' as CurrentView, label: 'Ports Matrix', desc: 'Standard 0–1023 reference guide', icon: ListFilter }
  ];

  const isToolActive = ['subnet-tool', 'packet-tool', 'cli-simulator', 'ports-explorer'].includes(currentView);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Primary Brand */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => {
                setCurrentView('dashboard');
                setMobileMenuOpen(false);
              }} 
              className="flex items-center gap-2.5 focus:outline-none group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs group-hover:bg-indigo-700 transition-colors">
                <Network className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  NetQuest
                </span>
                <span className="text-[10px] font-mono font-medium text-slate-500 bg-slate-100 border border-slate-200/80 px-1.5 py-0.5 rounded">
                  30-Day
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 text-sm">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  currentView === 'dashboard'
                    ? 'text-slate-950 font-semibold bg-slate-100 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Dashboard
              </button>

              <button
                onClick={() => setCurrentView('roadmap')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  currentView === 'roadmap'
                    ? 'text-slate-950 font-semibold bg-slate-100 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Roadmap
              </button>

              {/* Tools Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isToolActive
                      ? 'text-indigo-700 font-semibold bg-indigo-50 border border-indigo-100 shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  <span>Tools</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${toolsOpen ? 'rotate-180 text-slate-700' : ''}`} />
                </button>

                {toolsOpen && (
                  <div className="absolute left-0 mt-2 w-64 p-1.5 bg-white rounded-xl shadow-lg shadow-slate-200/60 border border-slate-200/90 z-50 animate-dropdown">
                    <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Interactive Utilities
                    </div>
                    {toolItems.map((item) => {
                      const Icon = item.icon;
                      const active = currentView === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setCurrentView(item.id);
                            setToolsOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded-lg flex items-start gap-3 transition-colors ${
                            active 
                              ? 'bg-indigo-50/80 text-indigo-950 font-medium' 
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className={`p-1.5 rounded-md mt-0.5 ${active ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-800">{item.label}</div>
                            <div className="text-[11px] text-slate-500 leading-snug">{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <button
                onClick={() => setCurrentView('final-assessment')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  currentView === 'final-assessment'
                    ? 'text-slate-950 font-semibold bg-slate-100 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Final Exam
              </button>
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Streak Indicator */}
            <div 
              className="flex items-center gap-1.5 text-xs font-mono font-medium text-amber-900 bg-amber-50/90 border border-amber-200/70 px-2.5 py-1.5 rounded-lg shadow-xs"
              title="Daily study streak"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{progress.streak}d streak</span>
            </div>

            {/* Study Focus Timer */}
            <StudyTimer />

            {/* Settings Icon */}
            <button
              onClick={openSettings}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-transparent hover:border-slate-200/60 transition-colors"
              title="Settings & Data Management"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 py-3.5 space-y-1.5 text-sm animate-dropdown">
          <button
            onClick={() => {
              setCurrentView('dashboard');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
              currentView === 'dashboard' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              setCurrentView('roadmap');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
              currentView === 'roadmap' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Curriculum Roadmap
          </button>
          
          <div className="pt-2 pb-1 border-t border-slate-100 mt-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 block mb-1">
              Tools & Simulators
            </span>
            {toolItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors ${
                    currentView === item.id ? 'bg-indigo-50/80 text-indigo-900 font-semibold' : ''
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 mt-2">
            <button
              onClick={() => {
                setCurrentView('final-assessment');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'final-assessment' ? 'bg-indigo-50 text-indigo-900 font-semibold' : 'text-indigo-600 hover:bg-indigo-50/50'
              }`}
            >
              Day 30 Final Assessment
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
