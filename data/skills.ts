export interface Skill {
  category: string
  items: string[]
}

export const skills: Skill[] = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "Vercel", "GitHub"],
  },
]