import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { rating, message } = await req.json()

    if (!rating || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // 1. Save to Supabase
    const { error: supabaseError } = await supabase
      .from('feedbacks')
      .insert([{ rating, message }])

    if (supabaseError) throw supabaseError

    const stars = '⭐'.repeat(rating)

    // 2. Send Email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Feedback <onboarding@resend.dev>', 
      to: 'boutitimedamine1@gmail.com',
      subject: `New ${rating}-Star Feedback Received!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Feedback Received!</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Rating:</strong> ${rating} / 5 ${stars}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; color: #555;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #999; margin-top: 20px;">
            This email was sent from your portfolio feedback form.
          </p>
        </div>
      `,
    })

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Feedback Error:', error)
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 })
  }
}