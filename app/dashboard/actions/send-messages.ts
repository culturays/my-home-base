"use server";
import { createClient } from "@/utils/supabase/server";

export async function sendMessage(sender_id: string|number, receiver_id: string|number, message: string|number, jobid:number) {
  const supabase =await createClient();
  const { data, error } = await supabase.from("messages").insert([
    { sender_id, receiver_id, message , job_id:jobid}
  ]).select(); 

  return { data, error };
}
 