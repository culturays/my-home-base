// app/actions/respond-invite.ts
'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function respondToInvite({
  invitingId,
  response,
  jobid,
  jobTitle, 
}: {
  invitingId: string|number;
  response: 'accepted' | 'rejected' | 'interest' | 'completed' | 'cancelled';
 jobid: string|number
 jobTitle:string 
}) {
 
  const supabase =await createClient();
   const {
    data: { user }
  } = await supabase.auth.getUser()  
    if(response==='interest'){
   const { error: insertError } = await supabase
    .from('invitations')
    .insert({ status: response, job_id:jobid, interest_id:user?.id, provider_id:user?.id , client_id:invitingId, user_id:user?.id}) 
    .select()
   await supabase.from('notifications').insert([
      {
        poster_id: invitingId,
        type: 'interest_recieved',
        job_id:jobid,
        message: `"${user?.user_metadata.full_name}" showed interest in your job ${jobTitle}.`,
      },
    ]);
       await supabase.from('jobs')
       .update([{ status: 'pending'}])
       .eq('id', jobid);
if (insertError) {
    console.error('Error inviting provider:', insertError.message);
    return { success: false, error: insertError.message };
  }
  }

  // Get invite info
  const { data: inviteData, error:x } = await supabase
    .from('invitations')
    .select('provider_id, client_id, job_id, job:jobs(title)')
    .eq('id', invitingId)
    .single();

  if (!inviteData) return { success: false, error: 'Invitation not found' };

  const { error: updateError } = await supabase
    .from('invitations')
    .update({ status: response, updated_at:new Date() })
    .eq('id', invitingId)
    .select()
 
  if (updateError) {
    console.error('Update error:', updateError.message);
    return { success: false, error: updateError.message };
  }
    if (response === 'accepted') {
       const { error: jbxError } = await supabase
    .from('jobs')
    .update({ accepted_by: user?.id, assigned:true })
    .eq('id', jobid);
    
    await supabase.from('notifications').insert([
      {
        poster_id: invitingId,
        type: 'invite_accepted',
        job_id:jobid,
        message: `Your job "${(inviteData as any)?.job?.title}" has been accepted by a ${user?.user_metadata.full_name}.`,
      },
    ]);
      if (updateError) {
    console.error('Update error:', jbxError?.message);
    return { success: false, error: jbxError?.message };
  }
 } 
  if (response === 'completed') {
       const { error: jbxError } = await supabase
    .from('jobs')
    .update({status: 'completed' })
    .eq('id', jobid); 
 } 
 if (response === 'cancelled') {
   await supabase.from('jobs')
       .update([{ status: 'open'}])
       .eq('id', jobid);
      const { error: updateError } = await supabase
    .from('invitations')
    .update({ status: response, updated_at:new Date() })
    .eq('id', invitingId)
    .select()
 
  }
 if (response === 'rejected') {
    await supabase.from('jobs')
       .update([{ status: 'open'}])
       .eq('id', jobid);
    await supabase.from('notifications').insert([
      {
        poster_id:invitingId,
        type: 'invite_rejected',
        job_id:jobid,
        message: `"${user?.user_metadata.full_name}" rejected your job ${(inviteData as any)?.job?.title}.`,
      },
    ]);
  }

  revalidatePath('/dashboard'); 
  return { success: true };
  
}

