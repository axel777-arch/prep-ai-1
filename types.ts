
export enum Page {
  HOME = 'home',
  MATH = 'math',
  PHYSICS = 'physics',
  CHEMISTRY = 'chemistry',
  HISTORY = 'history',
  BIOLOGY = 'biology',
  CS = 'computer-science',
  LIT = 'literature',
  ESSAY_FEEDBACK = 'essay-feedback',
  ESSAY_WRITER = 'essay-writer',
  SMART_REVIEW = 'smart-review',
  COLLEGE_MATCHER = 'college-matcher',
  COLLEGE_REQUIREMENTS = 'college-requirements',
  OPPORTUNITIES = 'opportunities',
  PROFILE = 'profile'
}

export interface UserProfile {
  name: string;
  email: string;
  grade?: string;
  major?: string;
  avatarColor?: string;
  streak: number;
  quizzesCompleted: number;
  lastActivityDate?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  category: string;
  deadline: string; // ISO format for countdown
  description: string;
  requirements: string[];
  link: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}
