
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Award } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
  topic: string;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete, topic }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentStep];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="p-8 text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Award size={40} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Quiz Complete!</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-6">You scored {score} out of {questions.length} on {topic}.</p>
        
        <div className="mb-8">
          <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-500 mb-1">{percentage}%</div>
          <div className="w-48 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-1000" 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={handleReset}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw size={18} className="mr-2" /> Try Again
          </button>
          <button 
            onClick={onComplete}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
          >
            Finish & Log XP
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-8">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Question {currentStep + 1} of {questions.length}
        </span>
        <div className="flex space-x-1">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 w-8 rounded-full transition-colors ${i <= currentStep ? 'bg-blue-600' : 'bg-slate-100 dark:bg-slate-800'}`} 
            />
          ))}
        </div>
      </div>

      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
        {currentQuestion.question}
      </h3>

      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, index) => {
          let stateClass = 'border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/10 text-slate-700 dark:text-slate-300';
          if (isAnswered) {
            if (index === currentQuestion.correctAnswerIndex) {
              stateClass = 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-900 dark:text-emerald-400';
            } else if (index === selectedOption) {
              stateClass = 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-900 dark:text-red-400';
            } else {
              stateClass = 'opacity-50 border-slate-100 dark:border-slate-900';
            }
          }

          return (
            <button
              key={index}
              disabled={isAnswered}
              onClick={() => handleOptionSelect(index)}
              className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${stateClass}`}
            >
              <span className="font-medium text-sm md:text-base">{option}</span>
              {isAnswered && index === currentQuestion.correctAnswerIndex && <CheckCircle2 size={20} className="text-emerald-500" />}
              {isAnswered && index === selectedOption && index !== currentQuestion.correctAnswerIndex && <XCircle size={20} className="text-red-500" />}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-xl p-4 mb-8 animate-in slide-in-from-bottom-2">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <span className="font-bold text-slate-900 dark:text-slate-200">Explanation:</span> {currentQuestion.explanation}
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center shadow-lg shadow-blue-500/10"
        >
          {currentStep === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          <ChevronRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Quiz;
