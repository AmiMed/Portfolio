import { NextRequest, NextResponse } from 'next/server'
import { franc } from 'franc'
import { Resend } from 'resend'

// Language detection function
function detectLanguage(text: string): 'en' | 'fr' {
  // Minimum text length check
  if (text.trim().length < 2) return 'en'
  
  try {
    const detected = franc(text, { minLength: 1 })
    console.log('Detected language code:', detected) // Debug
    
    // Map language codes correctly
    if (detected === 'fra' || detected === 'fro' || detected.startsWith('fr')) {
      return 'fr'
    }
    return 'en'
  } catch (error) {
    console.error('Language detection error:', error)
    return 'en'
  }
}

// Multilingual portfolio context
const PORTFOLIO_CONTEXTS = {
  en: `
You are the AI assistant for John Doe's portfolio website.
You are friendly, concise, and helpful.
**IMPORTANT: Always respond in English only.**

ABOUT JOHN:
- Full-stack developer with 3+ years of experience
- Based in Paris, France
- Specializes in React, Next.js, NestJS, TypeScript
- Currently available for freelance work
- Responds within 24 hours
- Email: hello@example.com

PROJECTS:
1. E-Commerce Platform — Full-stack with Next.js, TypeScript, Stripe, PostgreSQL
2. Task Management App — Real-time Kanban board with NestJS, React, WebSockets, MongoDB
3. AI Content Generator — GPT-powered writing tool with Next.js, OpenAI, Prisma
4. Portfolio CMS — Headless CMS with NestJS, TypeScript, PostgreSQL, Docker

SKILLS:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, NestJS, Express, REST APIs, GraphQL
- Database: PostgreSQL, MongoDB, Prisma ORM, Redis, Firebase
- DevOps: Docker, Git, CI/CD, Vercel, AWS, Linux

RULES:
- Keep answers short (2-3 sentences max unless asked for details)
- Use markdown formatting for links and bold text
- If asked about pricing, say "Contact John directly for a custom quote"
  `,
  
  fr: `
Tu es l'assistant IA pour le portfolio de John Doe.
Tu es amical, concis et utile.
**IMPORTANT: Réponds toujours en français uniquement.**

À PROPOS DE JOHN:
- Développeur full-stack avec 3+ ans d'expérience
- Basé à Paris, France
- Spécialisé en React, Next.js, NestJS, TypeScript
- Actuellement disponible pour des projets en freelance
- Répond dans les 24 heures
- Email: hello@example.com

PROJETS:
1. Plateforme E-Commerce — Full-stack avec Next.js, TypeScript, Stripe, PostgreSQL
2. Application de Gestion des Tâches — Tableau Kanban en temps réel avec NestJS, React, WebSockets, MongoDB
3. Générateur de Contenu IA — Outil d'écriture alimenté par GPT avec Next.js, OpenAI, Prisma
4. CMS Portfolio — CMS headless avec NestJS, TypeScript, PostgreSQL, Docker

COMPÉTENCES:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, NestJS, Express, APIs REST, GraphQL
- Base de données: PostgreSQL, MongoDB, Prisma ORM, Redis, Firebase
- DevOps: Docker, Git, CI/CD, Vercel, AWS, Linux

RÈGLES:
- Garder les réponses courtes (2-3 phrases max sauf si demandé plus de détails)
- Utiliser le formatage markdown pour les liens et le texte en gras
- Si on te demande le prix, dis "Contacte John directement pour un devis personnalisé"
  `
}




const resend = new Resend(process.env.RESEND_API_KEY)
 
export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()
 
    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
 
    // Send email
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Change this after verifying your domain
      to: 'boutitimedamine1@gmail.com',
      replyTo: email,
      subject: subject || 'New Contact Form Submission',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject || '(No subject)'}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; color: #555;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #999; margin-top: 20px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
    })
 
    if (data.error) {
      return NextResponse.json(
        { error: data.error.message },
        { status: 500 }
      )
    }
 
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}