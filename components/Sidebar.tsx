import React from 'react';
import {
  Home,
  BookOpen,
  Calendar,
  Atom,
  FlaskConical,
  ScrollText,
  Moon,
  Sun,
  Wand2,
  ShieldCheck,
  LogOut,
  Microscope,
  Cpu,
  BookCopy,
  SearchCheck,
  ClipboardList,
  Menu,
  ChevronLeft
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

const Sidebar: React.FC<SidebarProps> = ({
  isPinned,
  setIsPinned,
  currentPage,
  onNavigate,
  theme,
  toggleTheme,
  onLogout
}) => {
  const isOpen = isPinned;

  const NavItem = ({
    icon: Icon,
    label,
    page,
    active
  }: {
    icon: any;
    label: string;
    page: Page;
    active: boolean;
  }) => (
    <button
      onClick={() => onNavigate(page)}
      className={`flex items-center w-full px-4 py-3 mb-1 rounded-lg text-sm font-medium transition-all
        ${
          active
            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
        }
        ${!isOpen && 'justify-center px-0'}
      `}
    >
      <Icon size={20} className={isOpen ? 'mr-3 shrink-0' : 'shrink-0'} />
      {isOpen && <span className="whitespace-nowrap">{label}</span>}
    </button>
  );

  return (
    <div
      className={`fixed top-0 left-0 h-full z-50 flex flex-col
        bg-white dark:bg-slate-900
        border-r border-slate-200 dark:border-slate-800
        shadow-2xl transition-all duration-300
        ${isOpen ? 'w-64' : 'w-20'}
      `}
    >
      {/* Header */}
      <div className="flex items-center px-4 border-b border-slate-100 dark:border-slate-800 h-16">
        {!isOpen ? (
          /* Collapsed: Hamburger centered */
          <button
            onClick={() => setIsPinned(true)}
            aria-label="Open sidebar"
            className="mx-auto"
          >
            <Menu size={26} className="text-slate-700 dark:text-slate-300" />
          </button>
        ) : (
          /* Expanded: PrepPath left, Arrow right */
          <>
            <button
              onClick={() => onNavigate(Page.HOME)}
              className="text-xl font-bold text-blue-600 dark:text-blue-500 hover:opacity-80 transition-opacity"
            >
              PrepPath
            </button>

            <button
              onClick={() => setIsPinned(false)}
              aria-label="Collapse sidebar"
              className="ml-auto"
            >
              <ChevronLeft size={26} className="text-slate-700 dark:text-slate-300" />
            </button>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-3">
        <NavItem icon={Home} label="Dashboard" page={Page.HOME} active={currentPage === Page.HOME} />

        {isOpen && <Section title="Curriculum" />}
        <NavItem icon={Atom} label="Physics" page={Page.PHYSICS} active={currentPage === Page.PHYSICS} />
        <NavItem icon={FlaskConical} label="Chemistry" page={Page.CHEMISTRY} active={currentPage === Page.CHEMISTRY} />
        <NavItem icon={Microscope} label="Biology" page={Page.BIOLOGY} active={currentPage === Page.BIOLOGY} />
        <NavItem icon={Cpu} label="Comp Science" page={Page.CS} active={currentPage === Page.CS} />
        <NavItem icon={BookCopy} label="Literature" page={Page.LIT} active={currentPage === Page.LIT} />
        <NavItem icon={ScrollText} label="History" page={Page.HISTORY} active={currentPage === Page.HISTORY} />

        {isOpen && <Section title="Prep Tools" />}
        <NavItem icon={ShieldCheck} label="Essay Feedback" page={Page.ESSAY_FEEDBACK} active={currentPage === Page.ESSAY_FEEDBACK} />
        <NavItem icon={Wand2} label="Essay Writer" page={Page.ESSAY_WRITER} active={currentPage === Page.ESSAY_WRITER} />
        <NavItem icon={BookOpen} label="Smart Review" page={Page.SMART_REVIEW} active={currentPage === Page.SMART_REVIEW} />
        <NavItem icon={SearchCheck} label="College Matcher" page={Page.COLLEGE_MATCHER} active={currentPage === Page.COLLEGE_MATCHER} />
        <NavItem icon={ClipboardList} label="Requirements" page={Page.COLLEGE_REQUIREMENTS} active={currentPage === Page.COLLEGE_REQUIREMENTS} />

        {isOpen && <Section title="Tracking" />}
        <NavItem icon={Calendar} label="Opportunities" page={Page.OPPORTUNITIES} active={currentPage === Page.OPPORTUNITIES} />
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <button
          onClick={toggleTheme}
          className={`flex items-center w-full px-4 py-2.5 rounded-lg text-sm font-medium
            text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800
            ${!isOpen && 'justify-center px-0'}
          `}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          {isOpen && <span className="ml-3">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
        </button>

        <button
          onClick={onLogout}
          className={`flex items-center w-full px-4 py-2.5 rounded-lg text-sm font-medium
            text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10
            ${!isOpen && 'justify-center px-0'}
          `}
        >
          <LogOut size={20} />
          {isOpen && <span className="ml-3">Sign Out</span>}
        </button>
      </div>
    </div>
  );
};

const Section = ({ title }: { title: string }) => (
  <div className="mt-6 mb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
    {title}
  </div>
);

export default Sidebar;
