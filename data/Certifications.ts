// data/Certifications.ts
export type Certification = {
  id: string
  title: string
  titleFr: string
  provider: 'Scrum Study MK' | 'Anthropic' | 'DataCamp' | 'DisasterReady' | 'Simplilearn' | 'upGrad' | 'Udemy' | 'Dubai Future Foundation'
  tags: string[]
  issueDate?: string
  credentialUrl?: string
  certificateUrl?: string
  description: string
  descriptionFr: string
  icon?: string
}

export const certifications: Certification[] = [
  {
    id: 'ssm-scrum-fundamentals',
    title: 'Scrum Fundamentals Certified',
    titleFr: 'Certifié Scrum Fondamentaux',
    provider: 'Scrum Study MK',
    tags: ['Agile', 'Scrum', 'Project Management'],
    description: 'Foundational knowledge in Scrum framework and agile methodologies',
    descriptionFr: 'Connaissances fondamentales du framework Scrum et des méthodologies agiles',
    certificateUrl: '/images/sfc.jpg',
  },
  {
    id: 'ssm-six-sigma',
    title: 'Six Sigma Yellow Belt',
    titleFr: 'Six Sigma Ceinture Jaune',
    provider: 'Scrum Study MK',
    tags: ['Process Improvement', 'Six Sigma', 'Quality Management'],
    description: 'Certification in Six Sigma Yellow Belt for process optimization',
    descriptionFr: 'Certification Six Sigma Ceinture Jaune pour l\'optimisation des processus',
    certificateUrl: '/images/sstb.jpg',
  },
  {
    id: 'ssm-kanban',
    title: 'Kanban Essentials Certified',
    titleFr: 'Certifié Essentiels Kanban',
    provider: 'Scrum Study MK',
    tags: ['Agile', 'Kanban', 'Project Management'],
    description: 'Knowledge of Kanban principles and implementation',
    descriptionFr: 'Connaissance des principes Kanban et de leur mise en œuvre',
    certificateUrl: '/images/kec.jpg',
  },
  {
    id: 'ssm-devops',
    title: 'Scrum for Ops and DevOps Fundamentals',
    titleFr: 'Scrum pour Ops et DevOps Fondamentaux',
    provider: 'Scrum Study MK',
    tags: ['DevOps', 'Scrum', 'Operations'],
    description: 'Application of Scrum principles in DevOps environments',
    descriptionFr: 'Application des principes Scrum dans les environnements DevOps',
    certificateUrl: '/images/sfdc.jpg',
  },
  {
    id: 'anthropic-agent-skills',
    title: 'Introduction to Agent Skills',
    titleFr: 'Introduction aux Compétences des Agents',
    provider: 'Anthropic',
    tags: ['AI', 'Agents', 'Claude'],
    description: 'Comprehensive introduction to building agent skills with Claude',
    descriptionFr: 'Introduction complète à la création de compétences d\'agent avec Claude',
    certificateUrl: '/images/agent_skills.jpg',
  },
  {
    id: 'anthropic-ai-fluency',
    title: 'AI Fluency: Framework & Foundations',
    titleFr: 'Maîtrise de l\'IA : Framework et Fondations',
    provider: 'Anthropic',
    tags: ['AI', 'Machine Learning', 'Foundations'],
    description: 'Deep dive into AI frameworks and foundational concepts',
    descriptionFr: 'Plongée approfondie dans les frameworks d\'IA et les concepts fondamentaux',
    certificateUrl: '/images/ai_fluency.jpg',
  },
  {
    id: 'anthropic-mcp',
    title: 'Introduction to Model Context Protocol',
    titleFr: 'Introduction au Protocole de Contexte de Modèle',
    provider: 'Anthropic',
    tags: ['AI', 'Protocols', 'Claude'],
    description: 'Understanding and implementing Model Context Protocol',
    descriptionFr: 'Compréhension et implémentation du Protocole de Contexte de Modèle',
    certificateUrl: '/images/mcp.jpg',
  },
  {
    id: 'anthropic-claude-code',
    title: 'Claude Code in Action',
    titleFr: 'Claude Code en Action',
    provider: 'Anthropic',
    tags: ['AI', 'Code Generation', 'Claude'],
    description: 'Practical implementation of Claude for code generation and development',
    descriptionFr: 'Implémentation pratique de Claude pour la génération de code et le développement',
    certificateUrl: '/images/claude_code.jpg',
  },
  {
    id: 'datacamp-n8n',
    title: 'Intermediate Workflow Automation with n8n',
    titleFr: 'Automatisation de Flux de Travail Intermédiaire avec n8n',
    provider: 'DataCamp',
    tags: ['Automation', 'n8n', 'Workflows'],
    description: 'Advanced workflow automation techniques using n8n platform',
    descriptionFr: 'Techniques avancées d\'automatisation de flux de travail utilisant la plateforme n8n',
    certificateUrl: '/images/n8n.jpg',
  },
  {
    id: 'datacamp-llms',
    title: 'Large Language Models (LLMs) Concept',
    titleFr: 'Concept des Grands Modèles de Langage (LLMs)',
    provider: 'DataCamp',
    tags: ['AI', 'LLM', 'Machine Learning'],
    description: 'Comprehensive understanding of Large Language Models and their applications',
    descriptionFr: 'Compréhension globale des Grands Modèles de Langage et de leurs applications',
    certificateUrl: '/images/llms.jpg',
  },
  {
    id: 'datacamp-docker',
    title: 'Intermediate Docker',
    titleFr: 'Docker Intermédiaire',
    provider: 'DataCamp',
    tags: ['Docker', 'DevOps', 'Containerization'],
    description: 'Advanced Docker concepts and best practices',
    descriptionFr: 'Concepts Docker avancés et meilleures pratiques',
    certificateUrl: '/images/docker.jpg',
  },
  {
    id: 'datacamp-ai-agents',
    title: 'Introduction to AI Agents',
    titleFr: 'Introduction aux Agents IA',
    provider: 'DataCamp',
    tags: ['AI', 'Agents', 'Automation'],
    description: 'Fundamentals of building and deploying AI agents',
    descriptionFr: 'Fondamentaux de la création et du déploiement d\'agents IA',
    certificateUrl: '/images/ai_agents.jpg',
  },
  {
    id: 'datacamp-langchain',
    title: 'Developing LLM Applications with LangChain',
    titleFr: 'Développement d\'Applications LLM avec LangChain',
    provider: 'DataCamp',
    tags: ['LLM', 'LangChain', 'Python'],
    description: 'Building production-ready LLM applications with LangChain framework',
    descriptionFr: 'Création d\'applications LLM prêtes pour la production avec le framework LangChain',
    certificateUrl: '/images/langchain.jpg',
  },
  {
    id: 'disasterready-pm',
    title: 'Project Management Essentials Certificate',
    titleFr: 'Certificat Essentiels de Gestion de Projet',
    provider: 'DisasterReady',
    tags: ['Project Management', 'Planning', 'Leadership'],
    description: 'Essential project management skills and methodologies',
    descriptionFr: 'Compétences et méthodologies essentielles en gestion de projet',
    certificateUrl: '/images/project_management.jpg',
  },
  {
    id: 'simplilearn-aws',
    title: 'Introduction to AWS Solutions',
    titleFr: 'Introduction aux Solutions AWS',
    provider: 'Simplilearn',
    tags: ['AWS', 'Cloud', 'Infrastructure'],
    description: 'Fundamentals of AWS cloud solutions and services',
    descriptionFr: 'Fondamentaux des solutions et services cloud AWS',
    certificateUrl: '/ images/aws.jpg',
  },
  {
    id: 'simplilearn-gcp',
    title: 'Scaling with Google Cloud Operations',
    titleFr: 'Mise à l\'Échelle avec Google Cloud Operations',
    provider: 'Simplilearn',
    tags: ['Google Cloud', 'Cloud', 'DevOps'],
    description: 'Scaling applications and operations on Google Cloud Platform',
    descriptionFr: 'Mise à l\'échelle des applications et des opérations sur Google Cloud Platform',
    certificateUrl: '/images/gcp.jpg',
  },
  {
    id: 'dff-prompt-engineering',
    title: 'The One Million Prompters AI',
    titleFr: 'The One Million Prompters AI',
    provider: 'Dubai Future Foundation',
    tags: ['AI', 'Prompt Engineering', 'Generative AI'],
    description: 'Advanced prompt engineering techniques for AI applications',
    descriptionFr: 'Techniques avancées d\'ingénierie de prompt pour les applications IA',
    certificateUrl: '/images/prompt_engineering.jpg',
  },
  {
    id: 'upgrad-genai',
    title: 'Introduction to Generative AI',
    titleFr: 'Introduction à l\'IA Générative',
    provider: 'upGrad',
    tags: ['Generative AI', 'AI', 'Deep Learning'],
    description: 'Introduction to Generative AI models and applications',
    descriptionFr: 'Introduction aux modèles et applications d\'IA Générative',
    certificateUrl: '/images/generative_ai.jpg',
  },
  {
    id: 'udemy-kubernetes',
    title: 'Kubernetes for Developers',
    titleFr: 'Kubernetes pour les Développeurs',
    provider: 'Udemy',
    tags: ['Kubernetes', 'DevOps', 'Containerization'],
    description: 'Comprehensive guide to Kubernetes for development and deployment',
    descriptionFr: 'Guide complet de Kubernetes pour le développement et le déploiement',
    certificateUrl: '/images/kubernetes.jpg',
  },
  {
    id: 'udemy-langchain-ai-agents',
    title: 'Building AI Agents with LangChain and Microsoft Azure',
    titleFr: 'Création d\'Agents IA avec LangChain et Microsoft Azure',
    provider: 'Udemy',
    tags: ['AI', 'LangChain', 'Azure', 'Agents'],
    description: 'Building intelligent AI agents using LangChain and Microsoft Azure',
    descriptionFr: 'Création d\'agents IA intelligents utilisant LangChain et Microsoft Azure',
    certificateUrl: '/images/langchain_ai_agents.jpg',
  },
]

export function getAllCertificationTags(): string[] {
  const tagsSet = new Set<string>()
  certifications.forEach((cert) => {
    cert.tags.forEach((tag) => tagsSet.add(tag))
  })
  return Array.from(tagsSet).sort()
}

export function getAllProviders(): Certification['provider'][] {
  const providersSet = new Set<Certification['provider']>()
  certifications.forEach((cert) => {
    providersSet.add(cert.provider)
  })
  return Array.from(providersSet).sort() as Certification['provider'][]
}