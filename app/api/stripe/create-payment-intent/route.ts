// ✅ Backend: /api/create-payment-intent.ts  
import { stripe } from '@/lib/stripe';  
import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(req: NextRequest) {
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
    metadata: { job_id: resp.id, user_id:resp.user_id, user_full_name:resp.user_full_name},
    receipt_email: resp.email,  
   //// payment_method_types: ['card'],
    automatic_payment_methods: { enabled: true }, 
  
  }); 
 
 return NextResponse.json({ clientSecret:  paymentIntent.client_secret}, {status:200}) 
 
}