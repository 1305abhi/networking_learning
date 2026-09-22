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
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700">
                DAY 30 CAPSTONE
              </span>
              <h1 className="text-xl font-bold text-slate-900">Networking Fundamentals Final Assessment</h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              50 comprehensive questions assessing CCNA fundamentals and SOC readiness
            </p>
          </div>

          {isSubmitted && (
            <button
              onClick={handleRetakeExam}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Exam
            </button>
          )}
        </div>
      </div>

      {isSubmitted && scoreData ? (
        /* Results Scorecard & Certificate View */
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          
          <div className="text-center space-y-2 pb-6 border-b border-slate-100">
            <div className="inline-flex p-3 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 mb-1">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Networking Fundamentals Score: {scoreData.percentage}%
            </h2>
            <p className="text-xs text-slate-500">
              {scoreData.total} out of 50 questions answered correctly • Completed on {new Date(scoreData.date).toLocaleDateString()}
            </p>
            <div className="pt-2">
              {scoreData.percentage >= 80 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4" /> Certification Readiness Achieved
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  <AlertTriangle className="w-4 h-4" /> Needs Targeted Revision (Target: 80%)
                </span>
              )}
            </div>
          </div>

          {/* Domain Breakdown Bars */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Diagnostic Domain Breakdown
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(scoreData.categoryScores).map(([cat, pct]) => (
                <div key={cat} className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex justify-between font-semibold text-slate-800">
                    <span>{cat}</span>
                    <span className="font-mono">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${
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
            <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
              <span className="font-bold text-emerald-900 block flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Confirmed Strengths:
              </span>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-emerald-900">
                {Object.entries(scoreData.categoryScores)
                  .filter(([_, score]) => score >= 75)
                  .map(([cat]) => (
                    <li key={cat}>{cat} mastery demonstrated</li>
                  ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-amber-50/50 border border-amber-200 text-xs text-amber-950 space-y-1.5">
              <span className="font-bold text-amber-900 block flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> Focus Revision Areas:
              </span>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-900">
                {Object.entries(scoreData.categoryScores)
                  .filter(([_, score]) => score < 75)
                  .map(([cat]) => (
                    <li key={cat}>{cat} concepts need refresher review</li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Recommended Next Module Progression */}
          <div className="p-4 rounded-lg bg-slate-900 text-slate-100 text-xs space-y-2">
            <span className="text-indigo-400 font-bold uppercase tracking-wider block">
              Recommended Next Learning Progression
            </span>
            <p className="text-slate-300 leading-relaxed font-mono">
              Networking Fundamentals (Completed) ➔ Linux Fundamentals ➔ Wireshark + Nmap ➔ SOC Analyst Incident Triage ➔ Web/API Security
            </p>
          </div>

        </div>
      ) : (
        /* Exam In Progress View */
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          
          {/* Question Stepper Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2 font-medium text-slate-600">
              <span className="font-mono font-bold text-indigo-700 text-sm">
                Question {currentIdx + 1} of {totalQuestions}
              </span>
              <span>• Domain: {currentQ.category}</span>
            </div>
            <span className="font-mono text-slate-500">
              {answeredCount} / {totalQuestions} Answered
            </span>
          </div>

          {/* Current Question */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="space-y-2">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = answers[currentQ.id] === oIdx;
                return (
                  <div
                    key={oIdx}
                    onClick={() => handleSelectOption(currentQ.id, oIdx)}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-semibold ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
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
            <span className="text-[11px] text-slate-500 block mb-2 font-medium">Question Navigator:</span>
            <div className="flex flex-wrap gap-1">
              {FINAL_EXAM_QUESTIONS.map((q, idx) => {
                const isAns = answers[q.id] !== undefined;
                const isCurrent = idx === currentIdx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-7 h-7 rounded text-[10px] font-mono font-medium transition-colors ${
                      isCurrent
                        ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-300'
                        : isAns
                        ? 'bg-slate-200 text-slate-800'
                        : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
              disabled={currentIdx === 0}
              className="px-3.5 py-1.5 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40 text-xs font-medium text-slate-700 transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {currentIdx < totalQuestions - 1 ? (
                <button
                  onClick={() => setCurrentIdx(currentIdx + 1)}
                  className="px-4 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleSubmitExam}
                  disabled={answeredCount < totalQuestions}
                  className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition-colors shadow-sm"
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
