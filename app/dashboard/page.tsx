 
import Link from 'next/link'; 
import { createClient } from '@/utils/supabase/server';
import { postedBy, assignedErrands, userReviews, prevClients, returnUnsassignedProducts } from '../products/return-products';
import { type User } from '@supabase/supabase-js'
import { redirect } from 'next/navigation';
import Client from '@/components/Dashboard/Client';
import Provider from '@/components/Dashboard/Provider'; 
import { getClientStats } from './actions/get-client-stat';
import { invitedTo, receivedInterestsToJobs } from './actions/invite-providers';
import { getNotifed } from './actions/get-messages';
const userObj =async()=>{
    const supabase =await createClient();
    const { 
      data: { user }, 
      } = await supabase.auth.getUser();
    if (!user){  
     redirect ('/sign-in')
    
    }
   return user as User
  }
const DashboardPage = async()=> {
 const user = await userObj();
const roleData = async ()=>{
  const supabase =await createClient();
  const { data: userRole } = await supabase
    .from('profiles')
    .select('role, address')
    .eq('id', user?.id)
    .single()

      if (!userRole?.role ||userRole?.role ==='none'&& user?.email=== 'ngene.christina@gmail.com'){ 
    redirect('/dashboard/admin')
  } 
    if(userRole?.role=== 'admin')redirect('/dashboard/admin')
    return userRole
}

const productsX= await returnUnsassignedProducts()
const products =await postedBy()
const receivedItx =await receivedInterestsToJobs()
const userRole= await roleData() 
const recentProviders = await assignedErrands() 
const userXReviews =await userReviews()
const clientStats =await getClientStats()
const recentCli = await prevClients()  
const notices = await getNotifed(user?.id)
const invitedX= await invitedTo()

return (
<div className=''> 
 <div className='py-6 flex justify-center'>
      <h1 className="text-3xl font-bold text-teal-800">Errand Services Dashboard</h1>
      <p className="text-lg text-gray-600 capitalize mx-2"> <strong>{userRole?.role}</strong></p>
   </div>
   {userRole?.role === 'client' ? (
  <Client errands={products} reviews={userXReviews} recentProviders={recentProviders } user={user}clientStats={clientStats} notices={notices} receivedItx={receivedItx} userLocation={userRole.address}/>
) : userRole?.role === 'provider' ?(
  <Provider reviews={userXReviews} recentCli={recentCli} jobs={productsX} products={invitedX} user={user} clientStats={clientStats} notices={notices} userLocation={userRole.address}/>
):
(<div className="text-2xl font-bold text-teal-800 p-6"><Link href='/edit'>Update Profile to View Page</Link></div>)
}  

</div>

  );
}
export default DashboardPage