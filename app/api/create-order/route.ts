// /pages/api/create-order.ts  
import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"
 
export async function POST(req:NextRequest) {
  if (req.method !== 'POST') return NextResponse.json({ message: 'Method not allowed' }, {status: 405})

const resp =await req.json()
const email= resp.email
const amount= resp.amount
const job_id = resp.id; 
const job_title = resp.description;
const user_id = resp?.user_id;  
 
  if (!email || !amount ) {
    return NextResponse.json({ message: 'Missing required fields' }, {status: 400})
  }
 
  const reference = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`
  const supabase =await createClient();
 const {data:xy, error: xError } = await supabase.from('payments')
 .select('*')
 .eq('job_id', job_id)
 .single() 

 if(!xy?.job_id)
  {  const {data, error: insertError } = await supabase.from('payments').insert([
      {
      job_id,
        email: email,
        amount:  amount,
        status: 'pending',
        job_title,
        last_payment_date:new Date(),
        last_payment_amount: amount,
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
        amount:amount ,
        payment_status: 'pending', 
        paid_at: new Date(),
        status: 'pending',
      })
      .eq('id', job_id);

    if (updateError) {
      console.error('❌ Error updating job:', updateError);
    }
  
  //console.log(`📦 New Order:`, { email, amount, reference })
 return NextResponse.json({ reference,  status:200})
}
