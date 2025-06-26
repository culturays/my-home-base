 
// app/api/webhook/route.ts
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { buffer } from 'micro';
export const config = {
  api: {
    bodyParser: false,
  },
};
 //4242 4242 4242 4242
 
export async function POST(req:NextRequest) {  
  const rawBody = Buffer.from(await req.arrayBuffer()); 
  const sig= req.headers.get('stripe-signature')!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event; 
 
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
     if (event.type === 'payment_intent.succeeded') { 
const paymentIntent = event.data.object as Stripe.PaymentIntent;
const job_id = paymentIntent.metadata?.job_id; 
const job_title = paymentIntent.description;
const user_id = paymentIntent.metadata?.user_id;  
const email = paymentIntent.receipt_email;
const amount = paymentIntent.amount;
 
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
 const {data:xy, error: xError } = await supabase.from('payments').select('*').eq('job_id', job_id).single() 

 if(!xy?.id)
  {  const {data, error: insertError } = await supabase.from('payments').insert([
      {
        job_id,
        email: email,
        amount:  (amount || 0) * 10,
        status: 'paid',
        job_title,
        last_payment_date:new Date(),
        last_payment_amount:  (amount || 0) * 10,
        user_id 
      },
    ]);
 
    if (insertError) {
      console.error('❌ Error inserting payment:', insertError);
    }
}
 
    const { error: updateError } = await supabase
      .from('jobs')
      .update({
        amount:  (amount || 0) * 10,
        payment_status: 'paid', 
        paid_at: new Date(),
        status: 'in progress',
      })
      .eq('id', job_id);

    if (updateError) {
      console.error('❌ Error updating job:', updateError);
    }
 
 const { error: profileError } = await supabase
      .from('profiles')
      .update({ 
        jobs_completed:job_id,
      })
      .eq('id', user_id); 

  }

  } catch (err: any) {
    console.error('❌ Webhook signature verification failed.', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  } 

  return NextResponse.json({ received: true }, { status: 200 });
}


 