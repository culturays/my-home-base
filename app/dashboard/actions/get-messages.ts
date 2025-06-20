// actions/getMessages.ts
"use server";
import { createClient } from "@/utils/supabase/server";

export async function getMessages(userA: string|number, userB: string|number, receiversId:any[]) {
  const supabase =await createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(`and(sender_id.eq.${userA},receiver_id.eq.${userB}),and(sender_id.eq.${userB},receiver_id.eq.${userA})`)
    .order("created_at", { ascending: true });
 
  const { data:recentChats, error:recentErrors } = await supabase
    .from("profiles")
    .select("*")
    .in('id', (receiversId??[])) 
  return { data, error, recentChats} ;
}


export const getNotifed=async(clientId:string|number)=>{
const supabase =await createClient();

const { data: notifications } = await supabase
  .from('notifications')
  .select('*')
  .eq('poster_id', clientId)
  .order('created_at', { ascending: false }) 

  return notifications??[]
}

 