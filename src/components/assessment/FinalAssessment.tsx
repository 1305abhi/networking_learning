import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, AlertTriangle, ArrowRight, RotateCcw, Printer, Share2 } from 'lucide-react';
import { FINAL_EXAM_QUESTIONS, FinalExamQuestion } from '../../data/finalExamQuestions';
import { useProgress } from '../../context/ProgressContext';

export const FinalAssessment: React.FC = () => {
  const { progress, saveFinalExamScore } = useProgress();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!progress.finalExamScore);

  const currentQ: FinalExamQuestion = FINAL_EXAM_QUESTIONS[currentIdx];
  const totalQuestions = FINAL_EXAM_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitExam = () => {
    let correct = 0;
    const catScores: Record<string, { correct: number; total: number }> = {
      Foundations: { correct: 0, total: 0 },
      Switching: { correct: 0, total: 0 },
      Subnetting: { correct: 0, total: 0 },
      Protocols: { correct: 0, total: 0 },
      Routing: { correct: 0, total: 0 },
      Security: { correct: 0, total: 0 }
    };

    FINAL_EXAM_QUESTIONS.forEach((q) => {
      const cat = q.category;
      catScores[cat].total++;
      if (answers[q.id] === q.correctAnswer) {
        correct++;
        catScores[cat].correct++;
      }
    });

    const percentage = Math.round((correct / totalQuestions) * 100);
    const categoryPercentages: Record<string, number> = {};
    Object.keys(catScores).forEach((k) => {
      categoryPercentages[k] = Math.round((catScores[k].correct / catScores[k].total) * 100);
    });

    saveFinalExamScore(correct, percentage, categoryPercentages);
    setIsSubmitted(true);
  };

  const handleRetakeExam = () => {
    setAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
  };

  const scoreData = progress.finalExamScore;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700">
                DAY 30 CAPSTONE
              </span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Networking Fundamentals Final Assessment</h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              50 comprehensive questions assessing CCNA foundations, subnetting calculations, and SOC incident triage
            </p>
          </div>

          {isSubmitted && (
            <button
              onClick={handleRetakeExam}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 transition-all active:scale-98 shadow-xs self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Exam
            </button>
          )}
        </div>
      </div>

      {isSubmitted && scoreData ? (
        /* Results Scorecard & Certificate View */
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-7">
          
          <div className="text-center space-y-2.5 pb-6 border-b border-slate-100">
            <div className="inline-flex p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 mb-1 shadow-xs">
              <Award className="w-9 h-9" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Exam Score: <span className="text-indigo-600 font-mono">{scoreData.percentage}%</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {scoreData.total} out of 50 questions answered correctly • Completed on {new Date(scoreData.date).toLocaleDateString()}
            </p>
            <div className="pt-2">
              {scoreData.percentage >= 80 ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Certification Readiness Achieved
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> Needs Targeted Revision (Target: 80%)
                </span>
              )}
            </div>
          </div>

          {/* Domain Breakdown Bars */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Diagnostic Domain Performance
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
              {Object.entries(scoreData.categoryScores).map(([cat, pct]) => (
                <div key={cat} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 shadow-xs">
                  <div className="flex justify-between font-semibold text-slate-800">
                    <span>{cat}</span>
                    <span className="font-mono text-slate-900">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Revision Needs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-2 shadow-xs">
              <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Confirmed Strengths:
              </span>
              <ul className="list-disc list-inside space-y-1 text-xs text-emerald-900">
                {Object.entries(scoreData.categoryScores)
                  .filter(([_, score]) => score >= 75)
                  .map(([cat]) => (
                    <li key={cat}>{cat} core mastery validated</li>
                  ))}
              </ul>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2 shadow-xs">
              <span className="font-bold text-amber-900 block flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> Recommended Review Areas:
              </span>
              <ul className="list-disc list-inside space-y-1 text-xs text-amber-900">
                {Object.entries(scoreData.categoryScores)
                  .filter(([_, score]) => score < 75)
                  .map(([cat]) => (
                    <li key={cat}>{cat} concepts need refresher study</li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Recommended Next Module Progression */}
          <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 text-xs space-y-2 shadow-xs">
            <span className="text-indigo-400 font-bold uppercase tracking-wider block">
              Recommended Next Career Progression
            </span>
            <p className="text-slate-300 leading-relaxed font-mono text-xs sm:text-sm">
              Networking Fundamentals (Completed) ➔ Linux Administration ➔ Wireshark & Nmap Deep Dive ➔ SOC Incident Triage ➔ Web & API Security
            </p>
          </div>

        </div>
      ) : (
        /* Exam In Progress View */
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-6">
          
          {/* Question Stepper Bar */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-medium text-slate-600">
              <span className="font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg">
                Question {currentIdx + 1} of {totalQuestions}
              </span>
              <span className="text-slate-500">• Domain: <strong className="text-slate-800 font-semibold">{currentQ.category}</strong></span>
            </div>
            <span className="font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg text-xs font-semibold">
              {answeredCount} / {totalQuestions} Answered
            </span>
          </div>

          {/* Current Question */}
          <div className="space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = answers[currentQ.id] === oIdx;
                return (
                  <div
                    key={oIdx}
                    onClick={() => handleSelectOption(currentQ.id, oIdx)}
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-semibold ring-2 ring-indigo-500/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                      isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Grid Navigator (1 to 50) */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 block mb-2.5 uppercase tracking-wider">
              Question Navigator (1 to 50):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {FINAL_EXAM_QUESTIONS.map((q, idx) => {
                const isAns = answers[q.id] !== undefined;
                const isCurrent = idx === currentIdx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-8 h-8 rounded-lg text-xs font-mono font-semibold transition-all ${
                      isCurrent
                        ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-300 shadow-xs'
                        : isAns
                        ? 'bg-slate-200 text-slate-900 font-bold'
                        : 'bg-slate-50 text-slate-500 border border-slate-200/80 hover:bg-slate-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 text-xs sm:text-sm font-semibold text-slate-700 transition-all active:scale-98 shadow-xs"
            >
              Previous
            </button>

            <div className="flex items-center gap-2.5">
              {currentIdx < totalQuestions - 1 ? (
                <button
                  onClick={() => setCurrentIdx(currentIdx + 1)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-all active:scale-98 shadow-xs"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleSubmitExam}
                  disabled={answeredCount < totalQuestions}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-98"
                >
                  Submit 50-Question Exam
                </button>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
