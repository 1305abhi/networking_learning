import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Wrench, 
  CheckCircle2, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  AlertTriangle, 
  FileText,
  ShieldAlert,
  Cpu,
  Check,
  X
} from 'lucide-react';
import { ALL_LESSONS } from '../../data/lessons';
import { FLASHCARDS } from '../../data/flashcards';
import { useProgress } from '../../context/ProgressContext';
import { ActiveTab, QuizQuestion } from '../../types';

interface LessonViewProps {
  dayNumber: number;
  onBackToRoadmap: () => void;
  onSelectDay: (day: number) => void;
  openNotes: (day: number) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ 
  dayNumber, 
  onBackToRoadmap, 
  onSelectDay,
  openNotes 
}) => {
  const { progress, markDayComplete, recordQuizScore, toggleBookmark, toggleDifficult } = useProgress();
  const [activeTab, setActiveTab] = useState<ActiveTab>('learn');

  // Flashcard flipping state
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  // Quiz state
  const [userSelections, setUserSelections] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const lesson = ALL_LESSONS[dayNumber] || ALL_LESSONS[1];
  const isBookmarked = progress.bookmarkedDays.includes(dayNumber);
  const isDifficult = progress.difficultDays.includes(dayNumber);
  const isCompleted = progress.completedDays.includes(dayNumber);
  const savedScore = progress.quizScores[dayNumber];

  // Filter flashcards for this day
  const dayFlashcards = FLASHCARDS.filter((fc) => fc.day === dayNumber);

  // Handle quiz option selection
  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setUserSelections((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  // Submit Quiz
  const handleSubmitQuiz = () => {
    let correct = 0;
    lesson.partD.questions.forEach((q) => {
      if (userSelections[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const percentage = Math.round((correct / lesson.partD.questions.length) * 100);
    recordQuizScore(dayNumber, percentage);
    setQuizSubmitted(true);
  };

  const handleRetakeQuiz = () => {
    setUserSelections({});
    setQuizSubmitted(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Header / Day Navigation Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToRoadmap}
              className="p-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
              title="Return to Roadmap"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700">
                  DAY {lesson.day} OF 30
                </span>
                {isCompleted && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" /> Completed
                  </span>
                )}
                {savedScore !== undefined && (
                  <span className="text-xs font-mono text-slate-500 font-medium">
                    Quiz: {savedScore}%
                  </span>
                )}
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
                {lesson.title}
              </h1>
            </div>
          </div>

          {/* Day Actions */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Notes button */}
            <button
              onClick={() => openNotes(dayNumber)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              Notes {progress.notes[dayNumber] ? '•' : ''}
            </button>

            {/* Bookmark */}
            <button
              onClick={() => toggleBookmark(dayNumber)}
              className={`p-1.5 rounded-md border transition-colors ${
                isBookmarked 
                  ? 'border-amber-200 bg-amber-50 text-amber-600' 
                  : 'border-slate-200 hover:bg-slate-50 text-slate-400'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark this day'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Difficult flag */}
            <button
              onClick={() => toggleDifficult(dayNumber)}
              className={`p-1.5 rounded-md border transition-colors ${
                isDifficult 
                  ? 'border-red-200 bg-red-50 text-red-600' 
                  : 'border-slate-200 hover:bg-slate-50 text-slate-400'
              }`}
              title={isDifficult ? 'Flagged as difficult' : 'Mark as difficult'}
            >
              <AlertTriangle className={`w-4 h-4 ${isDifficult ? 'fill-current' : ''}`} />
            </button>

            {/* Previous / Next Day buttons */}
            <div className="flex items-center border border-slate-200 rounded-md overflow-hidden">
              <button
                onClick={() => onSelectDay(Math.max(1, dayNumber - 1))}
                disabled={dayNumber <= 1}
                className="p-1.5 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 transition-colors"
                title="Previous Day"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onSelectDay(Math.min(30, dayNumber + 1))}
                disabled={dayNumber >= 30}
                className="p-1.5 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 border-l border-slate-200 transition-colors"
                title="Next Day"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 5-Part Navigation Tabs */}
        <div className="flex items-center gap-1 border-t border-slate-100 pt-3 overflow-x-auto text-xs font-medium">
          {[
            { id: 'learn' as ActiveTab, label: 'Part A: Learn (45m)', icon: BookOpen },
            { id: 'understand' as ActiveTab, label: 'Part B: Understand (20m)', icon: HelpCircle },
            { id: 'practice' as ActiveTab, label: 'Part C: Practice (35m)', icon: Wrench },
            { id: 'quiz' as ActiveTab, label: 'Part D: Quiz (20m)', icon: CheckCircle2 },
            { id: 'revision' as ActiveTab, label: 'Part E: Revision (20m)', icon: RotateCcw }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Container */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm min-h-[500px]">
        
        {/* ================= PART A: LEARN ================= */}
        {activeTab === 'learn' && (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-indigo-50/50 border border-indigo-100 text-slate-800 text-sm leading-relaxed">
              <span className="font-bold text-indigo-900 block mb-1">Lesson Brief</span>
              {lesson.partA.summary}
            </div>

            {lesson.partA.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-slate-900 pb-1 border-b border-slate-100">
                  {sec.heading}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {sec.content}
                </p>

                {/* Table if present */}
                {sec.table && (
                  <div className="border border-slate-200 rounded-lg overflow-x-auto my-3">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
                          {sec.table.headers.map((h, hi) => (
                            <th key={hi} className="py-2.5 px-3">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {sec.table.rows.map((row, ri) => (
                          <tr key={ri} className="hover:bg-slate-50/50">
                            {row.map((cell, ci) => (
                              <td key={ci} className="py-2.5 px-3 leading-relaxed">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Diagram if present */}
                {sec.diagram && (
                  <div className="p-4 rounded-lg bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto my-3 shadow-inner leading-relaxed">
                    <pre>{sec.diagram}</pre>
                  </div>
                )}

                {/* Key Terms */}
                {sec.keyTerms && sec.keyTerms.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
                    {sec.keyTerms.map((term, ti) => (
                      <div key={ti} className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs">
                        <span className="font-bold text-slate-900 block font-mono">{term.term}</span>
                        <span className="text-slate-600 mt-0.5 block">{term.definition}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs text-slate-400">Theory portion complete</span>
              <button
                onClick={() => setActiveTab('understand')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-colors"
              >
                Proceed to Part B: Understand <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= PART B: UNDERSTAND ================= */}
        {activeTab === 'understand' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <Cpu className="w-4 h-4 text-indigo-600" /> Why This Concept Exists
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {lesson.partB.whyItExists}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> The Problem It Solves
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {lesson.partB.problemSolved}
                </p>
              </div>

            </div>

            {/* Behind the Scenes */}
            <div className="p-4 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs space-y-2">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block">
                Behind The Scenes Execution
              </span>
              <p className="leading-relaxed font-sans text-slate-300">
                {lesson.partB.behindTheScenes}
              </p>
            </div>

            {/* Common Mistakes */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Common Student Pitfalls to Avoid
              </h3>
              <div className="space-y-2">
                {lesson.partB.commonMistakes.map((mistake, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded bg-amber-50/60 border border-amber-200 text-xs text-amber-950">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{mistake}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cybersecurity & SOC Relevance */}
            <div className="p-4 rounded-lg bg-indigo-50/60 border border-indigo-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-indigo-600" />
                SOC & Cybersecurity Connection: {lesson.partB.socCybersecurityRelevance.title}
              </div>
              <p className="text-xs text-indigo-950 leading-relaxed">
                {lesson.partB.socCybersecurityRelevance.description}
              </p>
              <div className="mt-2 pt-2 border-t border-indigo-200 text-xs text-indigo-800 font-medium">
                💡 <span className="font-semibold">Investigation Tip:</span> {lesson.partB.socCybersecurityRelevance.investigationTip}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => setActiveTab('learn')}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                ← Back to Learn
              </button>
              <button
                onClick={() => setActiveTab('practice')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-colors"
              >
                Proceed to Part C: Practice Lab <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= PART C: PRACTICE ================= */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900">{lesson.partC.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lesson.partC.instructions}
              </p>
            </div>

            {lesson.partC.drillConfig && (
              <div className="border border-slate-200 rounded-xl p-5 space-y-4 bg-white shadow-xs">
                <div>
                  <span className="text-xs font-mono font-semibold text-indigo-600 uppercase tracking-wider">
                    PRACTICAL SCENARIO
                  </span>
                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    {lesson.partC.drillConfig.scenario}
                  </p>
                </div>

                {/* Hints */}
                <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1 text-xs">
                  <span className="font-semibold text-slate-700 block">Guidance & Hints:</span>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                    {lesson.partC.drillConfig.hints.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>

                {/* Solution Explanation Box */}
                <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                  <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Engineering Solution & Packet Flow:
                  </span>
                  <p className="leading-relaxed">
                    {lesson.partC.drillConfig.solutionExplanation}
                  </p>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => setActiveTab('understand')}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                ← Back to Understand
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-colors"
              >
                Proceed to Part D: Quiz <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= PART D: QUIZ ================= */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">{lesson.partD.title}</h3>
                <p className="text-xs text-slate-500">
                  {lesson.partD.questions.length} questions • 80% required to pass
                </p>
              </div>

              {quizSubmitted && (
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold font-mono px-3 py-1 rounded border ${
                    (savedScore || 0) >= 80 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    Score: {savedScore}%
                  </span>
                  <button
                    onClick={handleRetakeQuiz}
                    className="px-2.5 py-1 rounded text-xs border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                  >
                    Retake
                  </button>
                </div>
              )}
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {lesson.partD.questions.map((q, qIndex) => {
                const selectedOpt = userSelections[q.id];
                const isAnswered = selectedOpt !== undefined;
                const isCorrect = selectedOpt === q.correctAnswer;

                return (
                  <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-xs font-bold text-slate-400 mt-0.5">
                        Q{qIndex + 1}.
                      </span>
                      <p className="text-sm font-semibold text-slate-900 leading-snug">
                        {q.question}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-1.5 pl-6">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selectedOpt === optIdx;
                        let optionStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

                        if (quizSubmitted) {
                          if (optIdx === q.correctAnswer) {
                            optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                          } else if (isChosen && !isCorrect) {
                            optionStyle = 'border-red-400 bg-red-50 text-red-900';
                          }
                        } else if (isChosen) {
                          optionStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold ring-1 ring-indigo-600';
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIdx === q.correctAnswer && (
                              <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                            )}
                            {quizSubmitted && isChosen && !isCorrect && (
                              <X className="w-4 h-4 text-red-500 shrink-0 ml-2" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation if submitted */}
                    {quizSubmitted && (
                      <div className="mt-3 pl-6 pt-2 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
                        <span className="font-semibold text-slate-800">Explanation: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Action Footer */}
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => setActiveTab('practice')}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                ← Back to Practice
              </button>

              {!quizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(userSelections).length === 0}
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-medium text-xs transition-colors"
                >
                  Submit Quiz ({Object.keys(userSelections).length}/{lesson.partD.questions.length} answered)
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('revision')}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-colors"
                >
                  Proceed to Part E: Revision <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ================= PART E: REVISION ================= */}
        {activeTab === 'revision' && (
          <div className="space-y-6">
            
            {/* 5 Key Facts */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                5 High-Yield Key Facts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {lesson.partE.fiveKeyFacts.map((fact, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-2">
                    <span className="font-mono font-bold text-indigo-600">{idx + 1}.</span>
                    <span>{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini Scenario */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2 text-xs">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Mini Scenario Review
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {lesson.partE.miniScenario.scenario}
              </p>
              <div className="p-3 rounded bg-indigo-50/60 border border-indigo-100 text-indigo-950 space-y-1">
                <span className="font-bold block">Analysis & Resolution:</span>
                <p>{lesson.partE.miniScenario.answer}</p>
                <p className="text-[11px] text-indigo-800 mt-1">{lesson.partE.miniScenario.explanation}</p>
              </div>
            </div>

            {/* Flashcards */}
            {dayFlashcards.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Day {lesson.day} Flashcards (Click to flip)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dayFlashcards.map((fc) => {
                    const isFlipped = flippedCardId === fc.id;
                    return (
                      <div
                        key={fc.id}
                        onClick={() => setFlippedCardId(isFlipped ? null : fc.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all min-h-[120px] flex flex-col justify-between ${
                          isFlipped
                            ? 'bg-indigo-900 text-white border-indigo-800'
                            : 'bg-white hover:border-slate-300 text-slate-800 border-slate-200'
                        }`}
                      >
                        <div className="text-[10px] font-mono uppercase tracking-wider opacity-60">
                          {isFlipped ? 'ANSWER' : `${fc.category} • CLICK TO FLIP`}
                        </div>
                        <p className="text-xs font-semibold leading-relaxed my-2">
                          {isFlipped ? fc.back : fc.front}
                        </p>
                        <div className="text-[10px] opacity-40 text-right">
                          {fc.tag}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Day Completion Button */}
            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => setActiveTab('quiz')}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                ← Back to Quiz
              </button>

              <button
                onClick={() => {
                  markDayComplete(lesson.day);
                  if (lesson.day < 30) {
                    onSelectDay(lesson.day + 1);
                  } else {
                    onBackToRoadmap();
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                {isCompleted ? 'Marked Complete (Next Day)' : 'Mark Day Complete & Advance'}
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
