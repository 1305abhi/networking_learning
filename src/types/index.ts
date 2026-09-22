export type DayStatus = 'locked' | 'available' | 'in-progress' | 'completed' | 'revision-due';

export interface DayMeta {
  day: number;
  week: number;
  title: string;
  subtitle: string;
  timeEstimate: string; // e.g. "2 hours"
  targetTimeMinutes: number;
  topics: string[];
  cybersecurityFocus: string;
}

export interface PartAContent {
  summary: string;
  sections: {
    heading: string;
    content: string;
    table?: {
      headers: string[];
      rows: string[][];
    };
    diagram?: string;
    keyTerms?: { term: string; definition: string }[];
  }[];
}

export interface PartBContent {
  whyItExists: string;
  problemSolved: string;
  behindTheScenes: string;
  commonMistakes: string[];
  socCybersecurityRelevance: {
    title: string;
    description: string;
    investigationTip: string;
  };
}

export interface PartCPractice {
  title: string;
  instructions: string;
  type: 'subnet-calculator' | 'packet-flow' | 'topology' | 'cli-exercise' | 'interactive-drill' | 'protocol-matcher';
  drillConfig?: {
    scenario: string;
    initialData?: any;
    expectedSolution?: any;
    hints: string[];
    solutionExplanation: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'scenario';
  options: string[];
  correctAnswer: number; // index of options
  explanation: string;
  cybersecTip?: string;
}

export interface PartDQuiz {
  day: number;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface PartERevision {
  fiveKeyFacts: string[];
  threeCommonMistakes: string[];
  miniScenario: {
    scenario: string;
    question: string;
    answer: string;
    explanation: string;
  };
  flashcardIds: string[];
}

export interface LessonContent {
  day: number;
  title: string;
  partA: PartAContent;
  partB: PartBContent;
  partC: PartCPractice;
  partD: PartDQuiz;
  partE: PartERevision;
}

export interface Flashcard {
  id: string;
  day: number;
  front: string;
  back: string;
  category: string;
  tag?: string;
}

export interface PortEntry {
  port: number;
  protocol: 'TCP' | 'UDP' | 'TCP/UDP';
  name: string;
  description: string;
  socAlertRisk: string;
  defaultPlaintext: boolean;
}

export interface CliCommandScenario {
  command: string;
  description: string;
  os: 'Windows' | 'Linux' | 'Both';
  sampleOutput: string;
  socUsage: string;
  syntaxGuide: string;
}

export interface UserProgress {
  currentDay: number;
  completedDays: number[];
  quizScores: Record<number, number>; // day -> percentage
  labCompletions: Record<number, boolean>;
  studyMinutes: number;
  streak: number;
  lastStudyDate: string; // ISO date
  bookmarkedDays: number[];
  difficultDays: number[];
  notes: Record<number, string>; // day -> notes markdown
  masteredFlashcards: string[]; // flashcard IDs
  finalExamScore?: {
    total: number;
    percentage: number;
    categoryScores: Record<string, number>;
    date: string;
  };
}

export type ActiveTab = 'learn' | 'understand' | 'practice' | 'quiz' | 'revision';

export type CurrentView = 'dashboard' | 'roadmap' | 'lesson' | 'subnet-tool' | 'packet-tool' | 'topology-lab' | 'cli-simulator' | 'ports-explorer' | 'final-assessment';
