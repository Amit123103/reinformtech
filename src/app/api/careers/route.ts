import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { sendEmail, getEmailTemplate } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Map to projects table schema
    const submissionData = {
      name: data.name,
      email: data.email,
      company: data.portfolio, // Reusing company for portfolio URL
      service: `Job Application: ${data.role}`,
      budget: 'N/A',
      details: data.coverLetter, // Reusing details for cover letter
      status: 'new'
    };

    let docId = 'pending';
    try {
      const { data: dbData, error: dbError } = await supabaseAdmin
        .from('projects')
        .insert([submissionData])
        .select()
        .single();
        
      if (dbError) throw dbError;
      if (dbData) docId = dbData.id;
    } catch (dbError) {
      console.error("Error saving job application to Supabase:", dbError);
    }

    // Send Email to Admin
    const adminHtml = `
      <h2>New Job Application Received</h2>
      <p><strong>Role:</strong> ${data.role}</p>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Portfolio/LinkedIn:</strong> <a href="${data.portfolio}">${data.portfolio}</a></p>
      <h3>Cover Letter / Details:</h3>
      <p style="white-space: pre-wrap;">${data.coverLetter}</p>
      <hr />
      <p><small>Database ID: ${docId}</small></p>
    `;

    await sendEmail({
      to: 'reinformtech@gmail.com', // Admin email
      subject: `Job Application: ${data.name} for ${data.role}`,
      html: getEmailTemplate(adminHtml),
    });

    // Send Auto-Reply to Candidate
    const clientHtml = `
      <h2>Hi ${data.name},</h2>
      <p>Thank you for applying for the <strong>${data.role}</strong> position at ReInformTech.</p>
      <p>We have successfully received your application. Our team will review your details and if there's a good fit, we'll reach out to schedule an interview.</p>
      <br/>
      <p>Best regards,</p>
      <p><strong>The ReInformTech Recruiting Team</strong></p>
    `;

    await sendEmail({
      to: data.email,
      subject: `Application Received: ${data.role} at ReInformTech`,
      html: getEmailTemplate(clientHtml),
    });

    return NextResponse.json({ success: true, id: docId });
  } catch (error) {
    console.error("Error processing job application:", error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
