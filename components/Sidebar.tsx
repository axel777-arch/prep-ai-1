
import React, { useState } from 'react';
import { 
  Home, BookOpen, PenTool, Calendar, ChevronLeft, ChevronRight, 
  Binary, Atom, FlaskConical, ScrollText, Moon, Sun, Wand2, ShieldCheck, LogOut,
  Microscope, Cpu, BookCopy, SearchCheck, ClipboardList
} from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  isPinned: boolean;
  setIsPinned: (isPinned: boolean) => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isPinned, setIsPinned, currentPage, onNavigate, theme, toggleTheme, onLogout }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const isOpen = isPinned || isHovered;

  const NavItem = ({ icon: Icon, label, page, active }: { icon: any, label: string, page: Page, active: boolean }) => (
    <button
      onClick={() => onNavigate(page)}
      className={`flex items-center w-full px-4 py-3 mb-1 transition-all rounded-lg text-sm font-medium ${
        active 
          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
      } ${!isOpen && 'justify-center px-0'}`}
    >
      <Icon size={20} className={isOpen ? 'mr-3 shrink-0' : 'shrink-0'} />
      {isOpen && <span className="whitespace-nowrap overflow-hidden">{label}</span>}
    </button>
  );

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 left-0 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out z-50 flex flex-col shadow-2xl ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 h-16">
        {isOpen ? (
          <button 
            onClick={() => onNavigate(Page.HOME)}
            className="text-xl font-bold text-blue-600 dark:text-blue-500 animate-in fade-in duration-300 hover:opacity-80 transition-opacity"
          >
            PrepPath
          </button>
        ) : (
          <button 
            onClick={() => onNavigate(Page.HOME)}
            className="w-full flex justify-center group"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110">
              <Binary size={22} />
            </div>
          </button>
        )}
        {isOpen && (
          <button 
            onClick={() => setIsPinned(!isPinned)}
            className={`p-1.5 rounded-lg transition-colors ${isPinned ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}`}
          >
            {isPinned ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
        <NavItem icon={Home} label="Dashboard" page={Page.HOME} active={currentPage === Page.HOME} />
        
        <div className={`mt-6 mb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider ${!isOpen && 'opacity-0'}`}>
          Curriculum
        </div>
        <NavItem icon={Binary} label="Math" page={Page.MATH} active={currentPage === Page.MATH} />
        <NavItem icon={Atom} label="Physics" page={Page.PHYSICS} active={currentPage === Page.PHYSICS} />
        <NavItem icon={FlaskConical} label="Chemistry" page={Page.CHEMISTRY} active={currentPage === Page.CHEMISTRY} />
        <NavItem icon={Microscope} label="Biology" page={Page.BIOLOGY} active={currentPage === Page.BIOLOGY} />
        <NavItem icon={Cpu} label="Comp Science" page={Page.CS} active={currentPage === Page.CS} />
        <NavItem icon={BookCopy} label="Literature" page={Page.LIT} active={currentPage === Page.LIT} />
        <NavItem icon={ScrollText} label="History" page={Page.HISTORY} active={currentPage === Page.HISTORY} />

        <div className={`mt-6 mb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider ${!isOpen && 'opacity-0'}`}>
          Prep Tools
        </div>
        <NavItem icon={ShieldCheck} label="Essay Feedback" page={Page.ESSAY_FEEDBACK} active={currentPage === Page.ESSAY_FEEDBACK} />
        <NavItem icon={Wand2} label="Essay Writer" page={Page.ESSAY_WRITER} active={currentPage === Page.ESSAY_WRITER} />
        <NavItem icon={BookOpen} label="Smart Review" page={Page.SMART_REVIEW} active={currentPage === Page.SMART_REVIEW} />
        <NavItem icon={SearchCheck} label="College Matcher" page={Page.COLLEGE_MATCHER} active={currentPage === Page.COLLEGE_MATCHER} />
        <NavItem icon={ClipboardList} label="Requirements" page={Page.COLLEGE_REQUIREMENTS} active={currentPage === Page.COLLEGE_REQUIREMENTS} />

        <div className={`mt-6 mb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider ${!isOpen && 'opacity-0'}`}>
          Tracking
        </div>
        <NavItem icon={Calendar} label="Opportunities" page={Page.OPPORTUNITIES} active={currentPage === Page.OPPORTUNITIES} />
      </div>

      <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <button
          onClick={toggleTheme}
          className={`flex items-center w-full px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${!isOpen && 'justify-center px-0'}`}
        >
          {theme === 'light' ? <Moon size={20} className={isOpen ? 'mr-3' : ''} /> : <Sun size={20} className={isOpen ? 'mr-3' : ''} />}
          {isOpen && <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
        </button>
        
        <button
          onClick={onLogout}
          className={`flex items-center w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors ${!isOpen && 'justify-center px-0'}`}
        >
          <LogOut size={20} className={isOpen ? 'mr-3' : ''} />
          {isOpen && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
