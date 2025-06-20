 
// app/api/webhook/route.ts
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { buffer } from 'micro';
import { createClient } from '@supabase/supabase-js';
import { stripe } from '@/lib/stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};
 
export async function POST(req: NextRequest) {
  const rawBody = Buffer.from(await req.arrayBuffer());
  const sig = req.headers.get('stripe-signature')!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event; 
 
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed.', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
 
 if (event.type === 'payment_intent.succeeded') {
//   console.log('Received webhook event:', event.type);
// console.log('Webhook body:', JSON.stringify(event.data.object, null, 2));

  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const job_id = paymentIntent.metadata?.job_id;
   //const user_full_name = paymentIntent.metadata?.user_full_name;
    const job_title = paymentIntent.description;
    const user_id = paymentIntent.metadata?.user_id;  
   const email = paymentIntent.receipt_email;
  const amount = paymentIntent.amount;
 
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
 const {data:xy, error: xError } = await supabase.from('payments').select('*').eq('job_id', job_id)
 if(!xy)
  {  const {data, error: insertError } = await supabase.from('payments').insert([
      {
        job_id,
        email: email,
        amount: (amount || 0) * 100,
        status: 'paid',
        job_title,
        last_payment_date:new Date(),
        last_payment_amount: (amount || 0) * 100,
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
        amount: (amount || 0) * 100,
        payment_status: 'paid',
        status: 'completed',
        paid_at: new Date(),  
        //receiver:'', 
         stripe_payment_intent_id: paymentIntent.id 
      })
      .eq('id', job_id);

    if (updateError) {
      console.error('❌ Error updating job:', updateError);
    }
//4242 4242 4242 4242 fix redirect
 const { error: profileError } = await supabase
      .from('profiles')
      .update({ 
        jobs_completed:job_id,
      })
      .eq('id', user_id); 

//  await supabase.rpc('increment_seller_balance', {
//       seller_id_input: job_id,
//       amount_input: amount * 0.9, // 10% commission
//     });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
