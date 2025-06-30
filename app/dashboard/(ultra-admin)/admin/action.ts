"use server"
import { ErrandProps, ProfileProps } from "@/app/types";
import { createClient } from "@/utils/supabase/server"; 
import { type User } from "@supabase/supabase-js"; 

  export const sendInvite = async (formData: FormData) => {
    const email= formData.get('email') 
    const supabase = await createClient()
   const {error}= await supabase.from('admin_invites').insert([
    { email}
  ])
  .select()
  
 const response=  await fetch('http://localhost:3000/api/email-admin-invite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  }).then(response=> response.json())
  .then(data=> data);
 
   if(error)console.log(error.message)
  };
 export const markTransaction = async (u:ErrandProps) => {  
     const supabase = await createClient()
     const { 
data: { user }, 
} = await supabase.auth.getUser();
      const {data, error: insertError } = await supabase.from('payments').insert([
      {
      job_id: u.id, 
        email:user?.email,
        amount: u.amount,
        status: 'paid',
        job_title:u.title,
        last_payment_date:new Date(),
        last_payment_amount:u.amount,
        user_id:user?.id
      },
    ]);
   
   const {error}= await supabase.from('jobs') 
      .update({
        amount:u.amount,
        payment_status: 'paid', 
        paid_at: new Date(),
        status: 'completed',
      })
      .eq('id', u.id)
      .select()  
 const { error: profileError } = await supabase
      .from('profiles')
      .update({ 
        jobs_completed:u.id,
      })
      .eq('id', user?.id);  

  };
  export const getIvs = async () => {    
  const supabase = await createClient()
  const { data , error } = await supabase
    .from('admin_invites')
    .select('*')
    .order('created_at', { ascending: false });

     if(error)console.log(error.message)
  return data

  }
   export const handleUpdateStatus = async (id:number|string, status:string) => { 
    const supabase = await createClient()
  await supabase.from('payments').update({ status }).eq('id', id);
return []
  };
export const deleteInvite = async (email: string) => {
   const supabase = await createClient()
 await supabase.from('admin_invites').delete().eq('email', email);
   
  };

 export const updateRole = async (id: string|number, newRole: string, user: User) => {
     const supabase=await createClient()
    await supabase.from('profiles').update({ role: newRole }).eq('id', id);
    await supabase.from('logs').insert([
      {
        admin_id: user.id,
        target_user_id: id,
        new_role: newRole,
        timestamp: new Date().toISOString(),
      },
    ]);
    
  }; 

  export const fetchUsers = async (sortField:string, sortDir:string, page:number, search:string,  pageSize:number, roleFilter:string ) => {
//  filter by Date joined range

// filter by  Payment thresholds (e.g., clients who paid greater than $500)
    const supabase =await createClient()
    let query = supabase
      .from('admin_user_stats')
      .select('*', { count: 'exact' })
      .order(sortField, { ascending: sortDir === 'asc' })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (search) {
      query = query.ilike('email', `%${search}%`);
    }

    if (roleFilter) {
      query = query.eq('role', roleFilter);
    }
 
  const { data, count, error } = await query;

    if (error) {
      console.error(error);
    } 
    return { data , count }
  };
  export const fetchPayments = async (sortField:string, sortDir:string, page:number, search:string,  pageSize:number, roleFilter:string ) => {
//  filter by Date joined range

// filter by  Payment thresholds (e.g., clients who paid greater than $500)
    const supabase =await createClient()
    let query = supabase
      .from('payments')
      .select('*', { count: 'exact' })
      .order(sortField, { ascending: sortDir === 'asc' })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (search) {
      query = query.ilike('email', `%${search}%`);
    }

    if (roleFilter) {
      query = query.eq('role', roleFilter);
    }
 
  const { data, count, error } = await query;

    if (error) {
      console.error(error);
    } 
    return { data , count }
  };

 export const banUser = async (user: ProfileProps) => {
   const supabase =await createClient() 
   if(user.banned=== null||user.banned=== false){
  await supabase.from('profiles').update({ banned: true }).eq('id', user.id)
   await supabase.from('profiles').update({ active: false }).eq('id', user.id)
 
  }else{
    await supabase.from('profiles').update({ banned: false }).eq('id', user.id) 
    await supabase.from('profiles').update({ active: true }).eq('id', user.id)
  
  }

  };

 export const deleteUser = async (id: string|number) => {
  const supabase =await createClient()
  await supabase.from('profiles').delete().eq('id', id);
  
  };
