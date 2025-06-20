"use server"
import { createClient } from "@/utils/supabase/server"; 
import sgMail from '@sendgrid/mail'; 
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function siteContacts(formData:FormData){
    const name=formData.get('name')
    const email=formData.get('email') as string
    const message=formData.get('message')
     const supabase = await createClient()
      const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ name, email, message }]);
    
     const emailContent = {
    to: process.env.EMAIL_TO!,
    from: process.env.EMAIL_FROM!,
    subject: `📬 New Contact Form Submission from ${name}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  try {
    await sgMail.send(emailContent);
    await sgMail.send({
  to: email, 
  from: process.env.EMAIL_FROM!,
  subject: '📨 We received your message!',
  html: `
    <p>Hi ${name},</p>
    <p>Thanks for reaching out! We’ve received your message and will get back to you shortly.</p>
    <hr />
    <p><strong>Your Message:</strong><br>${message}</p>
    <p>– The Team</p>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <!-- Header -->
      <div style="background-color: #0d9488; padding: 20px; text-align: center;">
        <img src="/logo.png" alt="Company Logo" style="height: 50px;" />
        <h2 style="color: white; margin-top: 10px;">Thank you for contacting us!</h2>
      </div>

      <!-- Body -->
      <div style="padding: 24px; background-color: #ffffff;">
        <p style="font-size: 16px; color: #333;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 15px; color: #555;">
          We’ve received your message and one of our team members will get back to you as soon as possible.
        </p>

        <div style="margin-top: 24px; background-color: #f9f9f9; padding: 16px; border-left: 4px solid #f97316;">
          <p style="margin: 0; font-size: 14px; color: #333;"><strong>Your message:</strong></p>
          <p style="margin: 0; font-size: 14px; color: #666;">${message}</p>
        </div>

        <p style="margin-top: 24px; font-size: 14px; color: #888;">We’ll be in touch soon!</p>
        <p style="font-size: 14px; color: #888;">— The YourCompany Team</p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f0fdfa; padding: 12px; text-align: center; font-size: 12px; color: #666;">
        © ${new Date().getFullYear()} YourCompany · <a href="https://my-home-base.vercel.app/" style="color: #0d9488;">https://my-home-base.vercel.app/</a>
      </div>
    </div>
  `,
});

  } catch (sendError) {
    // console.error('SendGrid error:', sendError);
    // return res.status(500).json({ error: 'Message saved but email failed' });
  }
  }
