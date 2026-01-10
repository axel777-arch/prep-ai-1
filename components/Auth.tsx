
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { Sparkles, Mail, Lock, User, ArrowRight, Github, Chrome, Loader2, Moon, Sun } from 'lucide-react';

interface AuthProps {
  onLogin: (user: UserProfile) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => 
    localStorage.getItem('theme') as 'light' | 'dark' || 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Directly log in without verification step
    setTimeout(() => {
      setIsProcessing(false);
      onLogin({ 
        name: isLogin ? (name || 'Student') : (name || 'New Student'), 
        email, 
        streak: 1, 
        quizzesCompleted: 0 
      });
    }, 800);
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      onLogin({ 
        name: 'Alex Johnson', 
        email: 'alex.j@gmail.com', 
        streak: 1, 
        quizzesCompleted: 0,
        avatarColor: 'bg-blue-600'
      });
      setIsGoogleLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors relative overflow-hidden">
      <button 
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 shadow-xl hover:scale-110 transition-all z-10"
      >
        {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
      </button>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl text-white mb-4 shadow-xl shadow-blue-500/30 transform rotate-3">
            <Sparkles size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">PrepPath</h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold">Secure AI Education Platform</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-2xl mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${isLogin ? 'bg-white dark:bg-slate-700 shadow-lg text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${!isLogin ? 'bg-white dark:bg-slate-700 shadow-lg text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Join Us
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="relative group">
              <User className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Student Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent rounded-2xl text-sm font-bold focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 dark:text-white outline-none transition-all"
                required={!isLogin}
              />
            </div>
            <div className="relative group">
              <Mail className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input 
                type="email" 
                placeholder="School Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent rounded-2xl text-sm font-bold focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 dark:text-white outline-none transition-all"
                required
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="Secure Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent rounded-2xl text-sm font-bold focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 dark:text-white outline-none transition-all"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black transition-all flex items-center justify-center group shadow-2xl shadow-blue-500/20 active:scale-[0.98] mt-6"
            >
              {isProcessing ? <Loader2 size={24} className="animate-spin" /> : (
                <>
                  {isLogin ? 'Enter Portal' : 'Create Account'}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full"></div>
              <span className="bg-white dark:bg-slate-900 px-4 text-[10px] text-slate-400 uppercase font-black absolute tracking-[0.2em]">Institutional Access</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="flex items-center justify-center border-2 border-slate-100 dark:border-slate-800 py-3.5 rounded-2xl text-sm font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50 shadow-sm"
              >
                {isGoogleLoading ? <Loader2 size={20} className="animate-spin" /> : <Chrome size={20} className="mr-2 text-blue-500" />}
                Google
              </button>
              <button className="flex items-center justify-center border-2 border-slate-100 dark:border-slate-800 py-3.5 rounded-2xl text-sm font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                <Github size={20} className="mr-2" />
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
