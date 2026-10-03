// data/projects.ts
export interface Project {
  id: string
  title: string
  titleFr: string
  description: string
  descriptionFr: string
  longDescription: string
  longDescriptionFr: string
  image: string
  tags: string[]
  links: {
    github?: string
    live?: string
    demo?: string
  }
  featured: boolean
  features: string[]
  featuresFr: string[]
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'ARVEA Business App',
    titleFr: 'Application Business ARVEA',
    description: 'A revolutionary tool for ARVEA partners to efficiently track and optimize business activity.',
    descriptionFr: "Un outil révolutionnaire pour les partenaires ARVEA afin de suivre et d'optimiser efficacement l'activité commerciale.",
    longDescription: 'Designed specifically for ARVEA partners, the ARVEA Business app provides an efficient and optimized way to track business activity. Featuring an innovative system of customizable alerts and notifications, it ensures users stay informed and reactive at all times. Manage your business at your fingertips and turn every opportunity into success.',
    longDescriptionFr: "Conçue spécifiquement pour les partenaires ARVEA, l'application ARVEA Business offre un moyen efficace et optimisé de suivre l'activité commerciale. Dotée d'un système innovant d'alertes et de notifications personnalisables, elle garantit que les utilisateurs restent informés et réactifs à tout moment. Gérez votre entreprise à portée de main et transformez chaque opportunité en succès.",
    image: '/images/project5.jpg',
    tags: ['React Native', 'Laravel', 'Firebase'],
    featured: true,
    features: [
      'Innovative customizable alerts & push notifications',
      'Efficient and optimized real-time business tracking',
      'Complete business management at your fingertips',
      'Proactive tools to turn every opportunity into success'
    ],
    featuresFr: [
      "Alertes et notifications push personnalisables innovantes",
      "Suivi commercial en temps réel efficace et optimisé",
      "Gestion complète de l'entreprise à portée de main",
      "Outils proactifs pour transformer chaque opportunité en succès"
    ],
    links: { 
      live: 'https://play.google.com/store/apps/details?id=com.prod.arvea' 
    }
  },
  {
    id: "2",
    title: "Application Mobile Pointiny",
    titleFr: "Application Mobile Pointiny",
    description: "Mobile application for automating invoice processing",
    descriptionFr: "Application mobile pour l'automatisation du traitement des factures",
    longDescription: "Complete development cycle using Agile methodology (Scrum/Kanban), from UI/UX design on Figma to multi-store deployment. Production error tracking via Sentry and CI/CD pipeline with Docker.",
    longDescriptionFr: "Cycle de développement complet utilisant la méthodologie Agile (Scrum/Kanban), de la conception UI/UX sur Figma au déploiement multi-plateformes. Suivi des erreurs en production via Sentry et pipeline CI/CD avec Docker.",
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
    featuresFr: [
      "Numérisation et traitement automatisé des factures",
      "Déploiement multi-plateformes (Play Store, App Store)",
      "Suivi des erreurs en production via Sentry",
      "Mises à jour automatisées via le pipeline CI/CD Docker"
    ],
    featured: true,
  },
  {
    id: "3",
    title: "Application Web Métier ARVEA",
    titleFr: "Application Web Métier ARVEA",
    description: "ARVEA internal business web application",
    descriptionFr: "Application web métier interne pour ARVEA",
    longDescription: "Internal business management for ARVEA. Fullstack solution with Laravel API, PostgreSQL database. Developed in an Agile environment with Jira and Bitbucket.",
    longDescriptionFr: "Gestion métier interne pour ARVEA. Solution Fullstack avec API Laravel, base de données PostgreSQL. Développée dans un environnement Agile avec Jira et Bitbucket.",
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
    featuresFr: [
      "Centralisation de la gestion des opérations internes",
      "Suivi des stocks et de la chaîne d'approvisionnement",
      "Tableaux de bord analytiques pour les KPI de vente",
      "Gestion des rôles et permissions des utilisateurs"
    ],
    featured: true,
  },
  {
    id: "4",
    title: "Application Web Backoffice Pointiny",
    titleFr: "Application Web Backoffice Pointiny",
    description: "Backoffice application for managing the Pointiny mobile app",
    descriptionFr: "Application backoffice pour la gestion de l'application mobile Pointiny",
    longDescription: "Invoice tracking, user management, and statistics dashboard.",
    longDescriptionFr: "Suivi des factures, gestion des utilisateurs et tableau de bord des statistiques.",
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
    featuresFr: [
      "Tableau de bord statistique des factures traitées",
      "Gestion et validation des comptes utilisateurs",
      "Supervision centralisée des données de l'application mobile",
      "Interface d'administration construite avec Filament"
    ],
    featured: true,
  },
  {
    id: "5",
    title: "Legal Management Platform Web App",
    titleFr: "Plateforme Web de Gestion Juridique",
    description: "Web platform for managing legal services for lawyers",
    descriptionFr: "Plateforme web de gestion des services juridiques pour avocats",
    longDescription: "Engineering end-of-studies project completed at Groupe Adaming. A comprehensive platform allowing law firms to manage their legal cases, clients, and appointments. Spring Boot / Angular architecture with SQL persistence and Firebase integration for notifications.",
    longDescriptionFr: "Projet de fin d'études d'ingénierie réalisé chez Groupe Adaming. Une plateforme complète permettant aux cabinets d'avocats de gérer leurs dossiers juridiques, clients et rendez-vous. Architecture Spring Boot / Angular avec persistance SQL et intégration Firebase pour les notifications.",
    image: "/images/project2.png",
    tags: ["Spring Boot", "Angular", "SQL", "Firebase", "Alfresco", "Git"],
    links: {},
    features: [
      'Centralized legal case & client management',
      'Appointment scheduling with integrated calendar',
      'Electronic document storage (Alfresco)',
      'Real-time notifications via Firebase'
    ],
    featuresFr: [
      "Gestion centralisée des dossiers juridiques et des clients",
      "Planification des rendez-vous avec calendrier intégré",
      "Stockage électronique de documents (Alfresco)",
      "Notifications en temps réel via Firebase"
    ],
    featured: false,
  },
  {
    id: "6",
    title: "Guest House Reservation Platform Web App",
    titleFr: "Plateforme Web de Réservation de Maisons d'Hôtes",
    description: "Online booking system for guest houses",
    descriptionFr: "Système de réservation en ligne pour maisons d'hôtes",
    longDescription: "Bachelor's end-of-studies project completed at Ozone-Dev. A web platform allowing travelers to search, book, and pay for nights in guest houses. Responsive interface developed with Symfony and Bootstrap, with full availability and reservation management in SQL database.",
    longDescriptionFr: "Projet de fin d'études de Licence réalisé chez Ozone-Dev. Une plateforme web permettant aux voyageurs de rechercher, réserver et payer des nuitées dans des maisons d'hôtes. Interface responsive développée avec Symfony et Bootstrap, avec une gestion complète des disponibilités et des réservations en base de données SQL.",
    image: "/images/project1.png",
    tags: ["Symfony", "Bootstrap", "SQL"],
    links: {},
    features: [
      'Real-time availability search',
      'Online booking & payment system',
      'Advanced filtering (price, amenities, location)',
      'Admin dashboard for property owners'
    ],
    featuresFr: [
      "Recherche de disponibilité en temps réel",
      "Système de réservation et de paiement en ligne",
      "Filtrage avancé (prix, équipements, emplacement)",
      "Tableau de bord d'administration pour les propriétaires"
    ],
    featured: false,
  },
]