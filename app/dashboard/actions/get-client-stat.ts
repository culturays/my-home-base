 
"use server";
import { createClient } from "@/utils/supabase/server";

export async function getClientStats() {
   const supabase=await createClient()
     const {
    data: { user }
  } = await supabase.auth.getUser() 
const { data, error } = await supabase
  .from("client_stats")
  .select("*")
  .eq("client_id", user?.id)
  .single();
 
  return data ;
}
