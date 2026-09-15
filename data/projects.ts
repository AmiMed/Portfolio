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
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Application Mobile ARVEA Business",
    description: "Application mobile professionnelle ARVEA",
    longDescription: "Conception, développement itératif en Agile, résolution de problèmes en production, et déploiement sur les stores (Google Play, App Store Connect, Huawei AppGallery). Fonctionnalités métier complètes avec intégration backend Laravel.",
    image: "/images/project5.jpg",
    tags: ["React Native", "Expo", "Laravel", "PostgreSQL", "Firebase", "Docker", "Jest"],
    links: {
      live: "https://play.google.com/store/apps/details?id=com.prod.arvea",
    },
    featured: true,
  },
  {
    id: "2",
    title: "Application Mobile Pointiny",
    description: "Application mobile pour automatiser le traitement des factures",
    longDescription: "Cycle de développement complet en méthode Agile (Scrum/Kanban), de la conception UI/UX sur Figma au déploiement multi-stores. Suivi des erreurs en production via Sentry et pipeline CI/CD avec Docker.",
    image: "/images/project4.jpg",
    tags: ["React Native", "Expo", "Laravel", "PostgreSQL", "Firebase", "Docker", "Sentry"],
    links: {
      live: "https://play.google.com/store/apps/details?id=com.pointiny.app",
    },
    featured: true,
  },
  {
    id: "3",
    title: "Application Web Métier ARVEA",
    description: "Application web métier ARVEA",
    longDescription: "La gestion métier interne d'ARVEA. Solution fullstack avec API Laravel, base de données PostgreSQL. Développée en environnement Agile avec Jira et Bitbucket.",
    image: "/images/project3.png",
    tags: ["Laravel", "PostgreSQL", "Firebase", "Docker", "Jira", "Bitbucket"],
    links: {
      live: "https://tn.arvea-nature.com/fr",
    },
    featured: true,
  },

  {
    id: "4",
    title: "Application Web Backoffice Pointiny",
    description: "Application Backoffice pour la gestion de l'application mobile Pointiny",
    longDescription: "Suivi des factures, gestion des utilisateurs, dashboard statistiques.",
    image: "/images/project7.png",
    tags: ["Laravel", "Filament", "PostgreSQL", "Docker", "Jira", "Bitbucket"],
    links: {
      live: "https://pointiny.arvea-nature.net/admin/login",
    },
    featured: true,
  },
  {
    id: "5",
    title: "Application Web Plateforme de Gestion Juridique",
    description: "Plateforme web de gestion des services juridiques pour avocats",
    longDescription: "Projet de fin d'études d'ingénieur réalisé chez Groupe Adaming. Plateforme complète permettant aux cabinets d'avocats de gérer leurs dossiers juridiques, clients et rendez-vous. Architecture Spring Boot / Angular avec persistence SQL et intégration Firebase pour les notifications.",
    image: "/images/project2.png",
    tags: ["Spring Boot", "Angular", "SQL", "Firebase", "Alfresco", "Git"],
    links: {},
    featured: false,
  },
  {
    id: "6",
    title: "Application Web Plateforme de Réservation de Maisons d'Hôtes",
    description: "Système de réservation en ligne pour maisons d'hôtes",
    longDescription: "Projet de fin d'études de licence réalisé chez Ozone-Dev. Plateforme web permettant aux voyageurs de rechercher, réserver et payer des nuitées dans des maisons d'hôtes. Interface responsive développée avec Symfony et Bootstrap, avec gestion complète des disponibilités et réservations en base SQL.",
    image: "/images/project1.png",
    tags: ["Symfony", "Bootstrap", "SQL"],
    links: {},
    featured: false,
  },
]