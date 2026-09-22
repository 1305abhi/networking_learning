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
  X
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
    { id: 'subnet-tool' as CurrentView, label: 'Subnet Calculator', desc: 'CIDR & subnetting math', icon: Binary },
    { id: 'packet-tool' as CurrentView, label: 'Packet Journey', desc: 'L7 to L1 encapsulation', icon: Layers },
    { id: 'cli-simulator' as CurrentView, label: 'CLI Sandbox', desc: 'ping, tracert, netstat', icon: Terminal },
    { id: 'ports-explorer' as CurrentView, label: 'Ports Matrix', desc: '0–1023 reference guide', icon: ListFilter }
  ];

  const isToolActive = ['subnet-tool', 'packet-tool', 'cli-simulator', 'ports-explorer'].includes(currentView);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13">
          
          {/* Logo */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => {
                setCurrentView('dashboard');
                setMobileMenuOpen(false);
              }} 
              className="flex items-center gap-1.5 focus:outline-none group text-left"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />
              <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                NetLearn
              </span>
              <span className="text-[10px] font-mono font-medium text-slate-400 ml-1">
                30-Day
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  currentView === 'dashboard'
                    ? 'text-slate-900 font-semibold bg-slate-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Dashboard
              </button>

              <button
                onClick={() => setCurrentView('roadmap')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  currentView === 'roadmap'
                    ? 'text-slate-900 font-semibold bg-slate-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Roadmap
              </button>

              {/* Tools Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
                    isToolActive
                      ? 'text-indigo-700 font-semibold bg-indigo-50/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>Tools</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {toolsOpen && (
                  <div className="absolute left-0 mt-1.5 w-56 p-1.5 bg-white rounded-lg shadow-lg border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-100">
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
                          className={`w-full text-left p-2 rounded-md flex items-center gap-2.5 transition-colors ${
                            active ? 'bg-indigo-50 text-indigo-900 font-medium' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                          <div>
                            <div className="text-xs">{item.label}</div>
                            <div className="text-[10px] text-slate-400">{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <button
                onClick={() => setCurrentView('final-assessment')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  currentView === 'final-assessment'
                    ? 'text-slate-900 font-semibold bg-slate-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Final Exam
              </button>
            </nav>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Streak */}
            <div 
              className="flex items-center gap-1 text-xs font-mono font-medium text-slate-600 bg-slate-50 border border-slate-200/80 px-2 py-1 rounded-md"
              title="Daily study streak"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{progress.streak}d</span>
            </div>

            {/* Study Focus Timer */}
            <StudyTimer />

            {/* Settings Icon */}
            <button
              onClick={openSettings}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Settings & Data"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-slate-600 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 text-xs">
          <button
            onClick={() => {
              setCurrentView('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-1.5 font-medium text-slate-800"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              setCurrentView('roadmap');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-1.5 font-medium text-slate-800"
          >
            Roadmap
          </button>
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Tools</span>
            {toolItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-1.5 text-slate-700 flex items-center gap-2"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setCurrentView('final-assessment');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-1.5 font-medium text-indigo-600"
            >
              Day 30 Final Exam
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
