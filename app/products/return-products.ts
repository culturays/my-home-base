  "use server"
import { createClient } from "@/utils/supabase/server" 
import { ErrandProps, ProfileProps } from "../types"
export const returnUnsassignedProducts=async()=>{
  const supabase=await createClient()
  const { data: listedE, error } = await supabase
  .from('jobs')
  .select('*')
 .eq('assigned', false)
return listedE??[]
}
export const returnProduct=async(params:string)=>{
  const supabase=await createClient() 
//['open','accepted', 'pending' ,'in progress', 'completed']
   const { data: listedX, error } = await supabase
  .from('jobs')
  .select('*') 
  .eq('id', params)
  .single() 
  const { data: p, error:pe } = await supabase
  .from('profiles')
  .select('*')
  .in('id', listedX?.interests)

return {listedX , p } as  { listedX: ErrandProps, p:ProfileProps[]}
}
export const relatedProduct=async(location:string, id:number|string)=>{ 
  const supabase=await createClient()
  const { data: listedX, error } = await supabase
  .from('jobs')
  .select('*')
  .ilike('location', `%${location}%`)
  .neq('id', id)
 
return listedX??[]
}

export const getMyErrands=async(params:string|number)=>{  
  const supabase=await createClient()
    const {
    data: { user }
  } = await supabase.auth.getUser()
  const { data: listedX, error } = await supabase
  .from('jobs')
 .select('*')
 .eq('status', 'pending')
 .eq('user_id', user?.id)
 .neq('id', params)
 return listedX??[]
}

export const postedBy=async( )=>{ 
   const supabase=await createClient()
     const {
    data: { user }
  } = await supabase.auth.getUser() 
  const { data: listedX, error } = await supabase
  .from('jobs')
 .select('*') 
 .eq('user_id',user?.id)
 .neq('status', 'interest')
  
 return listedX??[]
}
 export const postedByNewBatch = async (sortField:string, sortDir:string, page:number, search:string, pageSize:number, locationFilter:string ) => {
// filter by Date joined range
// filter by  Payment thresholds (e.g., clients who paid greater than $500)
    const supabase =await createClient()
       const {
    data: { user }
  } = await supabase.auth.getUser()

    let query = supabase
      .from('jobs')
      .select('*', { count: 'exact' })  
      .in('status', ['open','accepted', 'pending' ,'in progress', 'completed']) 
      .order(sortField, { ascending: sortDir === 'asc' })
      .range((page - 1) * pageSize, page * pageSize - 1);
 
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }
 if (locationFilter) {
      query = query.eq('location', locationFilter);
    }

 
  const { data, count, error } = await query;

    if (error) {
      console.error(error);
    } 
    
    return { data , count }
  };
  
export const providersBrowseAll = async (sortField:string, sortDir:string, page:number, search:string, pageSize:number, locationFilter:string ) => {
// filter by Date joined range
// filter by  Payment thresholds (e.g., clients who paid greater than $500)
    const supabase =await createClient()
       const {
    data: { user }
  } = await supabase.auth.getUser() 
    let query = supabase
      .from('jobs')
      .select('*', { count: 'exact' })
       .in('status',['open','accepted', 'pending' ,'in progress', 'completed'])
       .neq('user_id',user?.id)
      .order(sortField, { ascending: sortDir === 'asc' })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }
 if (locationFilter) {
      query = query.eq('location', locationFilter);
    }

 
  const { data, count, error } = await query;

    if (error) {
      console.error(error);
    } 
    return { data , count }
  };
export const userReviews=async()=>{  
  const supabase=await createClient()
     const {
    data: { user }
  } = await supabase.auth.getUser()  

   const { data: providerRex, error:errorY} = await supabase
  .from('reviews')
  .select('*')
  .range(0,2)
  .eq('provider_id', user?.id) 

   const { data: clientRex, error:errorX } = await supabase
  .from('reviews')
  .select('*')
  .range(0,2) 
  .eq('client_id',user?.id)
 return {clientRex, providerRex} 
}
export const assignedErrands=async()=>{  
 
    const supabase=await createClient()
     const {
    data: { user }
  } = await supabase.auth.getUser() 
  const { data: listedX, error } = await supabase
  .from('jobs')
 .select('*') 
 .eq('user_id', user?.id)

  // .in('job_id',xJobId??[]) .eq('user_id',user_id)
const xlisted = (listedX ?? [])
  .filter((dy) => dy.accepted_by)
  .map((dy) => dy.accepted_by); 
  
   const { data: listedE, error:errorX } = await supabase
  .from('profiles')
  .select('*')
  .in('id', xlisted?? [] )  
  
 return listedE ??[]
}
export const prevClients=async()=>{  
 //NOTE - the user_id here is that of the client not the current user which could be the provider
 const supabase=await createClient()
     const {
    data: { user }
  } = await supabase.auth.getUser() 
  const { data: listedX, error } = await supabase
  .from('jobs')
 .select('*') 
 .eq('accepted_by', user?.id)

  // .in('job_id',xJobId??[]) .eq('user_id',user_id)
const xlisted = (listedX ?? [])
  .filter((dy) => dy.user_id)
  .map((dy) => dy.user_id); 
  
   const { data: listedE, error:errorX } = await supabase
  .from('profiles')
  .select('*')
  .in('id', xlisted?? [] )  
  
 return listedE ??[]
}
export const insertReview=async(rating:number, message:string, identity:string|number, full_name:string )=>{
    const supabase=await createClient()
    const {
    data: { user }
    
  } = await supabase.auth.getUser() 
   const { data: listedX } = await supabase
    .from('jobs')
 .select('*') 
 .eq('user_id', user?.id)
  .eq('accepted_by', identity)
   

  const jobIds=listedX?.map((dx)=>dx.id)
    const jobTitles=listedX?.map((dx)=>dx.title)
  const { data: listedE, error } = await supabase
  .from('reviews')
  .insert([{
rating,
message,
client_id:user?.id,
provider_id :identity , 
providerName: full_name,
job_id:jobIds,
job_title:jobTitles
   }])
   .select()
  return { success: true };  
}


 export const fetchNewBatch = async (sortField:string, sortDir:string, page:number, search:string,  pageSize:number, locationFilter:string ) => {
// filter by Date joined range
// filter by  Payment thresholds (e.g., clients who paid greater than $500)
    const supabase =await createClient()
    let query = supabase
      .from('jobs')
      .select('*', { count: 'exact' })
       .eq('assigned', false)
       
      .order(sortField, { ascending: sortDir === 'asc' })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }
 if (locationFilter) {
      query = query.eq('location', locationFilter);
    }
 
  const { data, count, error } = await query;
    if (error) {
      console.error(error);
    } 
    return { data , count }
  };