import { Terminal, Layout, Wrench } from 'lucide-react';
import React from 'react';

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  logo: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
}

export interface ApproachStep {
  title: string;
  desc: string;
}

export interface StackCategory {
  title: string;
  icon: React.ReactElement;
  skills: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    company: "FortuneTech",
    role: "Frontend Developer",
    period: "2024 - Present",
    description: "Spearheading the migration of the client portal to Next.js, resulting in a 3x improvement in SEO and load times.",
    logo: "FT"
  },
  {
    company: "SUPTEM",
    role: "Web Development Intern",
    period: "Sep 2024",
    description: "Collaborated with a team of 4 to redesign the university portal, ensuring WCAG 2.1 accessibility compliance.",
    logo: "S"
  },
  {
    company: "Italia Machines",
    role: "Software Developer Intern",
    period: "Jul 2023",
    description: "Optimized SQL queries for the inventory database, reducing slow query logs by 60%.",
    logo: "IM"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "Karima has an exceptional ability to translate complex requirements into clean, maintainable code. Her work on the dashboard UI was flawless.",
    author: "Sarah J.",
    role: "Senior PM @ FortuneTech"
  },
  {
    text: "One of the most dedicated engineers I've mentored. She doesn't just write code; she thinks about the product and the user.",
    author: "Ahmed B.",
    role: "Tech Lead @ ALX"
  }
];

export const APPROACH_STEPS: ApproachStep[] = [
  { title: "User-Centric", desc: "I start by understanding the 'why' behind the feature." },
  { title: "Scalable Architecture", desc: "Code is written to be read and maintained by humans." },
  { title: "Performance First", desc: "60fps interactions and <1s load times are my standard." },
];

export const STACK_CATEGORIES: StackCategory[] = [
  {
    title: "Core Languages",
    icon: React.createElement(Terminal, { size: 20 }),
    skills: ["JavaScript (ES6+)", "TypeScript", "Python", "HTML5/CSS3", "SQL"]
  },
  {
    title: "Frontend Ecosystem",
    icon: React.createElement(Layout, { size: 20 }),
    skills: ["React", "Next.js", "Vue.js", "Tailwind CSS", "Redux", "Framer Motion"]
  },
  {
    title: "Backend & DevOps",
    icon: React.createElement(Wrench, { size: 20 }),
    skills: ["Node.js", "PostgreSQL", "Firebase", "Docker", "Git/CI/CD", "Jest"]
  }
];
