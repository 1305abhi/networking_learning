import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  AlertTriangle, 
  FileText,
  CheckCircle2,
  Check,
  X
} from 'lucide-react';
import { ALL_LESSONS } from '../../data/lessons';
import { FLASHCARDS } from '../../data/flashcards';
import { useProgress } from '../../context/ProgressContext';
import { ActiveTab } from '../../types';

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

  const dayFlashcards = FLASHCARDS.filter((fc) => fc.day === dayNumber);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setUserSelections((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

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

  const tabs: { id: ActiveTab; label: string }[] = [
    { id: 'learn', label: '1. Learn' },
    { id: 'understand', label: '2. Understand' },
    { id: 'practice', label: '3. Practice' },
    { id: 'quiz', label: '4. Quiz' },
    { id: 'revision', label: '5. Revision' }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Header: Clean & Minimal */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToRoadmap}
              className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Return to Roadmap"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span>Day {lesson.day} of 30</span>
                {isCompleted && (
                  <span className="text-emerald-700 font-semibold">• Completed</span>
                )}
                {savedScore !== undefined && (
                  <span>• Quiz: {savedScore}%</span>
                )}
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-0.5">
                {lesson.title}
              </h1>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
            <button
              onClick={() => openNotes(dayNumber)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Notes{progress.notes[dayNumber] ? ' •' : ''}</span>
            </button>

            <button
              onClick={() => toggleBookmark(dayNumber)}
              className={`p-1.5 rounded border transition-colors ${
                isBookmarked 
                  ? 'border-amber-200 bg-amber-50 text-amber-600' 
                  : 'border-slate-200 hover:bg-slate-50 text-slate-400'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark this day'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => toggleDifficult(dayNumber)}
              className={`p-1.5 rounded border transition-colors ${
                isDifficult 
                  ? 'border-red-200 bg-red-50 text-red-600' 
                  : 'border-slate-200 hover:bg-slate-50 text-slate-400'
              }`}
              title={isDifficult ? 'Flagged as difficult' : 'Mark as difficult'}
            >
              <AlertTriangle className={`w-3.5 h-3.5 ${isDifficult ? 'fill-current' : ''}`} />
            </button>

            {/* Prev / Next buttons */}
            <div className="flex items-center border border-slate-200 rounded overflow-hidden">
              <button
                onClick={() => onSelectDay(Math.max(1, dayNumber - 1))}
                disabled={dayNumber <= 1}
                className="p-1 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onSelectDay(Math.min(30, dayNumber + 1))}
                disabled={dayNumber >= 30}
                className="p-1 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 border-l border-slate-200"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Clean Segmented Tab Navigation */}
        <div className="flex items-center border-b border-slate-100 text-xs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-3.5 border-b-2 font-medium transition-colors ${
                  isActive
                    ? 'border-indigo-600 text-indigo-700 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs min-h-[460px]">
        
        {/* ================= PART A: LEARN ================= */}
        {activeTab === 'learn' && (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-slate-50 border-l-3 border-indigo-600 text-slate-700 text-xs leading-relaxed">
              <strong className="text-slate-900 block mb-0.5">Overview:</strong>
              {lesson.partA.summary}
            </div>

            {lesson.partA.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3 pt-1">
                <h3 className="text-sm font-bold text-slate-900 pb-1 border-b border-slate-100">
                  {sec.heading}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {sec.content}
                </p>

                {sec.table && (
                  <div className="border border-slate-200 rounded-lg overflow-x-auto my-3">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                          {sec.table.headers.map((h, hi) => (
                            <th key={hi} className="py-2 px-3">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 text-[11px]">
                        {sec.table.rows.map((row, ri) => (
                          <tr key={ri} className="hover:bg-slate-50/50">
                            {row.map((cell, ci) => (
                              <td key={ci} className="py-2 px-3 leading-relaxed">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {sec.diagram && (
                  <div className="p-3.5 rounded-lg bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto my-3 leading-relaxed">
                    <pre>{sec.diagram}</pre>
                  </div>
                )}

                {sec.keyTerms && sec.keyTerms.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3">
                    {sec.keyTerms.map((term, ti) => (
                      <div key={ti} className="p-2.5 rounded bg-slate-50 border border-slate-200/80 text-[11px]">
                        <span className="font-bold text-slate-900 block font-mono">{term.term}</span>
                        <span className="text-slate-600 mt-0.5 block">{term.definition}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveTab('understand')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-colors"
              >
                Next: Part B (Understand) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= PART B: UNDERSTAND ================= */}
        {activeTab === 'understand' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-xs font-bold text-slate-900 block">Why It Exists</span>
                <p className="text-xs text-slate-600 leading-relaxed">{lesson.partB.whyItExists}</p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-xs font-bold text-slate-900 block">The Problem It Solves</span>
                <p className="text-xs text-slate-600 leading-relaxed">{lesson.partB.problemSolved}</p>
              </div>
            </div>

            {/* Behind the Scenes */}
            <div className="p-4 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs space-y-1">
              <span className="text-cyan-400 font-bold block text-[11px]">Behind The Scenes:</span>
              <p className="font-sans text-slate-300 leading-relaxed text-xs">{lesson.partB.behindTheScenes}</p>
            </div>

            {/* Common Mistakes */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Common Student Mistakes
              </span>
              <div className="space-y-1.5">
                {lesson.partB.commonMistakes.map((mistake, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-slate-50 border-l-2 border-amber-500 text-xs text-slate-700">
                    {mistake}
                  </div>
                ))}
              </div>
            </div>

            {/* SOC Relevance */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
              <span className="font-bold text-slate-900 block">
                SOC & Security Context: {lesson.partB.socCybersecurityRelevance.title}
              </span>
              <p className="text-slate-600 leading-relaxed">
                {lesson.partB.socCybersecurityRelevance.description}
              </p>
              <div className="pt-2 text-[11px] text-slate-800 font-medium">
                💡 <span className="font-semibold">Investigation Tip:</span> {lesson.partB.socCybersecurityRelevance.investigationTip}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-between items-center text-xs">
              <button onClick={() => setActiveTab('learn')} className="text-slate-500 hover:text-slate-800">
                ← Part A: Learn
              </button>
              <button
                onClick={() => setActiveTab('practice')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
              >
                Next: Part C (Practice) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= PART C: PRACTICE ================= */}
        {activeTab === 'practice' && (
          <div className="space-y-5">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
              <h3 className="text-sm font-bold text-slate-900">{lesson.partC.title}</h3>
              <p className="text-xs text-slate-600">{lesson.partC.instructions}</p>
            </div>

            {lesson.partC.drillConfig && (
              <div className="border border-slate-200 rounded-xl p-5 space-y-4">
                <div>
                  <span className="text-xs font-mono font-semibold text-indigo-600 uppercase">Scenario</span>
                  <p className="text-xs font-semibold text-slate-900 mt-1">{lesson.partC.drillConfig.scenario}</p>
                </div>

                <div className="p-3 rounded bg-slate-50 border border-slate-200/70 text-xs space-y-1">
                  <span className="font-medium text-slate-700 block">Hints:</span>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5 text-[11px]">
                    {lesson.partC.drillConfig.hints.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border-l-3 border-emerald-600 text-xs text-slate-800 space-y-1">
                  <span className="font-bold text-slate-900 block">Solution & Analysis:</span>
                  <p className="leading-relaxed text-[11px] text-slate-600">
                    {lesson.partC.drillConfig.solutionExplanation}
                  </p>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-slate-100 flex justify-between items-center text-xs">
              <button onClick={() => setActiveTab('understand')} className="text-slate-500 hover:text-slate-800">
                ← Part B: Understand
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
              >
                Next: Part D (Quiz) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= PART D: QUIZ ================= */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{lesson.partD.title}</h3>
                <p className="text-xs text-slate-500">
                  {lesson.partD.questions.length} questions • 80% passing threshold
                </p>
              </div>

              {quizSubmitted && (
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold font-mono px-2.5 py-0.5 rounded border ${
                    (savedScore || 0) >= 80 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {savedScore}%
                  </span>
                  <button
                    onClick={handleRetakeQuiz}
                    className="px-2 py-0.5 text-xs text-slate-500 hover:text-slate-800 border border-slate-200 rounded"
                  >
                    Retake
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-5">
              {lesson.partD.questions.map((q, qIndex) => {
                const selectedOpt = userSelections[q.id];
                const isChosen = selectedOpt !== undefined;
                const isCorrect = selectedOpt === q.correctAnswer;

                return (
                  <div key={q.id} className="p-4 rounded-lg border border-slate-200/80 bg-white space-y-2.5">
                    <div className="flex items-start gap-2 text-xs">
                      <span className="font-mono text-slate-400 font-bold">{qIndex + 1}.</span>
                      <p className="font-semibold text-slate-900 leading-snug">{q.question}</p>
                    </div>

                    <div className="space-y-1.5 pl-4">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = selectedOpt === optIdx;
                        let style = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

                        if (quizSubmitted) {
                          if (optIdx === q.correctAnswer) {
                            style = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                          } else if (isThisSelected && !isCorrect) {
                            style = 'border-red-300 bg-red-50 text-red-900';
                          }
                        } else if (isThisSelected) {
                          style = 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-medium';
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`p-2.5 rounded border text-xs cursor-pointer transition-colors flex items-center justify-between ${style}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIdx === q.correctAnswer && (
                              <Check className="w-3.5 h-3.5 text-emerald-600 ml-2" />
                            )}
                            {quizSubmitted && isThisSelected && !isCorrect && (
                              <X className="w-3.5 h-3.5 text-red-500 ml-2" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="mt-2 pl-4 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                        <strong className="text-slate-800">Explanation: </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
              <button onClick={() => setActiveTab('practice')} className="text-slate-500 hover:text-slate-800">
                ← Part C: Practice
              </button>

              {!quizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(userSelections).length === 0}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-medium transition-colors"
                >
                  Submit Quiz ({Object.keys(userSelections).length}/{lesson.partD.questions.length})
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('revision')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
                >
                  Next: Part E (Revision) <ArrowRight className="w-3.5 h-3.5" />
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
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                5 High-Yield Key Facts
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {lesson.partE.fiveKeyFacts.map((fact, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-slate-50 border border-slate-200/80 text-slate-700 flex items-start gap-2">
                    <span className="font-mono text-indigo-600 font-bold">{idx + 1}.</span>
                    <span>{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini Scenario */}
            <div className="p-4 rounded-lg border border-slate-200/80 bg-slate-50/50 space-y-1.5 text-xs">
              <span className="font-bold text-slate-900 block">Mini Scenario Review:</span>
              <p className="text-slate-700">{lesson.partE.miniScenario.scenario}</p>
              <div className="pt-2 text-slate-600">
                <strong className="text-slate-800">Resolution: </strong>
                {lesson.partE.miniScenario.answer}
              </div>
            </div>

            {/* Flashcards */}
            {dayFlashcards.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Flashcards (Click to flip)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {dayFlashcards.map((fc) => {
                    const isFlipped = flippedCardId === fc.id;
                    return (
                      <div
                        key={fc.id}
                        onClick={() => setFlippedCardId(isFlipped ? null : fc.id)}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors min-h-[110px] flex flex-col justify-between ${
                          isFlipped
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white hover:border-slate-300 text-slate-800 border-slate-200'
                        }`}
                      >
                        <div className="text-[10px] font-mono text-slate-400">
                          {isFlipped ? 'ANSWER' : 'QUESTION'}
                        </div>
                        <p className="text-xs font-medium my-2">
                          {isFlipped ? fc.back : fc.front}
                        </p>
                        <div className="text-[10px] text-slate-400 text-right">
                          {fc.tag}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mark Complete */}
            <div className="pt-6 border-t border-slate-100 flex justify-between items-center text-xs">
              <button onClick={() => setActiveTab('quiz')} className="text-slate-500 hover:text-slate-800">
                ← Part D: Quiz
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
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isCompleted ? 'Marked Complete (Next Day)' : 'Mark Day Complete'}
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
