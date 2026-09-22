import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress } from '../types';

const STORAGE_KEY = 'netquest_progress_v1';
const LEGACY_STORAGE_KEY = 'netlearn_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  currentDay: 1,
  completedDays: [],
  quizScores: {},
  labCompletions: {},
  studyMinutes: 0,
  streak: 1,
  lastStudyDate: new Date().toISOString().split('T')[0],
  bookmarkedDays: [],
  difficultDays: [],
  notes: {},
  masteredFlashcards: []
};

interface ProgressContextType {
  progress: UserProgress;
  markDayComplete: (day: number) => void;
  recordQuizScore: (day: number, percentage: number) => void;
  recordLabComplete: (day: number) => void;
  addStudyMinutes: (minutes: number) => void;
  toggleBookmark: (day: number) => void;
  toggleDifficult: (day: number) => void;
  saveNote: (day: number, note: string) => void;
  toggleMasteredFlashcard: (flashcardId: string) => void;
  saveFinalExamScore: (total: number, percentage: number, categoryScores: Record<string, number>) => void;
  exportProgressJson: () => string;
  importProgressJson: (jsonString: string) => boolean;
  resetProgress: () => void;
  setCurrentDay: (day: number) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Verify streak
        const today = new Date().toISOString().split('T')[0];
        if (parsed.lastStudyDate) {
          const last = new Date(parsed.lastStudyDate);
          const current = new Date(today);
          const diffDays = Math.floor((current.getTime() - last.getTime()) / (1000 * 3600 * 24));
          if (diffDays > 1) {
            parsed.streak = 1;
          }
        }
        return { ...INITIAL_PROGRESS, ...parsed };
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    return INITIAL_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }, [progress]);

  const updateStreak = (prev: UserProgress) => {
    const today = new Date().toISOString().split('T')[0];
    if (prev.lastStudyDate === today) return prev.streak;
    const last = new Date(prev.lastStudyDate);
    const current = new Date(today);
    const diffDays = Math.floor((current.getTime() - last.getTime()) / (1000 * 3600 * 24));
    if (diffDays === 1) return prev.streak + 1;
    return 1;
  };

  const markDayComplete = (day: number) => {
    setProgress((prev) => {
      const today = new Date().toISOString().split('T')[0];
      const newStreak = updateStreak(prev);
      const completed = prev.completedDays.includes(day)
        ? prev.completedDays
        : [...prev.completedDays, day].sort((a, b) => a - b);
      return {
        ...prev,
        completedDays: completed,
        streak: newStreak,
        lastStudyDate: today,
        currentDay: Math.min(30, Math.max(prev.currentDay, day + 1))
      };
    });
  };

  const recordQuizScore = (day: number, percentage: number) => {
    setProgress((prev) => {
      const updatedScores = { ...prev.quizScores, [day]: percentage };
      if (percentage >= 80 && !prev.completedDays.includes(day)) {
        return {
          ...prev,
          quizScores: updatedScores,
          completedDays: [...prev.completedDays, day].sort((a, b) => a - b)
        };
      }
      return { ...prev, quizScores: updatedScores };
    });
  };

  const recordLabComplete = (day: number) => {
    setProgress((prev) => ({
      ...prev,
      labCompletions: { ...prev.labCompletions, [day]: true }
    }));
  };

  const addStudyMinutes = (minutes: number) => {
    setProgress((prev) => {
      const today = new Date().toISOString().split('T')[0];
      return {
        ...prev,
        studyMinutes: prev.studyMinutes + minutes,
        lastStudyDate: today
      };
    });
  };

  const toggleBookmark = (day: number) => {
    setProgress((prev) => ({
      ...prev,
      bookmarkedDays: prev.bookmarkedDays.includes(day)
        ? prev.bookmarkedDays.filter((d) => d !== day)
        : [...prev.bookmarkedDays, day]
    }));
  };

  const toggleDifficult = (day: number) => {
    setProgress((prev) => ({
      ...prev,
      difficultDays: prev.difficultDays.includes(day)
        ? prev.difficultDays.filter((d) => d !== day)
        : [...prev.difficultDays, day]
    }));
  };

  const saveNote = (day: number, note: string) => {
    setProgress((prev) => ({
      ...prev,
      notes: { ...prev.notes, [day]: note }
    }));
  };

  const toggleMasteredFlashcard = (id: string) => {
    setProgress((prev) => ({
      ...prev,
      masteredFlashcards: prev.masteredFlashcards.includes(id)
        ? prev.masteredFlashcards.filter((fcId) => fcId !== id)
        : [...prev.masteredFlashcards, id]
    }));
  };

  const saveFinalExamScore = (total: number, percentage: number, categoryScores: Record<string, number>) => {
    setProgress((prev) => ({
      ...prev,
      finalExamScore: {
        total,
        percentage,
        categoryScores,
        date: new Date().toISOString()
      },
      completedDays: prev.completedDays.includes(30) ? prev.completedDays : [...prev.completedDays, 30]
    }));
  };

  const exportProgressJson = () => {
    return JSON.stringify(progress, null, 2);
  };

  const importProgressJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed === 'object' && parsed !== null) {
        setProgress({ ...INITIAL_PROGRESS, ...parsed });
        return true;
      }
    } catch (e) {
      console.error('Import failed', e);
    }
    return false;
  };

  const resetProgress = () => {
    setProgress(INITIAL_PROGRESS);
  };

  const setCurrentDay = (day: number) => {
    setProgress((prev) => ({ ...prev, currentDay: day }));
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markDayComplete,
        recordQuizScore,
        recordLabComplete,
        addStudyMinutes,
        toggleBookmark,
        toggleDifficult,
        saveNote,
        toggleMasteredFlashcard,
        saveFinalExamScore,
        exportProgressJson,
        importProgressJson,
        resetProgress,
        setCurrentDay
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
