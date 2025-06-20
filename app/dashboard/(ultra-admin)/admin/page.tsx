import Admin from '@/components/Dashboard/Admin';
import { createClient } from '@/utils/supabase/server'; 
import { type User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { getIvs } from './action';
import { headers } from "next/headers";
 
const AdminPage= async () =>{
  const origin = (await headers()).get('referer'); 
     
     const getSession = async () => {
    const supabase= await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser();
        if (!user) {
        
   redirect('/');
    
  }
  return user as User;
    };

const fetchMembers = async () => { 
      if (!user) {
    console.warn('No user found in session. Skipping fetchMembers.');
    return;
  }
  
//     if (!user?.user_metadata?.role && user.email === 'ngene.christina@gmail.com' ) { 
//  return
//   } 
  if (user?.user_metadata?.role !== 'admin'&& user.email !== 'ngene.christina@gmail.com') {
    redirect('/unauthorized');
  }
 const supabase= await createClient() 
  const { data:membersOnlyData } = await supabase.from('profiles').select('*') 
 return membersOnlyData 
  };

// user_metadata.name: 'name',
  const user= await getSession()
 const membersPayments = await fetchMembers()?? []
 const invitesX=await getIvs()??[]
 //  if (!members) { 
//     notFound()
//   }
 
  return (
    <>
  <div className='w-[1200px] mx-auto px-4 py-8'> 
  <Admin user={user} members={membersPayments} invitesX={invitesX} />  
  </div>
    </> );
}
export default AdminPage 