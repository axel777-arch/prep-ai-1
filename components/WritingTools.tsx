
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { rateEssay, expandIdeasToEssay, spotMistakes, chatWithGemini } from '../services/geminiService';
import { Loader2, Sparkles, Wand2, ShieldAlert, CheckCircle2, FileText, History, Info, SearchCheck, ArrowRight, BookOpenCheck, Target, ClipboardList } from 'lucide-react';

interface WritingToolsProps {
  tool: Page.ESSAY_FEEDBACK | Page.ESSAY_WRITER | Page.SMART_REVIEW | Page.COLLEGE_MATCHER | Page.COLLEGE_REQUIREMENTS;
}

const WritingTools: React.FC<WritingToolsProps> = ({ tool }) => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedSchools, setSuggestedSchools] = useState<string[]>([]);
  const [requirementsResult, setRequirementsResult] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);

  // Reset internal states when tool changes
  useEffect(() => {
    setResult(null);
    setSuggestedSchools([]);
    setRequirementsResult(null);
    setSelectedSchool(null);
    setInputText('');
  }, [tool]);

  const collegeMatcherAction = async (input: string) => {
    const response = await chatWithGemini(`Based on these interests/stats: "${input}", suggest 5-7 universities. For each, explain WHY it fits. Crucial: List each school name clearly at the start of its section so I can extract them.`);
    
    // Heuristic to extract school names
    const lines = response.split('\n');
    const schoolsFound = lines
      .filter(line => line.match(/^[0-9]\.|^\*|^#/) && line.length < 100)
      .map(line => line.replace(/^[0-9]\.\s*|^\*\s*|^#+\s*/, '').split(':')[0].trim())
      .filter(name => name.length > 3 && name.split(' ').length < 8);
    
    setSuggestedSchools([...new Set(schoolsFound)].slice(0, 7));
    return response;
  };

  const getRequirements = async (school: string) => {
    setIsLoading(true);
    setSelectedSchool(school);
    setRequirementsResult(null);
    try {
      const prompt = `Provide the detailed admission requirements for ${school}. Include: 
      1. Estimated average GPA and SAT/ACT scores.
      2. Core essay prompts for the current cycle.
      3. Key deadlines (Early Action, Regular Decision).
      4. Any unique specific program requirements or interview policies.
      Keep it factual, organized in Markdown with bold headers.`;
      const response = await chatWithGemini(prompt);
      setRequirementsResult(response);
    } catch (e) {
      setRequirementsResult("Failed to fetch requirements. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getToolMeta = () => {
    switch (tool) {
      case Page.ESSAY_FEEDBACK:
        return {
          title: 'Essay Feedback',
          description: 'Get an objective score and tactical feedback for your college admission essay.',
          placeholder: 'Paste your full essay draft here...',
          icon: ShieldAlert,
          color: 'blue',
          action: rateEssay
        };
      case Page.ESSAY_WRITER:
        return {
          title: 'Essay Writer',
          description: 'Transform your rough ideas, experiences, and notes into a strong outline.',
          placeholder: 'List your experiences or draft ideas...',
          icon: Wand2,
          color: 'indigo',
          action: expandIdeasToEssay
        };
      case Page.SMART_REVIEW:
        return {
          title: 'Smart Review',
          description: 'Analyze your writing for logical flow and tone alignment.',
          placeholder: 'Paste text you want reviewed...',
          icon: FileText,
          color: 'emerald',
          action: spotMistakes
        };
      case Page.COLLEGE_MATCHER:
        return {
          title: 'College Matcher',
          description: 'Find your perfect school fit based on academic interests and extracurriculars.',
          placeholder: 'Describe your GPA, test scores, intended major, and hobbies...',
          icon: SearchCheck,
          color: 'orange',
          action: collegeMatcherAction
        };
      case Page.COLLEGE_REQUIREMENTS:
        return {
          title: 'College Requirements',
          description: 'Input any college name to see its specific admission requirements and deadlines.',
          placeholder: 'Enter a college name (e.g. Stanford University, MIT, UC Berkeley)...',
          icon: ClipboardList,
          color: 'red',
          action: (input: string) => getRequirements(input)
        };
    }
  };

  const meta = getToolMeta();

  const handleProcess = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setResult(null);
    setSuggestedSchools([]);
    setRequirementsResult(null);
    setSelectedSchool(null);
    try {
      if (tool === Page.COLLEGE_REQUIREMENTS) {
        await meta.action(inputText);
      } else {
        const response = await meta.action(inputText);
        setResult(response || 'No feedback could be generated.');
      }
    } catch (error) {
      setResult('Error processing text. Check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
            <meta.icon size={28} className={`mr-3 text-${meta.color}-600 dark:text-${meta.color}-400`} />
            {meta.title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">{meta.description}</p>
        </div>
      </div>

      <div className={`grid ${result || requirementsResult ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-8 items-start`}>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {tool === Page.COLLEGE_REQUIREMENTS ? (
              <div className="p-8 space-y-4">
                <input 
                  type="text"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-4 text-lg focus:ring-2 focus:ring-red-500 dark:text-white outline-none"
                  placeholder={meta.placeholder}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleProcess()}
                />
                <p className="text-xs text-slate-400">Press Enter or click the button to fetch live admission data.</p>
              </div>
            ) : (
              <textarea
                className="w-full h-[400px] p-8 bg-transparent focus:ring-0 outline-none resize-none text-slate-700 dark:text-slate-300 text-lg leading-relaxed"
                placeholder={meta.placeholder}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            )}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={handleProcess}
                disabled={!inputText.trim() || isLoading}
                className={`flex items-center space-x-2 bg-${meta.color}-600 hover:bg-${meta.color}-700 text-white px-8 py-3.5 rounded-2xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-${meta.color}-500/20`}
              >
                {isLoading && !selectedSchool ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
                <span>{isLoading && !selectedSchool ? 'Consulting AI...' : (tool === Page.COLLEGE_REQUIREMENTS ? 'Fetch Requirements' : 'Analyze Now')}</span>
              </button>
            </div>
          </div>
        </div>

        {(result || requirementsResult || (isLoading && selectedSchool)) && (
          <div className="space-y-6 h-[550px] overflow-y-auto custom-scrollbar pr-2">
            {result && (
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8 animate-in slide-in-from-right-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-xl">
                    <CheckCircle2 size={24} />
                    <span>AI Report</span>
                  </div>
                </div>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed text-base bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                    {result}
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Step for Matcher: "Which one do you want?" */}
            {tool === Page.COLLEGE_MATCHER && suggestedSchools.length > 0 && (
              <div className="bg-orange-50 dark:bg-orange-900/10 rounded-[2rem] p-8 border border-orange-100 dark:border-orange-800/30 space-y-4">
                <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400">
                  <Target size={24} />
                  <h3 className="text-xl font-bold">Interested in one of these?</h3>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Click a school below to instantly see its detailed admission requirements.</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedSchools.map((school, idx) => (
                    <button
                      key={idx}
                      onClick={() => getRequirements(school)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all flex items-center group ${selectedSchool === school ? 'bg-orange-600 border-orange-600 text-white shadow-lg' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-orange-500'}`}
                    >
                      {school}
                      <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* School Requirements Result (used by both Matcher and Standalone Tool) */}
            {requirementsResult && (
              <div className="bg-blue-600 text-white rounded-[2rem] p-8 shadow-xl animate-in slide-in-from-bottom-4">
                <div className="flex items-center space-x-2 mb-6">
                  <BookOpenCheck size={24} />
                  <h3 className="text-xl font-bold">{selectedSchool || inputText} Admissions Guide</h3>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl border border-white/20 whitespace-pre-wrap text-sm leading-relaxed max-h-[400px] overflow-y-auto custom-scrollbar">
                  {requirementsResult}
                </div>
                <p className="text-[10px] text-blue-200 mt-4 text-center">Data generated by Gemini AI. Verify with official university websites for the latest deadlines.</p>
              </div>
            )}
            
            {isLoading && selectedSchool && (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400 bg-white dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800">
                <Loader2 className="animate-spin mb-3 text-blue-500" size={32} />
                <p className="font-bold text-sm">Fetching deep dive for {selectedSchool}...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WritingTools;
