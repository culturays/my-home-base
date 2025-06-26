 
import Link from 'next/link'; 
import { createClient } from '@/utils/supabase/server';
import { postedBy, assignedErrands, userReviews, prevClients, returnUnsassignedProducts } from '../products/return-products';
import { type User } from '@supabase/supabase-js'
import { redirect } from 'next/navigation';
import Client from '@/components/Dashboard/Client';
import Provider from '@/components/Dashboard/Provider'; 
import { getClientStats } from './actions/get-client-stat';
import { fetchProviderView, invitedTo, receivedInterestsToJobs } from './actions/invite-providers';
import { NotifyClient, NotifyProvider } from './actions/get-messages';
import { ProfileProps, RolesProps } from '../types';
import RoleSelectorModal from '@/components/RoleSelectorModal';
const userObj =async()=>{
    const supabase =await createClient();
    const { 
      data: { user }, 
      } = await supabase.auth.getUser();
    if (!user){  
     redirect ('/sign-in/')
  }

   return user as User
  }
const DashboardPage = async({searchParams}: {
searchParams: Promise<{ payment_intent: string }>})=> {
  const {payment_intent}= await searchParams 
 const user = await userObj();
const roleData = async ()=>{
  const supabase =await createClient();  
const { data: activeRole, error } = await supabase
  .from('roles')
  .select('*, profileByRole:profiles(*)')
  .eq('user_id', user.id)
  .eq('active', true) 
  .single();
   
 if (activeRole?.role ==='none'&& user?.email=== 'ngene.christina@gmail.com' ||!activeRole?.role&& user?.email=== 'ngene.christina@gmail.com'){ 
    redirect('/dashboard/admin/')
  } 
    if(activeRole?.role=== 'admin')redirect('/dashboard/admin/')
    return activeRole
}

const productsX= await returnUnsassignedProducts()
const products =await postedBy()
const receivedItx =await receivedInterestsToJobs()
const userRole= await roleData() 
const recentProviders = await assignedErrands() 
const userXReviews =await userReviews()
const clientStats =await getClientStats()
const recentCli = await prevClients()  
const clientNotices = await NotifyClient(user?.id)
const provNotices = await NotifyProvider(user?.id)
const invitedX= await invitedTo() 

const resetUrl= ()=>{
    if (payment_intent) {
  return redirect('/dashboard/')
}
}
resetUrl()
return (
<div>  
  { !userRole?.role&&<div className="text-2xl font-bold text-teal-800 p-6"><Link href='/edit-profile/'>Update Profile to View Page</Link></div>} 
 <div className='py-6 flex justify-center'>
      <h1 className="text-3xl font-bold text-teal-800 dark:text-gray-200">Services Dashboard</h1>
      <p className="text-lg dark:text-gray-300 opacity-80 capitalize mx-2"> <strong>{userRole?.role}</strong></p>
   </div>
   { userRole?.role==='provider' && userRole?.active=== true&& <Provider reviews={userXReviews.providerRex as []} recentCli={recentCli} jobs={productsX} products={invitedX} user={user} clientStats={clientStats} notices={provNotices} userLocation={userRole.address} roles={userRole}/>}
 {userRole?.role === 'client' && userRole?.active=== true? (
  <Client errands={products} reviews={userXReviews.clientRex as []} recentProviders={recentProviders} user={userRole}clientStats={clientStats} notices={clientNotices} receivedItx={receivedItx} roles={userRole} />
):
(<></>)
}   
 
</div>

  );
}
export default DashboardPage