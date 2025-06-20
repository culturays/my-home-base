"use server"
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache'; 

export async function deleteData(id: string|number) { 
 const supabase = await createClient() 
 // Delete invitations where job_id = X
await supabase.from('invitations').delete().eq('job_id', id)
await supabase.from('notifications').delete().eq('job_id', id) 
 const {error}= await supabase.from('jobs').delete().eq('id', id);
 
revalidatePath('/dashboard')
 
}
