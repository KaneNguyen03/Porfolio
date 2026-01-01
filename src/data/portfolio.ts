
import { 
  buildingMaintenanceImage, 
  pokeLifeImage, 
  fptAcademyImage, 
  claritasImage, 
  proofnImage, 
  auzunoImage,
  everytalkImage,
  uobongImage,
  ipaLoginImage,
  ipaCompaniesImage
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
    objective: "Full-stack/Backend Engineer with ~2 years shipping Node.js and React applications. Currently delivering AP automation at Bizzi and targeting junior-to-middle roles where I can own API-first products, strengthen system design, and scale event-driven services on AWS."
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
      company: "Bizzi",
      period: "Nov 2025 - Present",
      position: "Software Engineer",
      responsibilities: [
        "Build AP automation features (invoice capture, approvals, payments) with Node.js/TypeScript services and React dashboards.",
        "Implemented role-based access control, audit logging, and secure document storage to satisfy enterprise compliance.",
        "Optimized asynchronous workflows using AWS SQS/Lambda, Redis caching, and database indexing to reduce latency and timeouts.",
        "Partnered with design and product to polish UX flows for onboarding, document status visibility, and batch exports."
      ]
    },
    {
      company: "Cigro",
      period: "Aug 2025 - Oct 2025",
      position: "Fresher Software Engineer",
      responsibilities: [
        "Integrated Sendbird API for real-time messaging and designed custom database schema for personalized chat data storage.",
        "Developed backend APIs and webhook handlers for message synchronization and user interactions on EveryTalk Project.",
        "Integrated Google/Apple In-App Purchase (IAP) and handled subscription webhooks for Uobong gamified engagement platform.",
        "Migrated internal events architecture from EventEmitter2 to AWS SQS + Lambda for improved scalability and reliability.",
        "Conducted comprehensive load testing using Autocannon and K6 with Grafana monitoring to ensure system performance under high traffic conditions."
      ]
    },
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
      period: "Dec 2022 - Nov 2023",
      position: "Fresher Software Engineer",
      responsibilities: [
        "Developed and maintained web applications using React.js and other related technologies.",
        "Collaborated with cross-functional teams, including designers, product managers, and other developers, to create high-quality products."
      ]
    },
    {
      company: "Axpara",
      period: "Sep 2022 - Nov 2022",
      position: "Internship Software Engineer",
      responsibilities: [
        "Participated in code reviews and provided constructive feedback to other developers.",
        "Gained hands-on experience in software development lifecycle and agile methodologies."
      ]
    }
  ],
  projects: [
  {
    name: "B-eInvoice – AP Automation for Enterprises",
    period: "Nov 2025 - Present",
    role: "Full-stack Engineer",
    technologies: ["Angular", "Fastify", "Node.js", "RBAC", "REST", "Moqui", "PostgreSQL"],
    responsibilities: [
      "Implemented role-based access control down to feature level for enterprise tenants and user groups.",
      "Migrated invoicing and approval APIs from legacy Moqui services to Fastify with improved validation and logging.",
      "Delivered customer-specific financial reports (Galaxy, GS25, and others) with parameterized exports and scheduling.",
      "Hardened auth/session flows and added audit trails to meet procurement compliance needs."
    ],
    liveDemo: "",
    github: "",
    image: ipaCompaniesImage
  },
  {
    name: "IPA Expense Ops – Cost Control & Reconciliation",
    period: "Nov 2025 - Present",
    role: "Frontend Engineer",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "React Query", "RBAC", "REST"],
    responsibilities: [
      "Built expense automation dashboards for finance teams with multi-role access and approval workflows.",
      "Implemented reconciliation screens and data grids with drill-downs to spot mismatches across vendors and ledgers.",
      "Hooked into cost ingestion APIs and surfaced real-time status with optimistic UI and background refetch.",
      "Partnered with product/design to ship responsive layouts and keyboard-friendly interactions for ops users."
    ],
    liveDemo: "https://ipa-uat.bizzi.vn/login",
    github: "",
    image: ipaLoginImage
  },
  {
    name: "EveryTalk - Real-time Communication Platform",
    period: "Aug 2025 - Oct 2025",
    role: "Backend Developer",
    technologies: ["Node.js", "TypeScript", "Sendbird API", "PostgreSQL", "Webhooks", "Autocannon", "K6", "Grafana"],
    responsibilities: [
      "Integrated Sendbird API for real-time messaging and designed custom database schema to store and personalize chat data.",
      "Developed backend APIs and webhook handlers for message synchronization and user interactions.",
      "Implemented comprehensive load testing using Autocannon and K6 with Grafana visualization to ensure system performance.",
      "Built scalable messaging infrastructure supporting multiple chat rooms and user management features.",
      "Designed database architecture for efficient message storage and retrieval with personalization capabilities."
    ],
    liveDemo: "",
    github: "",
    image: everytalkImage 
  },
  {
    name: "Uobong - Gamified User Engagement Platform",
    period: "Aug 2025 - Oct 2025",
    role: "Backend Developer",
    technologies: ["Node.js", "TypeScript", "Google IAP", "Apple IAP", "AWS SQS", "AWS Lambda", "EventEmitter", "Webhooks"],
    responsibilities: [
      "Integrated Google/Apple In-App Purchase (IAP) system for seamless subscription management and payment processing.",
      "Handled subscription webhooks to ensure reliable payment verification and user access control.",
      "Migrated internal event system from EventEmitter2 to AWS SQS + Lambda for improved scalability and reliability.",
      "Developed gamification features to enhance user engagement and retention through interactive elements.",
      "Implemented event-driven architecture to handle real-time user interactions and system notifications."
    ],
    liveDemo: "",
    github: "",
    image: uobongImage 
  },
  {
    name: "Building Maintenance and Crack Monitoring System",
    period: "Dec 2024 - Apr 2025",
    role: "Leader",
    technologies: ["TypeScript", "NestJS", "ViteJS", "React.js", "PostgreSQL", "Docker", "AWS EC2", "RabbitMQ", "gRPC", "Redis"],
    responsibilities: [
      "Led full-stack development including backend API development with NestJS and frontend interface with React.js.",
      "Managed team task distribution and coordinated development workflow between teammates.",
      "Integrated Ultralytics AI system on AWS Lambda functions for automated crack detection and analysis.",
      "Implemented gRPC-based authentication service for secure login and user management.",
      "Developed email notification system with OTP verification using Redis for session management.",
      "Set up microservices-based architecture for scalable system design.",
      "Deployed system using Docker on AWS EC2 for reliable cloud hosting."
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
    databases: ["PostgreSQL", "MySQL", "MongoDB"],
    devops: ["AWS", "EC2", "RDS", "SQS", "S3", "Docker", "RabbitMQ", "gRPC"],
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
