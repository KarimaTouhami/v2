export interface Project {
  id: number;
  title: string;
  company: string;
  year: string;
  role: string;
  image: string;
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
    description: "Architected a high-performance financial dashboard handling real-time data for 10k+ active users. Implemented D3.js visualizations that reduced reporting time by 40% compared to the legacy system.",
    stack: ["React", "TypeScript", "Tailwind", "Redux Toolkit"],
    link: "https://www.fortuneconnect.africa/",
    github: "private",
    featured: true,
    status: 'completed'
  },
  {
    id: 2,
    title: "Shelf",
    company: "Personal Project",
    year: "2025",
    role: "Full Stack Developer",
    image: "/projects/shelf-app.webp",
    category: "Social Discovery Platform",
    description: "A visual discovery platform where users curate their digital universe through books, music, and movies. Built with a decoupled architecture (Next.js frontend + FastAPI) featuring a highly interactive 'bento-grid' UI and real-time social activity feeds.",
    stack: ["Next.js", "FastAPI", "Tailwind CSS", "Framer Motion", "Spotify API", "Google Books API", "TMDB API"],
    link: "https://shelf-app-v1.vercel.app/",
    github: "private",
    featured: true,
    status: 'ongoing'
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
    title: "The Tea is Gone",
    company: "ALX Africa",
    year: "2024",
    role: "Full Stack Developer",
    image: "/projects/the-tea-is-gone-home-page.webp",
    category: "Social Media App",
    description: "Full-stack social media app enabling users to share tea experiences. Implemented real-time chat and notifications using Appwrite.",
    stack: ["React", "Appwrite", "TypeScript", "Shadcn UI", "Tailwind CSS"],
    link: "https://the-tea-is-gone.vercel.app/",
    github: "https://github.com/KarimaTouhami/the-tea-is-gone",
    featured: false,
    status: 'completed'
  },
  {
    id: 6,
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
  }
];
