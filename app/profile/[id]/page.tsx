import { ErrandProps, ProfileProps } from "@/app/types";
import UserObj from "@/components/UserObj";
import { createClient } from "@/utils/supabase/server";  
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
const ProfilePage= async ({params }: {
   params: Promise<{ id: string|number }>} )=> {
    const supabase =await createClient();
     const userXObj =async()=>{
         const id =(await params).id  
              const { 
            data: { user }, 
     } = await supabase.auth.getUser(); 
      if (!user) {
  redirect('/sign-in')  
}
     return user
 }

 await userXObj()

   const userProfileData =async ()=>{
     const { data: userItem } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data?.id)
    .single()
    const { data: userJobs } = await supabase
          .from('jobs')
          .select('id, title, status')
          .eq('user_id', data.id)
          .order('created_at', { ascending: false })
          .limit(3)

return userItem
   }

const listJobs=async ()=>{
 const { data: listJobs } = await supabase
          .from('jobs')
          .select('id, title, status')
          .eq('user_id', data.id)
          .order('created_at', { ascending: false })
          .limit(3)
return listJobs

}

 const data = await userProfileData() as ProfileProps 
const userList =await listJobs() as ErrandProps[]
  if (!data)
    return <div className="text-center text-red-500">User not found or not logged in.</div>
//link to go to dashboard
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-teal-600">Your Profile</h1>
    <UserObj user={data} listings={userList}/>    
    </div>
  )
}

export default ProfilePage