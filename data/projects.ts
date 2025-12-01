export interface Project {
  id: number;
  title: string;
  company: string;
  year: string;
  image: string;
  category: string;
  description: string;
  stack: string[];
  link: string;
  github: string;
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "FortuneConnect",
    company: "FortuneTech SMC.",
    year: "2024-2025",
    image: "https://img.sanishtech.com/u/52a13283b838dc8d0f7c328672d58bf6.png",
    category: "Frontend Architecture",
    description: "Architected a high-performance financial dashboard handling real-time data for 10k+ active users. Implemented D3.js visualizations that reduced reporting time by 40% compared to the legacy system.",
    stack: ["React", "TypeScript", "Tailwind", "Redux Toolkit"],
    link: "https://www.fortuneconnect.africa/",
    github: "private",
    featured: true
  },
  {
    id: 2,
    title: "IMachines E-commerce App",
    company: "ItaliaMachines",
    year: "2023",
    image: "https://img.sanishtech.com/u/42bc846377d41386aa46610eb2b759c3.png",
    category: "Industrial Web App",
    description: "Developed an IoT monitoring solution processing 500+ sensor events per second. Built a WebSocket-based alert system that decreased machine downtime response speed by 25%.",
    stack: ["Flutter", "PostgreSQL", "Odoo ERP", "WordPress"],
    link: "https://italiamachines.com/",
    github: "private",
    featured: false
  },
  {
    id: 3,
    title: "The Tea is Gone",
    company: "ALX Africa",
    year: "2024",
    image: "https://img.sanishtech.com/u/cd9aebdf03a60e17e7d22a2920b02664.png",
    category: "Social Media App",
    description: "Full-stack social media app enabling users to share tea experiences. Implemented real-time chat and notifications using Appwrite.",
    stack: ["React", "Appwrite", "TypeScript", "Shadcn UI", "Tailwind CSS"],
    link: "https://the-tea-is-gone.vercel.app/",
    github: "https://github.com/KarimaTouhami/the-tea-is-gone",
    featured: false
  },
  {
    id: 4,
    title: "Dantex",
    company: "Personal Project",
    year: "2025",
    image: "https://img.sanishtech.com/u/c33a3111211764d6e0de2d29636706e1.png",
    category: "SaaS Prototype",
    description: "A patient management SaaS designed for modern dental clinics. Features automated appointment scheduling and HIPAA-compliant patient record visualization.",
    stack: ["Next.js", "Supabase", "Sahdcn UI", "Tailwind CSS"],
    link: "https://dentist-website-murex.vercel.app/",
    github: "https://github.com/KarimaTouhami/Dantex",
    featured: false
  },
  {
    id: 5,
    title: "GitHub Compass",
    company: "Open Source",
    year: "2025",
    image: "https://img.sanishtech.com/u/90f43b0c5d90b70290b7e0852a8edd32.png",
    category: "DevTool",
    description: "A GitHub validator I built for recruiters to separate a developer's real contributions from tutorials \"noise\"",
    stack: ["Next.js", "GitHub API", "Tailwind CSS"],
    link: "https://github-compass.vercel.app/",
    github: "https://github.com/KarimaTouhami/github-compass",
    featured: true
  }
];
