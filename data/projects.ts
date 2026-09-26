export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  links: {
    github?: string
    live?: string
    demo?: string
  }
  featured: boolean
    features:string []

}
export const projects: Project[] = [
  {
    id: '1',
    title: 'ARVEA Business App',
    description: 'A revolutionary tool for ARVEA partners to efficiently track and optimize business activity.',
    longDescription: 'Designed specifically for ARVEA partners, the ARVEA Business app provides an efficient and optimized way to track business activity. Featuring an innovative system of customizable alerts and notifications, it ensures users stay informed and reactive at all times. Manage your business at your fingertips and turn every opportunity into success.',
    image: '/images/project1.png',
    tags: ['React Native', 'Laravel', 'Firebase'],
    featured: true,
    features: [
      'Innovative customizable alerts & push notifications',
      'Efficient and optimized real-time business tracking',
      'Complete business management at your fingertips',
      'Proactive tools to turn every opportunity into success'
    ],
    links: { 
      live: 'https://play.google.com/store/apps/details?id=com.prod.arvea' 
    }
  },
  {
    id: "2",
    title: "Application Mobile Pointiny",
    description: "Mobile application for automating invoice processing",
    longDescription: "Complete development cycle using Agile methodology (Scrum/Kanban), from UI/UX design on Figma to multi-store deployment. Production error tracking via Sentry and CI/CD pipeline with Docker.",
    image: "/images/project4.jpg",
    tags: ["React Native", "Expo", "Laravel", "PostgreSQL", "Firebase", "Docker", "Sentry"],
    links: {
      live: "https://play.google.com/store/apps/details?id=com.pointiny.app",
    },
    features: [
      'Automated invoice scanning and processing',
      'Multi-platform deployment (Play Store, App Store)',
      'Production error tracking via Sentry',
      'Automated updates via Docker CI/CD pipeline'
    ],
    featured: true,
  },
  {
    id: "3",
    title: "Application Web Métier ARVEA",
    description: "ARVEA internal business web application",
    longDescription: "Internal business management for ARVEA. Fullstack solution with Laravel API, PostgreSQL database. Developed in an Agile environment with Jira and Bitbucket.",
    image: "/images/project3.png",
    tags: ["Laravel", "PostgreSQL", "Firebase", "Docker", "Jira", "Bitbucket"],
    links: {
      live: "https://tn.arvea-nature.com/fr",
    },
    features: [
      'Centralized internal business operations management',
      'Stock & supply chain tracking',
      'Analytical dashboards for sales KPIs',
      'User role & permission assignment'
    ],
    featured: true,
  },
  {
    id: "4",
    title: "Application Web Backoffice Pointiny",
    description: "Backoffice application for managing the Pointiny mobile app",
    longDescription: "Invoice tracking, user management, and statistics dashboard.",
    image: "/images/project7.png",
    tags: ["Laravel", "Filament", "PostgreSQL", "Docker", "Jira", "Bitbucket"],
    links: {
      live: "https://pointiny.arvea-nature.net/admin/login",
    },
    features: [
      'Statistical dashboard for processed invoices',
      'User account management & validation',
      'Centralized supervision of mobile app data',
      'Admin interface built with Filament'
    ],
    featured: true,
  },
  {
    id: "5",
    title: "Legal Management Platform Web App",
    description: "Web platform for managing legal services for lawyers",
    longDescription: "Engineering end-of-studies project completed at Groupe Adaming. A comprehensive platform allowing law firms to manage their legal cases, clients, and appointments. Spring Boot / Angular architecture with SQL persistence and Firebase integration for notifications.",
    image: "/images/project2.png",
    tags: ["Spring Boot", "Angular", "SQL", "Firebase", "Alfresco", "Git"],
    links: {},
    features: [
      'Centralized legal case & client management',
      'Appointment scheduling with integrated calendar',
      'Electronic document storage (Alfresco)',
      'Real-time notifications via Firebase'
    ],
    featured: false,
  },
  {
    id: "6",
    title: "Guest House Reservation Platform Web App",
    description: "Online booking system for guest houses",
    longDescription: "Bachelor's end-of-studies project completed at Ozone-Dev. A web platform allowing travelers to search, book, and pay for nights in guest houses. Responsive interface developed with Symfony and Bootstrap, with full availability and reservation management in SQL database.",
    image: "/images/project1.png",
    tags: ["Symfony", "Bootstrap", "SQL"],
    links: {},
    features: [
      'Real-time availability search',
      'Online booking & payment system',
      'Advanced filtering (price, amenities, location)',
      'Admin dashboard for property owners'
    ],
    featured: false,
  },
]