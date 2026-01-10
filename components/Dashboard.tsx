
import React from 'react';
import { Page, UserProfile } from '../types';
import { BookOpen, Calendar, ChevronRight, PenTool, Sparkles, Flame, CheckCircle, GraduationCap } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  user: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, user }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Welcome back, <span className="text-blue-600 dark:text-blue-500">{user.name}</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            You're currently on a roll! Keep up the momentum to reach your college goals. 
            Master your subjects and prepare your applications with the power of AI.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate(Page.OPPORTUNITIES)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center shadow-lg shadow-blue-500/20"
            >
              Explore Opportunities <ChevronRight size={20} className="ml-1" />
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 dark:opacity-10 pointer-events-none hidden md:block">
          <Sparkles className="w-full h-full text-blue-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400">
            <Flame size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Streak</p>
            <p className="text-2xl font-black dark:text-white">{user.streak} Days</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quizzes Won</p>
            <p className="text-2xl font-black dark:text-white">{user.quizzesCompleted}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
            <GraduationCap size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Target Major</p>
            <p className="text-sm font-bold truncate max-w-[120px] dark:text-white">{user.major || 'Undecided'}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Sparkles size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rank</p>
            <p className="text-2xl font-black dark:text-white">{user.quizzesCompleted > 10 ? 'Elite' : 'Rookie'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
            <BookOpen size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">Guided Learning</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Master core subjects with interactive slides and AI-generated practice.</p>
          <button onClick={() => onNavigate(Page.MATH)} className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center hover:underline">
            Go to Subjects <ChevronRight size={16} />
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
            <PenTool size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">Writing Suite</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Transform rough ideas into polished essays with our AI feedback suite.</p>
          <button onClick={() => onNavigate(Page.ESSAY_WRITER)} className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold flex items-center hover:underline">
            Open Editor <ChevronRight size={16} />
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors group">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
            <Calendar size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">Opp Tracking</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Track summer camps, internships, and deadlines in real-time.</p>
          <button onClick={() => onNavigate(Page.OPPORTUNITIES)} className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center hover:underline">
            View Deadlines <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
