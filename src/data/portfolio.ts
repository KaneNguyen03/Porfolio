
import { 
  buildingMaintenanceImage, 
  pokeLifeImage, 
  fptAcademyImage, 
  claritasImage, 
  proofnImage, 
  auzunoImage 
} from '../assets/projectImages';

export interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  objective: string;
}

export interface Education {
  period: string;
  degree: string;
  institution: string;
  gpa?: string;
}

export interface WorkExperience {
  company: string;
  period: string;
  position: string;
  responsibilities: string[];
}

export interface Project {
  name: string;
  period: string;
  role: string;
  technologies: string[];
  responsibilities: string[];
  liveDemo?: string;
  github?: string;
  image?: string;
}

export interface Certification {
  name: string;
  date: string;
  url: string;
}

export interface Award {
  name: string;
  period: string;
}

export interface Reference {
  name: string;
  position: string;
  email: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  education: Education[];
  workExperience: WorkExperience[];
  projects: Project[];
  skills: {
    programmingLanguages: string[];
    frontend: string[];
    backend: string[];
    databases: string[];
    devops: string[];
    vcs: string[];
  };
  certifications: Certification[];
  awards: Award[];
  references: Reference[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Kha (Kane) Nguyen",
    title: "Software Engineer",
    phone: "0915421830",
    email: "nguyenxuankha5371@gmail.com",
    location: "Ho Chi Minh City, Viet Nam",
    github: "https://github.com/KaneNguyen03",
    linkedin: "https://www.linkedin.com/in/kha-nguyen-29732a209",
    objective: "I am seeking a Fresher/Junior Fullstack Developer position using Node.js and React.js, where I can apply my skills, contribute to team success, and grow in a professional environment. I have over 1 year of experience in Frontend development and hands-on knowledge of DevOps tools such as AWS EC2 and RDS."
  },
  education: [
    {
      period: "Sep 2021 - May 2025",
      degree: "Bachelor of Software Engineering",
      institution: "FPT University",
      gpa: "3.21/4"
    }
  ],
  workExperience: [
    {
      company: "FSoft",
      period: "Dec 2023 - Apr 2024",
      position: "Internship Frontend Developer",
      responsibilities: [
        "Designed and developed responsive UIs with React.",
        "Optimized frontend codebase for reusability and maintainability.",
        "Used React Query for API data fetching, caching, and sync."
      ]
    },
    {
      company: "Axpara",
      period: "Sep 2022 - Nov 2023",
      position: "Internship Frontend Developer",
      responsibilities: [
        "Developed and maintained web apps with React.js.",
        "Participated in code reviews and gave feedback.",
        "Collaborated with cross-functional teams."
      ]
    }
  ],
  projects: [
  {
    name: "Building Maintenance and Crack Monitoring System",
    period: "Dec 2024 - Apr 2025",
    role: "Leader",
    technologies: ["TypeScript", "NestJS", "ViteJS", "React.js", "PostgreSQL", "Docker", "AWS EC2", "RabbitMQ", "gRPC", "Redis"],
    responsibilities: [
      "Set up microservices-based architecture for scalable system design.",
      "Deployed system using Docker on AWS EC2 for reliable cloud hosting.",
      "Configured RabbitMQ, gRPC, Redis, and email services to enable efficient communication and notifications."
    ],
    liveDemo: "",
    github: "https://github.com/SP25-BMCMS/BMCMS-FE",
    image: buildingMaintenanceImage
  },
  {
    name: "Poke Life Food Management",
    period: "Aug 2024 - Nov 2024",
    role: "Leader",
    technologies: ["TypeScript", "NestJS", "ViteJS", "React.js", "PostgreSQL", "MongoDB", "WebSocket"],
    responsibilities: [
      "Developed admin dashboards for managing food items, orders, and real-time chat with customers.",
      "Implemented WebSocket-based real-time messaging between customers and admin.",
      "Built checkout and payment workflows with transaction handling for secure processing.",
      "Integrated Prisma ORM with PostgreSQL and implemented access control guards for security."
    ],
    liveDemo: "https://poke-life-fe.vercel.app/",
    github: "https://github.com/KaneNguyen03/poke-life-fe",
    image: pokeLifeImage
  },
  {
    name: "FPT Fresher Academy Training Management",
    period: "Dec 2023 - Apr 2024",
    role: "Member",
    technologies: ["TypeScript", "ViteJS", "React.js", "React Query", "Redux Toolkit", "Antd", "Zod"],
    responsibilities: [
      "Implemented JWT authentication to secure access to the system.",
      "Refactored and improved reusable UI components for consistency.",
      "Organized folder structure to enhance project maintainability.",
      "Integrated React Query for optimized data fetching and state management.",
      "Developed search and pagination features to improve user experience."
    ],
    liveDemo: "",
    github: "",
    image: fptAcademyImage
  },
  {
    name: "Claritas - Document Verification Platform",
    period: "Feb 2023 - Nov 2023",
    role: "Frontend Developer",
    technologies: ["JavaScript", "React.js", "Tailwind CSS", "Redux", "Axios", "React Router", "Material-UI", "JWT"],
    responsibilities: [
      "Developed secure user authentication system with JWT tokens for login, registration, and account management.",
      "Implemented comprehensive image upload functionality with drag-and-drop interface and file validation.",
      "Built advanced document annotation tools allowing users to mark, highlight, and add comments to uploaded images.",
      "Created real-time document verification workflow with status tracking and approval processes.",
      "Designed responsive user interface using Tailwind CSS ensuring cross-device compatibility.",
      "Integrated REST APIs for seamless communication between frontend and backend services.",
      "Implemented state management using Redux for efficient data flow and user session handling.",
      "Developed user dashboard displaying document history, verification status, and analytics.",
      "Added form validation and error handling to enhance user experience and data integrity.",
      "Collaborated with backend team to define API specifications and data structures."
    ],
    liveDemo: "https://www.youtube.com/watch?v=FPTkbZdhi-o&list=TLGGywTU4zSGroUxMTA4MjAyNQ&t=77s",
    github: "",
    image: claritasImage
  },
  {
    name: "Proofn",
    period: "Jan 2023 - Feb 2023",
    role: "Leader",
    technologies: ["JavaScript", "Next.js", "Sanity"],
    responsibilities: [
      "Built dynamic content display integrated with Sanity CMS.",
      "Implemented QR code-based linking for fast access to specific content.",
      "Customized Sanity CMS backend for tailored content management."
    ],
    liveDemo: "",
    github: "",
    image: proofnImage
  },
  {
    name: "Auzuno",
    period: "Oct 2022 - Dec 2022",
    role: "Member",
    technologies: ["JavaScript", "React", "Styled-components"],
    responsibilities: [
      "Developed customizable UI components to meet customer requirements.",
      "Implemented real-time chat functionality for live communication.",
      "Built admin panel for user management and monitoring."
    ],
    liveDemo: "",
    github: "",
    image: auzunoImage
  }
],
  skills: {
    programmingLanguages: ["JavaScript", "TypeScript", "C#", "Java"],
    frontend: ["React.js", "Next.js", "Vite"],
    backend: ["Node.js", "ASP.NET Core", "NestJS"],
    databases: ["PostgreSQL", "MySQL", "MongoDB", "MSSQL"],
    devops: ["AWS", "EC2", "RDS", "S3", "Docker", "RabbitMQ", "gRPC"],
    vcs: ["Git", "GitHub", "GitLab"]
  },
  certifications: [
    {
      name: "User Experience Research and Design",
      date: "Sep 2024",
      url: "https://coursera.org/share/6d0c6bd149e94707df0407a5efbb75d5"
    },
    {
      name: "Project Management Principles and Practices",
      date: "May 2024",
      url: "https://coursera.org/share/0569f6dd8e5edcee9d4ee627e411866e"
    },
    {
      name: "CertNexus Certified Ethical Emerging Technologist",
      date: "Sep 2023",
      url: "https://coursera.org/share/be98f1d62eb107c4f865ad339d4757aa"
    },
    {
      name: "Software Development Lifecycle",
      date: "Jun 2023",
      url: "https://coursera.org/share/2bcebdac591eeb044059ce7e7334477d"
    },
    {
      name: "Web Design for Everybody",
      date: "Feb 2023",
      url: "https://coursera.org/share/5134b435a3c299a729ae377175ae38b8"
    },
    {
      name: "Computer Communications",
      date: "Sep 2022",
      url: "https://coursera.org/share/a5791332f1ba375c300b68485b0fbc49"
    }
  ],
  awards: [
    {
      name: "Honorable Student",
      period: "Fall 2024"
    },
    {
      name: "Honorable Student",
      period: "Summer 2024"
    },
    {
      name: "Honorable Student",
      period: "Summer 2022"
    },
    {
      name: "Third place — Science Technology, Lam Dong Province",
      period: "Summer 2020"
    }
  ],
  references: [
    {
      name: "Tony Thai",
      position: "Senior Software Engineer",
      email: "trungthaihieu93.dedrdo@gmail.com"
    },
    {
      name: "Michel Than",
      position: "Project Manager",
      email: "michel@axpara.com"
    }
  ]
};
