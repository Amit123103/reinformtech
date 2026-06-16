import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { sendEmail, getEmailTemplate } from '@/lib/email';

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('job_roles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (error.code === '42P01') return NextResponse.json([]); // Table doesn't exist
      throw error;
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error: any) {
    console.error("Error fetching job roles:", error);
    return NextResponse.json({ error: "Failed to fetch job roles" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const submissionData = {
      role: data.role,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      github_url: data.github_url || null,
      portfolio_url: data.portfolio_url || null,
      other_url: data.other_url || null,
      papers_description: data.papers_description || null,
      cover_letter: data.coverLetter || null,
      status: 'new'
    };

    let docId = 'pending';
    try {
      const { data: dbData, error: dbError } = await supabaseAdmin
        .from('job_applications')
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
      <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
      <p><strong>Portfolio/LinkedIn:</strong> ${data.portfolio_url ? `<a href="${data.portfolio_url}">${data.portfolio_url}</a>` : 'N/A'}</p>
      <p><strong>GitHub:</strong> ${data.github_url ? `<a href="${data.github_url}">${data.github_url}</a>` : 'N/A'}</p>
      <p><strong>Other Link:</strong> ${data.other_url ? `<a href="${data.other_url}">${data.other_url}</a>` : 'N/A'}</p>
      
      ${data.papers_description ? `
      <h3>Publications / Papers:</h3>
      <p style="white-space: pre-wrap;">${data.papers_description}</p>
      ` : ''}

      <h3>Cover Letter / Resume Link:</h3>
      <p style="white-space: pre-wrap;">${data.coverLetter || 'N/A'}</p>
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
