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
    featured: true
  },
  {
    id: 2,
    title: "IMachines IoT",
    company: "ItaliaMachines",
    year: "2023",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920",
    category: "Industrial Web App",
    description: "Developed an IoT monitoring solution processing 500+ sensor events per second. Built a WebSocket-based alert system that decreased machine downtime response speed by 25%.",
    stack: ["Flutter", "PostgreSQL", "Odoo ERP", "WordPress"],
    link: "#",
    featured: true
  },
  {
    id: 3,
    title: "The Tea is Gone",
    company: "ALX Africa",
    year: "2024",
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=1920",
    category: "E-Commerce",
    description: "Full-stack e-commerce platform with custom cart logic and Stripe integration. Achieved a 98% Lighthouse performance score through aggressive image optimization and code splitting.",
    stack: ["React", "Firebase", "Stripe API", "Express"],
    link: "#",
    featured: false
  },
  {
    id: 4,
    title: "DentalFlow",
    company: "Personal Project",
    year: "2025",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1920",
    category: "SaaS Prototype",
    description: "A patient management SaaS designed for modern dental clinics. Features automated appointment scheduling and HIPAA-compliant patient record visualization.",
    stack: ["Vue.js", "Laravel", "MySQL", "Tailwind"],
    link: "#",
    featured: false
  },
  {
    id: 5,
    title: "GitHub Compass",
    company: "Open Source",
    year: "2025",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1920",
    category: "DevTool",
    description: "An analytics tool for engineering managers to visualize repo activity. Uses GraphQL to fetch and aggregate commit data, visualizing team velocity trends.",
    stack: ["React", "GraphQL", "GitHub API", "Recharts"],
    link: "#",
    featured: false
  }
];
