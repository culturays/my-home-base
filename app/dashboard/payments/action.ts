import { createClient } from "@/utils/supabase/server"; 
 
export const payOutData = async ()=>{
   const supabase =await createClient()

  // Query sellers with pending payouts and sum amounts
  const { data, error } = await supabase
    .from('jobs')
    .select('accepted_by, profiles(email, ), amount')
    .eq('status', 'paid')
    .eq('payment_status', 'pending')
    .neq('accepted_by', null);

  if (error) return { error: error.message };

  // Aggregate pending amounts per seller
  const sellersMap = new Map();

  // data.forEach(({ accepted_by, amount, profiles }) => {
  //   if (!sellersMap.has(accepted_by)) {
  //     sellersMap.set(accepted_by, {
  //       id: accepted_by,
  //       email: profiles, 
  //       pendingAmount: 0,
  //     });
  //   }
  //   sellersMap.get(accepted_by).pendingAmount += amount;
  // }); 
  return { sellers: Array.from(sellersMap.values()) }
}
  

 