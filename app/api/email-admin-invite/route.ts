
import { type NextRequest, NextResponse } from 'next/server'; 
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req:NextRequest) { 
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, {status:405});
  }
 
  const resp = await req.json(); 
  if (!resp.email) {
    return NextResponse.json({ error: 'Missing email' },  {status:400});
  }

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',//change to domain
      to: resp.email,
      subject: 'You have been invited as an admin',
      html: `
        <h2>You’ve been invited!</h2>
        <p>You’ve been invited to join as an admin.</p>
        <p><a href="http://localhost:3000/sign-in">Click here to log in or sign up</a></p>
      `,
    });
return NextResponse.json({ message: data}, {status:200}) 
  //  return NextResponse.json({ success: true, data }, {status:200});
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ error: 'Email sending failed' }, {status:500});
  }
}
