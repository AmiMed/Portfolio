// app/api/send-resume/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

const resend = new Resend(process.env.RESEND_API_KEY);

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { recruiterEmail, jobTitle, companyName } = await req.json();

    if (!recruiterEmail || !jobTitle) {
      return NextResponse.json({ error: 'Email and Job Title are required' }, { status: 400 });
    }

    // 1. Générer le résumé de carrière personnalisé avec l'IA
    const { text: emailContent } = await generateText({
      model: groq('openai/gpt-oss-20b'),
      system: `You are an AI assistant writing an email on behalf of Med Amine (FullStack Developer). 
      Write a professional, enthusiastic email to a recruiter. 
      The email should highlight Med Amine's 5+ years of experience in React, Next.js, React Native, and Laravel, his DevOps skills (Docker, CI/CD), and his recent focus on AI integration.
      Keep it concise (3 paragraphs). 
      IMPORTANT: Respond ONLY in the language inferred from the job title or company name. If the input is in French, write the email in French. If in English, write in English.`,
      prompt: `Write a personalized email to a recruiter at ${companyName || 'their company'} who is looking for a ${jobTitle}. Start the email with "Dear Recruiter," or "Bonjour," depending on the language. End with "Best regards, \n\nMed Amine \nFullStack Developer \n+216 28 635 316 \nboutitimedamine1@gmail.com"`,
      temperature: 0.7,
    });

    // 2. Envoyer l'email avec Resend
    // Note: Remplacez 'onboarding@resend.dev' par votre domaine vérifié sur Resend (ex: contact@medamine.dev)
    const { data, error } = await resend.emails.send({
      from: 'Med Amine Portfolio <onboarding@resend.dev>',
      to: [recruiterEmail],
      bcc: ['boutitimedamine1@gmail.com'], // Vous recevez une copie !
      subject: `Regarding the ${jobTitle} position - Med Amine`,
      text: emailContent,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}