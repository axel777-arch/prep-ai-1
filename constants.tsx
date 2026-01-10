
import React from 'react';
import { Opportunity } from './types';

// Using future dates for countdown calculation
const now = new Date();
const addDays = (d: number) => new Date(now.getTime() + d * 24 * 60 * 60 * 1000).toISOString();

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'MIT Beaver Works Summer Institute',
    category: 'STEM Summer Camp',
    deadline: addDays(12),
    description: 'A world-class summer program for high school students in autonomous racing, cybersecurity, and more.',
    requirements: ['Rising Senior', 'B+ or higher in Math/Science', 'Recommendation Letter'],
    link: '#'
  },
  {
    id: '2',
    title: 'The Concord Review Essay Competition',
    category: 'History/Writing',
    deadline: addDays(45),
    description: 'The only quarterly journal in the world to publish the academic history papers of secondary school students.',
    requirements: ['Secondary school student', 'Original historical research', 'Under 10,000 words'],
    link: '#'
  },
  {
    id: '3',
    title: 'Google Computer Science Summer Institute (CSSI)',
    category: 'Computer Science',
    deadline: addDays(5),
    description: 'Three-week introduction to computer science for graduating high school seniors.',
    requirements: ['Graduating high school senior', 'Intent to major in CS or related field'],
    link: '#'
  },
  {
    id: '4',
    title: 'Regeneron Science Talent Search',
    category: 'Research',
    deadline: addDays(120),
    description: 'The nation’s oldest and most prestigious science and math competition for high school seniors.',
    requirements: ['High School Senior', 'Original Scientific Research'],
    link: '#'
  }
];

export const SUBJECT_METADATA = {
  math: {
    title: 'Mathematics',
    topics: ['Calculus BC', 'Linear Algebra', 'Statistics', 'Discrete Math'],
    description: 'Master the foundations of logic and quantification for college entrance exams and beyond.'
  },
  physics: {
    title: 'Physics',
    topics: ['Mechanics', 'Electromagnetism', 'Quantum Basics', 'Relativity'],
    description: 'Understand the fundamental laws governing the universe.'
  },
  chemistry: {
    title: 'Chemistry',
    topics: ['Organic Chemistry', 'Thermodynamics', 'Atomic Structure', 'Stoichiometry'],
    description: 'Explore the composition, structure, and properties of matter.'
  },
  history: {
    title: 'History',
    topics: ['World History', 'US History', 'Political Science', 'Economics'],
    description: 'Analyze the events that shaped our modern world.'
  },
  biology: {
    title: 'Biology',
    topics: ['Genetics', 'Cell Biology', 'Ecology', 'Evolutionary Theory'],
    description: 'Investigate the complex systems and processes that sustain life.'
  },
  'computer-science': {
    title: 'Computer Science',
    topics: ['Algorithms', 'Data Structures', 'Web Architecture', 'Machine Learning'],
    description: 'Build the technical expertise needed for the digital age.'
  },
  literature: {
    title: 'Literature',
    topics: ['Literary Analysis', 'Comparative Literature', 'Creative Writing', 'Rhetoric'],
    description: 'Develop critical thinking and communication through world-class texts.'
  }
};
