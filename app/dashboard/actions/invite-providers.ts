'use server';
import { ErrandProps, RolesProps } from '@/app/types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getProviderIv(){
   const supabase =await createClient(); 
   const { 
      data: { user }, 
      } = await supabase.auth.getUser();
 const { data: accepted } = await supabase
  .from('invitations')
  .select('*, job:jobs(title)')
  .eq('provider_id', user?.id)
  .neq('status', 'pending');
}
export async function inviteProvider({ invitationId, jobId, providerId, clientId }: {
  invitationId: string|number;
  jobId:ErrandProps;
  providerId: string|number;
  clientId: string|number;
}) {
  const supabase =await createClient(); 
  if(providerId===0){
 await supabase.from('jobs')
       .update([{ status: 'open'}])
       .eq('id', jobId.id);
      const { error: updateError } = await supabase
    .from('invitations')
    .delete()
    .eq('id', invitationId)
    .select()
    return {success: 'Removed'}
  }
 
// Get invite info
const { data: inviteData, error:x } = await supabase
.from('invitations')
.select('provider_id, client_id, job_id, job:jobs(title)')
.eq('id', invitationId)
.single();

if (inviteData) { 
const { error: updateError } = await supabase
.from('invitations')
.update({ status: 'pending', provider_id:providerId, updated_at:new Date() })
.eq('id', invitationId)
.select()

const {data, error: jError } = await supabase
.from('jobs')
.update({ status: 'pending' })
.eq('id', inviteData.job_id)
.select()
    await supabase.from('notifications').insert([
      {
        poster_id: clientId,
        type: 'invite_sent',
        job_id:jobId.id,
        message: `You have been invited to work on ${jobId.title}.`,
        receiver_id:providerId
      },
    ]);
  }else{
    const { error } = await supabase.from('invitations').insert([
    {
      job_id: jobId.id,
      provider_id: providerId,
      client_id: clientId,
      status: 'pending',
      updated_at:new Date()
    },
  ]);
  const {data, error: jError } = await supabase
.from('jobs')
.update({ status: 'pending' })
.eq('id', jobId.id)
.select()
    await supabase.from('notifications').insert([
      {
        poster_id: clientId,
        type: 'invite_sent',
        job_id:jobId.id,
        message: `You have been invited to work on ${jobId.title}.`,
        receiver_id:providerId
      },
    ]);
  if (error) {
    console.error('Error inviting provider:', error.message);
    return { success: false, error: error.message };
  }
  } 
  revalidatePath('/dashboard/'); 
  return { success: true };
}
export async function providerIvs(){
  const supabase =await createClient();
   const { 
      data: { user }, 
      } = await supabase.auth.getUser();
const { data: invites } = await supabase
  .from('invitations')
  .select('id, status, invited_at, job:jobs(title, description), client:profiles(full_name)')
  .eq('provider_id', user?.id)
  .eq('status', 'pending');  
  return invites ??[]
}

export async function receivedInterestsToJobs(){
  const supabase =await createClient();
   const { 
      data: { user }, 
      } = await supabase.auth.getUser(); 
//, interestedParty:profiles!invitations_job_id_fkey(*)
const { data: invitedAs, error } = await supabase
  .from('invitations')
  .select('*, clientIs:jobs!invitations_job_id_fkey(*), interestedParty:profiles!invitations_provider_id_fkey(*)') 
  .eq('client_id', user?.id) 
  .in('status', ['interest']) 
  return invitedAs ??[]
}
 
 export const invitedTo=async()=>{ 
   const supabase=await createClient()
     const {
    data: { user }
  } = await supabase.auth.getUser()  

   const { data:  invites} = await supabase
  .from('invitations')
  .select('job_id')
  .eq('provider_id', user?.id) 

 const invitex = invites?.map((xy)=> xy.job_id)  
  const { data: invitedAs, error:e } = await supabase
  .from('invitations')
  .select('*, providerJobs:jobs!invitations_job_id_fkey(*)') 
  .eq('provider_id', user?.id) 
  .in('job_id', invitex??[]) 
  .in('status', ['accepted', 'pending' , 'interest']) 
 return invitedAs ??[]
}
 
export const fetchProviderView=async(p:RolesProps )=>{ 
  const supabase=await createClient()  
   
  if(p.role==='client'){
      const { data:changeView, error:x} = await supabase
  .from('roles')
  .update([{active: true, role:'provider' }])
  .eq('id', p.id)  
        const { data:pView, error:xe} = await supabase
  .from('profiles')
  .update([{ role:'provider' }])
  .eq('id', p.user_id) 
  //  const { data:falseView, error} = await supabase
  // .from('roles')
  // .update([{active: true}])
  // .eq('user_id', p.profileByRole.id)  
  // .neq('id', p.id) 
  // .neq('role', p.role)  
  }else{
        const { data:changeView, error:x} = await supabase
  .from('roles')
  .update([{active: true, role:'client' }])
  .eq('id', p.id)  
        const { data:pView, error:xe} = await supabase
  .from('profiles')
  .update([{ role:'client' }])
  .eq('id', p.user_id) 
  } 
 
 }
 
// const { data: invites } = await supabase
//   .from('invitations')
//   .select('*, provider:profiles(*)')
//   .eq('job_id', job.id);
