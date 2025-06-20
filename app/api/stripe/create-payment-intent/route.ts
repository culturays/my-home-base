// ✅ Backend: /api/create-payment-intent.ts  
import { stripe } from '@/lib/stripe'; 
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, {status:405});
  }
 
  const resp = await req.json(); 
  if (!resp.amount) {
    return NextResponse.json({ error: 'Missing email' }, {status:400});
  } 
  
// const customer = await stripe.customers.create({
//   email:resp.email,
//   name: resp.user_full_name,
// });

 
  const paymentIntent = await stripe.paymentIntents.create({
     description: resp.job_title,
    //  customer: resp.stripe_customer_id, 
    amount: resp.amount,
    currency: 'usd',
    metadata: { job_id: resp.id, user_id:resp.user_id, user_full_name:resp.user_full_name },
     receipt_email: resp.email,  
   //// payment_method_types: ['card'],
    automatic_payment_methods: { enabled: true }, 
 
  }); 
  const supabase=await createClient() 
  await supabase
    .from('jobs')
    .update({ payment_status: 'paid', paid_at: new Date(), receiver:resp.receiver, })
    .eq('id', resp.id);
 
 return NextResponse.json({ clientSecret:  paymentIntent.client_secret}, {status:200}) 
 
}