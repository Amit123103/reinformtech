import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { sendEmail, getEmailTemplate } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { subject, htmlContent } = await request.json();

    if (!subject || !htmlContent) {
      return NextResponse.json({ error: 'Subject and Content are required' }, { status: 400 });
    }

    // 1. Fetch all active subscribers
    const { data: subscribers, error: dbError } = await supabaseAdmin
      .from('subscribers')
      .select('email')
      .eq('status', 'active');

    if (dbError) {
      if (dbError.code === '42P01') {
        return NextResponse.json({ error: "Subscribers table does not exist yet." }, { status: 400 });
      }
      throw dbError;
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ error: 'No active subscribers found.' }, { status: 400 });
    }

    // Extract emails into an array
    const bccList = subscribers.map((sub) => sub.email);

    let successCount = 0;
    
    // We will BCC in chunks of 50 to avoid SMTP limits
    const CHUNK_SIZE = 50;
    for (let i = 0; i < bccList.length; i += CHUNK_SIZE) {
      const chunk = bccList.slice(i, i + CHUNK_SIZE);
      
      const success = await sendEmail({
        to: process.env.GMAIL_EMAIL || 'reinformtech@gmail.com', // Admin gets a copy
        bcc: chunk, // Send to 50 subscribers blindly
        subject: subject,
        html: getEmailTemplate(htmlContent), // Wrap with the global professional template!
      });
      
      if (success) successCount += chunk.length;
    }

    return NextResponse.json({ success: true, count: successCount });
  } catch (error) {
    console.error("Error broadcasting email:", error);
    return NextResponse.json({ error: 'Failed to broadcast email' }, { status: 500 });
  }
}
