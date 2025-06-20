// ✅ 4. Optional: Recent Activity Feed
// A sidebar or section showing recent actions like:

// "John Doe was made a provider"

// "Admin invite sent to jane@example.com"

// "Client paid $50 for Job #123"
 
import { type User } from '@supabase/supabase-js';
import Payments from '@/components/Dashboard/Payments';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
   const getSession = async () => {
        const supabase =await createClient() 
      const {
        data: { user },
      } = await supabase.auth.getUser();
     return user
    };
  
const AdminPayments= async() =>{  
 const user =await getSession();
const jobsTable =async()=>{
    const supabase =await createClient()
    const { data:jobs , error:jobsErr } =await supabase
      .from('profiles')
      .select('jobs_posted')
      const total = jobs?.reduce((acc, p) => {
  const amount = p.jobs_posted; 
  return acc + (isNaN(amount) ? 0 : amount); 
}, 0) || 0;
 return total as number
     
   }
   const totalCompleted =async()=>{
    const supabase =await createClient()
    const { data:completed , error:jobsErr } =await supabase
      .from('profiles')
      .select('*')
     .eq('jobs_completed','completed') 
 return completed??[]
     
   }
    const paymentsTotal =async()=>{
    const supabase =await createClient()
  const { data, error } = await supabase
  .from('payments')
  .select('amount', { count: 'exact', head: false });
 
// const total = data?.reduce((acc, p) => {
//   const amount = parseFloat(p.amount?.toString().replace(/[^\d.-]/g, '')); 
//   return acc + (isNaN(amount) ? 0 : amount); 
// }, 0) || 0;

const total = data?.reduce((acc, p) => {
  const amount = parseFloat(p.amount); 
  return acc + (isNaN(amount) ? 0 : amount); 
}, 0) || 0;
 return total as number
   }
    const clientTotal =async()=>{
    const supabase =await createClient()
  const { data, error } = await supabase
  .from('profiles') 
  .select('*', { count: 'exact', head: false })
  .eq('role','client') 
 return data??[]
   }

    const providersTotal =async()=>{
    const supabase =await createClient()
  const { data, error } = await supabase
  .from('profiles') 
  .select('*', { count: 'exact', head: false })
  .eq('role','provider') 
 
 return data ??[]
  
   }
   const jobData = await jobsTable()
   const paymentsT=await paymentsTotal()
   const clientX= await clientTotal()
    const providersX= await providersTotal()
     const jobsCompleted =await totalCompleted()
    
      if (user?.user_metadata?.role !== 'admin'&& user?.email !== 'ngene.christina@gmail.com') {
        redirect('/unauthorized');
      }

  return (
  <Payments jobsPosted={jobData} paymentsT={paymentsT} clientX={clientX.length}
providersX={providersX.length} jobsCompleted={jobsCompleted.length} /> 
  );
}

export default AdminPayments