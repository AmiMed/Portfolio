export type Certification = {
  id: string
  title: string
  provider: 'Scrum Study MK' | 'Anthropic' | 'DataCamp' | 'DisasterReady' | 'Simplilearn' | 'upGrad' | 'Udemy' | 'Dubai Future Foundation'
  tags: string[]
  issueDate?: string
  credentialUrl?: string
  certificateUrl?: string
  description: string
  icon?: string
}

export const certifications: Certification[] = [
  // Scrum Study MK
  {
    id: 'ssm-scrum-fundamentals',
    title: 'Scrum Fundamentals Certified',
    provider: 'Scrum Study MK',
    tags: ['Agile', 'Scrum', 'Project Management'],
    description: 'Foundational knowledge in Scrum framework and agile methodologies',
    certificateUrl: '/images/sfc.jpg',
  },
  {
    id: 'ssm-six-sigma',
    title: 'Six Sigma Yellow Belt',
    provider: 'Scrum Study MK',
    tags: ['Process Improvement', 'Six Sigma', 'Quality Management'],
    description: 'Certification in Six Sigma Yellow Belt for process optimization',
    certificateUrl: '/images/sstb.jpg',
  },
  {
    id: 'ssm-kanban',
    title: 'Kanban Essentials Certified',
    provider: 'Scrum Study MK',
    tags: ['Agile', 'Kanban', 'Project Management'],
    description: 'Knowledge of Kanban principles and implementation',
    certificateUrl: '/images/kec.jpg',
  },
  {
    id: 'ssm-devops',
    title: 'Scrum for Ops and DevOps Fundamentals',
    provider: 'Scrum Study MK',
    tags: ['DevOps', 'Scrum', 'Operations'],
    description: 'Application of Scrum principles in DevOps environments',
    certificateUrl: '/images/sfdc.jpg',
  },

  // Anthropic
  {
    id: 'anthropic-agent-skills',
    title: 'Introduction to Agent Skills',
    provider: 'Anthropic',
    tags: ['AI', 'Agents', 'Claude'],
    description: 'Comprehensive introduction to building agent skills with Claude',
    certificateUrl: '/images/agent_skills.jpg',
  },
  {
    id: 'anthropic-ai-fluency',
    title: 'AI Fluency: Framework & Foundations',
    provider: 'Anthropic',
    tags: ['AI', 'Machine Learning', 'Foundations'],
    description: 'Deep dive into AI frameworks and foundational concepts',
    certificateUrl: '/images/ai_fluency.jpg',
  },
  {
    id: 'anthropic-mcp',
    title: 'Introduction to Model Context Protocol',
    provider: 'Anthropic',
    tags: ['AI', 'Protocols', 'Claude'],
    description: 'Understanding and implementing Model Context Protocol',
    certificateUrl: '/images/mcp.jpg',
  },
  {
    id: 'anthropic-claude-code',
    title: 'Claude Code in Action',
    provider: 'Anthropic',
    tags: ['AI', 'Code Generation', 'Claude'],
    description: 'Practical implementation of Claude for code generation and development',
    certificateUrl: '/images/claude_code.jpg',
  },

  // DataCamp
  {
    id: 'datacamp-n8n',
    title: 'Intermediate Workflow Automation with n8n',
    provider: 'DataCamp',
    tags: ['Automation', 'n8n', 'Workflows'],
    description: 'Advanced workflow automation techniques using n8n platform',
    certificateUrl: '/images/n8n.jpg',
  },
  {
    id: 'datacamp-llms',
    title: 'Large Language Models (LLMs) Concept',
    provider: 'DataCamp',
    tags: ['AI', 'LLM', 'Machine Learning'],
    description: 'Comprehensive understanding of Large Language Models and their applications',
    certificateUrl: '/images/llms.jpg',
  },
  {
    id: 'datacamp-docker',
    title: 'Intermediate Docker',
    provider: 'DataCamp',
    tags: ['Docker', 'DevOps', 'Containerization'],
    description: 'Advanced Docker concepts and best practices',
    certificateUrl: '/images/docker.jpg',
  },
  {
    id: 'datacamp-ai-agents',
    title: 'Introduction to AI Agents',
    provider: 'DataCamp',
    tags: ['AI', 'Agents', 'Automation'],
    description: 'Fundamentals of building and deploying AI agents',
    certificateUrl: '/images/ai_agents.jpg',
  },
  {
    id: 'datacamp-langchain',
    title: 'Developing LLM Applications with LangChain',
    provider: 'DataCamp',
    tags: ['LLM', 'LangChain', 'Python'],
    description: 'Building production-ready LLM applications with LangChain framework',
    certificateUrl: '/images/langchain.jpg',
  },

  // DisasterReady
  {
    id: 'disasterready-pm',
    title: 'Project Management Essentials Certificate',
    provider: 'DisasterReady',
    tags: ['Project Management', 'Planning', 'Leadership'],
    description: 'Essential project management skills and methodologies',
    certificateUrl: '/images/project_management.jpg',
  },

  // Simplilearn
  {
    id: 'simplilearn-aws',
    title: 'Introduction to AWS Solutions',
    provider: 'Simplilearn',
    tags: ['AWS', 'Cloud', 'Infrastructure'],
    description: 'Fundamentals of AWS cloud solutions and services',
    certificateUrl: '/ images/aws.jpg',
  },
  {
    id: 'simplilearn-gcp',
    title: 'Scaling with Google Cloud Operations',
    provider: 'Simplilearn',
    tags: ['Google Cloud', 'Cloud', 'DevOps'],
    description: 'Scaling applications and operations on Google Cloud Platform',
    certificateUrl: '/images/gcp.jpg',
  },

  // Dubai Future Foundation
  {
    id: 'dff-prompt-engineering',
    title: 'The One Million Prompters AI',
    provider: 'Dubai Future Foundation',
    tags: ['AI', 'Prompt Engineering', 'Generative AI'],
    description: 'Advanced prompt engineering techniques for AI applications',
    certificateUrl: '/images/prompt_engineering.jpg',
  },

  // upGrad
  {
    id: 'upgrad-genai',
    title: 'Introduction to Generative AI',
    provider: 'upGrad',
    tags: ['Generative AI', 'AI', 'Deep Learning'],
    description: 'Introduction to Generative AI models and applications',
    certificateUrl: '/images/generative_ai.jpg',
  },

  // Udemy
  {
    id: 'udemy-kubernetes',
    title: 'Kubernetes for Developers',
    provider: 'Udemy',
    tags: ['Kubernetes', 'DevOps', 'Containerization'],
    description: 'Comprehensive guide to Kubernetes for development and deployment',
    certificateUrl: '/images/kubernetes.jpg',
  },
  {
    id: 'udemy-langchain-ai-agents',
    title: 'Building AI Agents with LangChain and Microsoft Azure',
    provider: 'Udemy',
    tags: ['AI', 'LangChain', 'Azure', 'Agents'],
    description: 'Building intelligent AI agents using LangChain and Microsoft Azure',
    certificateUrl: '/images/langchain_ai_agents.jpg',
  },
]

// Get all unique tags for filtering
export function getAllCertificationTags(): string[] {
  const tagsSet = new Set<string>()
  certifications.forEach((cert) => {
    cert.tags.forEach((tag) => tagsSet.add(tag))
  })
  return Array.from(tagsSet).sort()
}

// Get all unique providers for filtering
export function getAllProviders(): Certification['provider'][] {
  const providersSet = new Set<Certification['provider']>()
  certifications.forEach((cert) => {
    providersSet.add(cert.provider)
  })
  return Array.from(providersSet).sort() as Certification['provider'][]
}