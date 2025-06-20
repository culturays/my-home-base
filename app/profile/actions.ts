   "use server"
   import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
 export const userXObj =async()=>{
    const supabase = await createClient() 
         const { 
            data: { user }, 
     } = await supabase.auth.getUser(); 
 
  return user
 }
 
  export const userProfileData =async ()=>{
    const data = await userXObj()
    const supabase = await createClient()
     const { data: userItem } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data?.id)
    .single() 

return userItem
   }
