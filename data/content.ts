import { Terminal, Layout, Wrench } from 'lucide-react';
import React from 'react';

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  period: string;
  description?: string;
}

export interface StackCategory {
  title: string;
  icon: React.ReactElement;
  skills: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    company: "Ein Consulting",
    role: "Full-Stack Developer",
    period: "Dec 2025 - Present",
    description: "Driving a full-stack migration from V2 to V3, replacing legacy PHP with Symfony V3 architecture. Focused on implementing modern technical solutions and a high-performance UI/UX redesign with 100% service continuity." 
  },
  {
    company: "FortuneTech",
    role: "Product Engineer",
    period: "2024 - Present",
    description: "Spearheading the development of FortuneConnect, a financial dashboard serving 2k+ users with real-time data visualization and insights."
  },
  {
    company: "SUPTEM",
    role: "Web Development Intern",
    period: "Sep 2024",
    description: "Collaborated with a team of 4 to redesign the university portal, ensuring WCAG 2.1 accessibility compliance."
  },
  {
    company: "Italia Machines",
    role: "Software Developer Intern",
    period: "Jul 2023",
    description: "Optimized SQL queries for the inventory database, reducing slow query logs by 60%."
  }
];

export const EDUCATION: Education[] = [
  {
    school: "SUPTEM",
    degree: "Bachelor's Degree",
    field: "Software and Decision-Making Engineering",
    period: "2021 - 2024",
    description: "Graduated with honors. Focused on full-stack development, algorithms, and software architecture patterns."
  },
  {
    school: "ALX Africa",
    degree: "Software Engineering Program",
    field: "Full-Stack Development",
    period: "2023 - 2024",
    description: "Intensive 12-month program covering modern web development, DevOps, and professional software engineering practices."
  }
];

export const STACK_CATEGORIES: StackCategory[] = [
  {
    title: "Core Languages",
    icon: React.createElement(Terminal, { size: 20 }),
    skills: ["JavaScript (ES6+)", "TypeScript", "Python", "PHP", "SQL"]
  },
  {
    title: "Frontend Ecosystem",
    icon: React.createElement(Layout, { size: 20 }),
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"]
  },
  {
    title: "Backend & Infrastructure",
    icon: React.createElement(Wrench, { size: 20 }),
    skills: ["Node.js", "PostgreSQL", "Symfony 7.4", "Docker", "Git/CI/CD", "WSL2/Zsh"]
  }
];
