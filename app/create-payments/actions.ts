import { createClient } from "@/utils/supabase/server";

export const getPaymentsByClient=async()=>{
  const supabase =await createClient();
    const { 
      data: { user }, 
      } = await supabase.auth.getUser();

const { data: payments } = await supabase
  .from('payments')
  .select('*')
  .eq('user_id', user?.id)
  .order('created_at', { ascending: false })
  return payments
}