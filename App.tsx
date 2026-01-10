
import React, { useState, useEffect } from 'react';
import { Page, UserProfile } from './types';
import Sidebar from './components/Sidebar';
import Chatbot from './components/Chatbot';
import Dashboard from './components/Dashboard';
import SubjectContent from './components/SubjectContent';
import WritingTools from './components/WritingTools';
import Opportunities from './components/Opportunities';
import Auth from './components/Auth';
import Profile from './components/Profile';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('user_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Basic streak logic on load
      const last = parsed.lastActivityDate ? new Date(parsed.lastActivityDate) : null;
      const today = new Date();
      if (last) {
        const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 3600 * 24));
        if (diffDays > 1) {
          parsed.streak = 0; // Streak broken
        }
      }
      return parsed;
    }
    return null;
  });
  
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user_profile', JSON.stringify(user));
    } else {
      localStorage.removeItem('user_profile');
    }
  }, [user]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleUpdateProfile = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  const handleQuizComplete = () => {
    if (!user) return;
    const today = new Date();
    const lastDate = user.lastActivityDate ? new Date(user.lastActivityDate) : null;
    let newStreak = user.streak;

    if (!lastDate) {
      newStreak = 1;
    } else {
      const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
    }

    setUser({
      ...user,
      quizzesCompleted: user.quizzesCompleted + 1,
      streak: newStreak,
      lastActivityDate: today.toISOString()
    });
  };

  const renderContent = () => {
    if (!user) return null;
    switch (currentPage) {
      case Page.HOME:
        return <Dashboard onNavigate={setCurrentPage} user={user} />;
      case Page.MATH:
      case Page.PHYSICS:
      case Page.CHEMISTRY:
      case Page.HISTORY:
      case Page.BIOLOGY:
      case Page.CS:
      case Page.LIT:
        return <SubjectContent type={currentPage} onQuizComplete={handleQuizComplete} />;
      case Page.ESSAY_FEEDBACK:
      case Page.ESSAY_WRITER:
      case Page.SMART_REVIEW:
      case Page.COLLEGE_MATCHER:
      case Page.COLLEGE_REQUIREMENTS:
        return <WritingTools tool={currentPage} />;
      case Page.OPPORTUNITIES:
        return <Opportunities />;
      case Page.PROFILE:
        return <Profile user={user} onUpdate={handleUpdateProfile} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} user={user} />;
    }
  };

  if (!user) {
    return <Auth onLogin={(u) => setUser({ ...u, streak: 0, quizzesCompleted: 0 })} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      <Sidebar 
        isPinned={sidebarPinned} 
        setIsPinned={setSidebarPinned} 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        theme={theme}
        toggleTheme={toggleTheme}
        onLogout={() => setUser(null)}
      />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarPinned ? 'ml-64' : 'ml-20'}`}>
        <div className="max-w-6xl mx-auto p-4 md:p-12">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div className="hidden md:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Student Command Center</p>
              <h2 className="text-xl font-bold dark:text-white">PrepPath Portal</h2>
            </div>
            
            <button 
              onClick={() => setCurrentPage(Page.PROFILE)}
              className="flex items-center space-x-3 group bg-white dark:bg-slate-900 p-2 pr-4 md:pr-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all shadow-sm"
            >
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                {user.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold dark:text-white">{user.name}</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
                  {user.grade || 'Edit Profile'}
                </p>
              </div>
            </button>
          </div>
          {renderContent()}
        </div>
      </main>

      <Chatbot />
    </div>
  );
};

export default App;
