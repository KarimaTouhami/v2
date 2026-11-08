export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: number;
  title: string;
  company: string;
  year: string;
  role: string;
  image: string;
  gallery?: ProjectImage[];
  diffImage?: string;
  diffImageAlt?: string;
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
    id: 2,
    title: "IMachines E-commerce App",
    company: "ItaliaMachines",
    year: "2023",
    role: "Full Stack Developer intern",
    image: "/projects/imachines-landing-page.webp",
    category: "Industrial Web App",
    description: "Built a custom industrial e-commerce platform. Designed the relational database and engineered a seamless checkout system that automated commercial quotation (devis) generation and synced directly with Odoo ERP.",
    stack: ["JavaScript", "PHP", "PostgreSQL", "Odoo ERP", "WordPress"],
    link: "https://italiamachines.com/",
    github: "private",
    featured: false,
    status: "completed"
  },
  {
    id: 7,
    title: "Artemis",
    company: "Personal Project",
    year: "2026",
    role: "Full Stack engineer",
    image: "/projects/artemis1.webp",
    diffImage: "/projects/artemis2.webp",
    diffImageAlt: "Artemis diff view",
    category: "Compiler Visualizer",
    description: "A real-time C-to-Assembly development environment. Bridges the gap between high-level logic and machine code by visualizing compiler behavior using Rust and the GCC backend.",
    stack: ["Rust", "GCC", "Ratatui"],
    link: "not-hosted",
    github: "https://github.com/KarimaTouhami/artemis",
    featured: true,
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
    stack: ["Next.js", "Supabase", "Shadcn UI", "Tailwind CSS"],
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
    github: "private",
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
    title: "Swan Archives",
    company: "Personal Project",
    year: "2026",
    role: "Full Stack Developer",
    image: "/projects/swan-archives.webp",
    imageAlt: "Swan Archives 3D journal configurator",
    gallery: [
      {
        src: "/projects/swan-archives.webp",
        alt: "Swan Archives 3D journal configurator with a live price estimate",
        caption: "The custom-order wizard: a procedural 3D preview, live pricing and an eight-step design flow.",
      },
      {
        src: "/projects/swan-landing.webp",
        alt: "Swan Archives landing page with handmade leather journals",
        caption: "A scroll-driven storefront for handmade leather journals from Morocco.",
      },
      {
        src: "/projects/swan-collection.webp",
        alt: "Swan Archives ready-made journal collection with live stock",
        caption: "The ready-made collection, with live stock and per-item availability.",
      },
    ],
    category: "3D E-commerce",
    description: "A live storefront for handmade leather journals, built end to end. Its centrepiece is a procedural 3D configurator - leather, charms, lace and embossing - that prices a custom journal in real time and exports a branded order PDF, backed by an admin dashboard, Neon Postgres and Cloudflare's edge.",
    stack: ["Next.js", "TypeScript", "Three.js", "Neon Postgres", "Cloudflare Workers"],
    link: "https://swanarchives.store",
    github: "private",
    featured: true,
    status: 'completed'
  }
];
