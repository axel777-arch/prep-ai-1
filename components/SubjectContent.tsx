
import React, { useState, useEffect } from 'react';
import { Page, QuizQuestion } from '../types';
import { SUBJECT_METADATA } from '../constants';
import { getSubjectHelp, generateQuiz } from '../services/geminiService';
import { Book, HelpCircle, Loader2, Sparkles, ClipboardCheck, Youtube, ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import Quiz from './Quiz';

interface SubjectContentProps {
  type: Page.MATH | Page.PHYSICS | Page.CHEMISTRY | Page.HISTORY | Page.BIOLOGY | Page.CS | Page.LIT;
  onQuizComplete: () => void;
}

const SubjectContent: React.FC<SubjectContentProps> = ({ type, onQuizComplete }) => {
  const metadata = SUBJECT_METADATA[type as keyof typeof SUBJECT_METADATA];
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[] | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleTopicClick = async (topic: string) => {
    setSelectedTopic(topic);
    setIsLoading(true);
    setSlides([]);
    setCurrentSlideIndex(0);
    setQuizQuestions(null);
    setShowQuiz(false);
    try {
      const response = await getSubjectHelp(metadata.title, topic);
      if (response) {
        const parsedSlides = response.split('---SLIDE---').map(s => s.trim()).filter(Boolean);
        // Ensure we always have at least 5 slots (pad if necessary)
        const finalSlides = [...parsedSlides];
        while (finalSlides.length < 5) finalSlides.push("More information coming soon...");
        setSlides(finalSlides.slice(0, 5));
      } else {
        setSlides(["Unable to load content."]);
      }
    } catch (error) {
      setSlides(["Failed to fetch explanation. Is your API key set?"]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartQuiz = async () => {
    if (!selectedTopic) return;
    setIsQuizLoading(true);
    try {
      const questions = await generateQuiz(metadata.title, selectedTopic);
      setQuizQuestions(questions);
      setShowQuiz(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsQuizLoading(false);
    }
  };

  const getYoutubeLink = (topic: string) => {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(metadata.title + ' ' + topic + ' lesson')}`;
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{metadata.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">{metadata.description}</p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-medium text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-full uppercase tracking-widest">
          <Book size={14} />
          <span>Curriculum v2025</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metadata.topics.map((topic) => (
          <button
            key={topic}
            onClick={() => handleTopicClick(topic)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedTopic === topic 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20'
            }`}
          >
            <div className="font-semibold text-sm md:text-base">{topic}</div>
            <div className={`text-[10px] mt-1 uppercase tracking-wider font-bold ${selectedTopic === topic ? 'text-blue-100' : 'text-slate-400'}`}>
              Learn Module
            </div>
          </button>
        ))}
      </div>

      {selectedTopic ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
          <div className="border-b border-slate-100 dark:border-slate-800 p-6 flex items-center justify-between bg-white dark:bg-slate-900 sticky top-0 z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                {showQuiz ? <ClipboardCheck size={20} /> : <Sparkles size={20} />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {showQuiz ? `Checkpoint Quiz` : `${selectedTopic} — Slide ${currentSlideIndex + 1}/5`}
                </h3>
              </div>
            </div>
            {isLoading && (
              <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm animate-pulse">
                <Loader2 size={16} className="mr-2 animate-spin" />
                Drafting Module...
              </div>
            )}
          </div>
          
          <div className="flex-1 relative overflow-y-auto max-h-[600px] custom-scrollbar">
            {showQuiz && quizQuestions ? (
              <Quiz 
                questions={quizQuestions} 
                topic={selectedTopic} 
                onComplete={() => {
                  setShowQuiz(false);
                  onQuizComplete();
                }} 
              />
            ) : (
              <div className="p-8">
                {isLoading ? (
                  <div className="space-y-6">
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/4 animate-pulse"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4 animate-pulse"></div>
                    </div>
                    <div className="h-40 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full animate-pulse"></div>
                  </div>
                ) : slides.length > 0 ? (
                  <div className="animate-in slide-in-from-right-4 duration-300">
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed font-normal text-lg mb-8">
                        {slides[currentSlideIndex]}
                      </div>
                    </div>

                    {currentSlideIndex === 4 && (
                      <div className="space-y-8 animate-in fade-in duration-500 delay-150">
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-red-600 dark:text-red-400 font-bold">
                              <Youtube size={24} className="mr-2" />
                              <span>Video Resources</span>
                            </div>
                            <span className="text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 px-2 py-1 rounded font-bold">DEEP DIVE</span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Complement this lesson with expert visual guides from top academic creators.
                          </p>
                          <a 
                            href={getYoutubeLink(selectedTopic)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20 group"
                          >
                            <Play size={18} fill="currentColor" />
                            <span>Watch Module Video</span>
                            <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </div>
                        
                        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center">
                          <div className="text-center mb-6">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Knowledge Check</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Finish the module and earn streak points with a quiz.</p>
                          </div>
                          <button
                            onClick={handleStartQuiz}
                            disabled={isQuizLoading}
                            className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all disabled:opacity-50 flex items-center shadow-xl"
                          >
                            {isQuizLoading ? (
                              <><Loader2 size={18} className="mr-2 animate-spin" /> Analyzing Content...</>
                            ) : (
                              <><ClipboardCheck size={20} className="mr-2" /> Start Quick Quiz</>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {!showQuiz && slides.length > 0 && (
            <div className="p-6 bg-slate-50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                disabled={currentSlideIndex === 0}
                onClick={() => setCurrentSlideIndex(prev => prev - 1)}
                className="flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={20} className="mr-1" /> Previous
              </button>
              
              <div className="flex space-x-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 w-6 rounded-full transition-all ${i === currentSlideIndex ? 'bg-blue-600 w-10' : i < currentSlideIndex ? 'bg-blue-300 dark:bg-blue-800' : 'bg-slate-200 dark:bg-slate-700'}`}
                  />
                ))}
              </div>

              <button
                disabled={currentSlideIndex === 4}
                onClick={() => setCurrentSlideIndex(prev => prev + 1)}
                className="flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 disabled:opacity-30 transition-colors"
              >
                Next <ChevronRight size={20} className="ml-1" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 md:p-24 flex flex-col items-center justify-center text-slate-400 text-center">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
            <HelpCircle size={32} className="opacity-50" />
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white">Choose a module above</p>
          <p className="text-sm mt-2 max-w-xs">Select any topic to begin your 5-slide interactive tutorial.</p>
        </div>
      )}
    </div>
  );
};

export default SubjectContent;
