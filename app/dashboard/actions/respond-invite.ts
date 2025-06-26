// app/actions/respond-invite.ts
'use server';

import { ErrandProps } from '@/app/types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function respondToJobs({
  invitingId,
  response,
  job
}: {
  invitingId: string|number;
  response: 'accepted' | 'rejected' | 'interest' | 'completed' | 'cancelled';
 job: ErrandProps 
}) {
 
  const supabase =await createClient();
   const {
    data: { user }
  } = await supabase.auth.getUser()  
    if(response==='interest'){
   const { error: insertError } = await supabase
    .from('invitations')
    .insert({ status: response, job_id:job.id, interest_id:user?.id, provider_id:user?.id , client_id:job.user_id, user_id:user?.id}) 
    .select()
   await supabase.from('notifications').insert([
      {
        poster_id: job.user_id,
        type: 'interest_recieved',
        job_id:job.id,
        message: `"${user?.user_metadata.full_name}" showed interest in your job ${job.title}.`,
        receiver_id: job.user_id
      },
    ]);
       await supabase.from('jobs')
       .update([{ status: 'interest', interests:[user?.id]}])
       .eq('id', job.id);
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
    .eq('id', job.id);
    
    await supabase.from('notifications').insert([
      {
        poster_id: job.user_id,
        type: 'invite_accepted',
        job_id:job.id,
        message: `Your job "${(inviteData as any)?.job?.title}" has been accepted by a ${user?.user_metadata.full_name}.`,
        receiver_id: job.user_id,
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
    .update({status: 'completed', interests:[] })
    .eq('id', job.id); 
     await supabase.from('notifications').insert([
      {
        poster_id: job.user_id,
        type: 'task_completed',
        job_id:job.id,
        message: `Your job "${(inviteData as any)?.job?.title}" has been completed by a ${user?.user_metadata.full_name}.`,
        receiver_id: job.user_id,
      },
    ]);
 } 
 if (response === 'cancelled') {
   await supabase.from('jobs')
       .update([{ status: 'open'}])
       .eq('id', job.id);
      const { error: updateError } = await supabase
    .from('invitations')
    .update({ status: response, updated_at:new Date() })
    .eq('id', invitingId)
    .select()
  await supabase.from('notifications').insert([
      {
        poster_id: job.user_id,
        type: 'invite_accepted',
        job_id:job.id,
        message: `Request for "${(inviteData as any)?.job?.title}" was cancelled`,
        receiver_id: job.user_id,
      },
    ]);
  }
 if (response === 'rejected') {
    await supabase.from('jobs')
       .update([{ status: 'open', interests:[]}])
       .eq('id', job.id);
    await supabase.from('notifications').insert([
      {
        poster_id:job.user_id,
        type: 'invite_rejected',
        job_id:job.id,
        message: `Request for "${(inviteData as any)?.job?.title}" was rejected`,
        receiver_id: job.user_id
      },
    ]);
  }

  revalidatePath('/dashboard/'); 
  return { success: true };
  
}

