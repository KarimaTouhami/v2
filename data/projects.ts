export interface Project {
  id: number;
  title: string;
  company: string;
  year: string;
  role: string;
  image: string;
  imageAlt?: string;
  category: string;
  description: string;
  stack: string[];
  link: string;
  github: string;
  featured: boolean;
  status?: 'completed' | 'ongoing';
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "FortuneConnect",
    company: "FortuneTech SMC.",
    year: "2024-2025",
    role: "Lead Frontend Engineer",
    image: "/projects/fortuneconnect-admin-dashboard.webp",
    category: "Frontend Architecture",
    description: "Built and maintained multi-role dashboards in Next.js + Shadcn UI, improving load speed by ~30% through optimized components and API caching. Established frontend architecture and best practices for a team of 6 developers in an Agile environment.",
    stack: ["React", "TypeScript", "Tailwind", "Redux Toolkit"],
    link: "https://www.fortuneconnect.africa/",
    github: "private",
    featured: true,
    status: 'completed'
  },
  {
    id: 2,
    title: "IMachines E-commerce App",
    company: "ItaliaMachines",
    year: "2023",
    role: "Full Stack Developer intern",
    image: "/projects/imachines-landing-page.webp",
    category: "Industrial Web App",
    description: "Helped develop an e-commerce platform for industrial machinery, integrating Odoo ERP for seamless inventory and order management, enhancing user experience and operational efficiency.",
    stack: ["Flutter", "PostgreSQL", "Odoo ERP", "WordPress"],
    link: "https://italiamachines.com/",
    github: "private",
    featured: false,
    status: 'completed'
  },
  {
    id: 3,
    title: "Dantex",
    company: "Personal Project",
    year: "2025",
    role: "Front end Developer",
    image: "/projects/dantex-landing-page.webp",
    category: "Dental Clinic Website",
    description: "Built the landing page for a dental clinic management SaaS, focusing on responsive design and user experience to attract potential clients.",
    stack: ["Next.js", "Supabase", "Sahdcn UI", "Tailwind CSS"],
    link: "https://dentist-website-murex.vercel.app/",
    github: "https://github.com/KarimaTouhami/Dantex",
    featured: false,
    status: 'completed'
  },
  {
    id: 4,
    title: "The Tea is Gone",
    company: "ALX Africa",
    year: "2024",
    role: "Full Stack Developer",
    image: "/projects/the-tea-is-gone-home-page.webp",
    category: "Social Media App",
    description: "Full-stack social media app enabling users to share tea experiences. Implemented real-time notifications using Appwrite.",
    stack: ["React", "Appwrite", "TypeScript", "Shadcn UI", "Tailwind CSS"],
    link: "https://the-tea-is-gone.vercel.app/",
    github: "https://github.com/KarimaTouhami/the-tea-is-gone",
    featured: false,
    status: 'completed'
  },
  {
    id: 5,
    title: "GitHub Compass",
    company: "Open Source",
    year: "2025",
    role: "Full Stack Developer",
    image: "/projects/github-compass.webp",
    category: "DevTool",
    description: "A GitHub validator I built for recruiters to separate a developer's real contributions from tutorials \"noise\"",
    stack: ["Next.js", "GitHub API", "Tailwind CSS"],
    link: "https://github-compass.vercel.app/",
    github: "https://github.com/KarimaTouhami/github-compass",
    featured: true,
    status: 'completed'
  },
  {
    id: 6,
    title: "Send It To Pluto",
    company: "Personal Project",
    year: "2026",
    role: "Full Stack Developer",
    image: "/projects/send-to-pluto-app.webp",
    category: "Testing SMTP Server",
    description: "A tool to test SMTP servers by sending emails to a fake inbox, helping developers debug email functionality without spamming real inboxes.",
    stack: ["PHP Mailer", "SMTP", "HTML", "CSS"],
    link: "https://send-it-to-pluto.vercel.app/",
    github: "https://github.com/KarimaTouhami/send-it-to-pluto",
    featured: false,
    status: 'completed'
  }
];
