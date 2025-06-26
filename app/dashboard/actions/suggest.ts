"use server"
// utils/suggestProviders.ts
import { createClient } from "@/utils/supabase/server";

export async function suggestXProviders(inViteTo:string) {
  const supabase =await createClient();
    const { data:x, error } = await supabase
    .from("jobs")
    .select("location") 
    .eq("location", inViteTo)
     
  if (error || !x) return [];
const px = x.map((dy)=> dy.location)
 
const { data, error:y } = await supabase
    .from("roles")
    .select("*, profileByRole:profiles(*)")
    .range(0,5)
    .eq("role", "provider")
   
   if (y||!x ) return [];

  const suggestions = data.filter(provider => {
    const locs = Array.isArray(provider.location)
      ? provider.location
      : (provider.location ?? "") 

    return px.some(tag =>
      locs.includes(tag.toLowerCase())
    );
  });

  return suggestions;
}
  export const jobsByState = async (sortField:string, sortDir:string, page:number, pageSize:number, stateFilter:string ) => {
// filter by Date joined range
// filter by  Payment thresholds (e.g., clients who paid greater than $500)
    const supabase =await createClient()
                const {
    data: { user }
  } = await supabase.auth.getUser() 
    let query = supabase
      .from('jobs')
      .select('*', { count: 'exact' }) 
      .eq('user_id', user?.id)
      .order(sortField, { ascending: sortDir === 'asc' })
      .range((page - 1) * pageSize, page * pageSize - 1);
 
 if (stateFilter) {
      query = query.ilike('location', `%${stateFilter}%`);
    }
 
  const { data, count, error } = await query;
 
    if (error) {
      console.error(error);
    } 
    return { data , count }
  };
  
  export const jobsByDate = async (sortField:string, sortDir:string, page:number, pageSize:number ) => {
 
    const supabase =await createClient()
    const {
    data: { user }
  } = await supabase.auth.getUser()     
    let query = supabase
      .from('jobs')
      .select('*', { count: 'exact' }) 
      .eq('user_id', user?.id)
      .order(sortField, { ascending: sortDir === 'desc' })
      .range((page - 1) * pageSize, page * pageSize - 1);

 
  const { data, count, error } = await query;
 
    if (error) {
      console.error(error);
    } 
    return { data , count }
  };
 export const categoriesJobs = async (sortField:string, sortDir:string, page:number, search:string, pageSize:number, categoryFilter:string ) => {
// filter by Date joined range
// filter by  Payment thresholds (e.g., clients who paid greater than $500)
    const supabase =await createClient()
    const {
    data: { user }
  } = await supabase.auth.getUser() 
    let query = supabase
      .from('jobs')
      .select('*', { count: 'exact' })
       .eq('assigned', false)
        .eq('user_id', user?.id)
      .order(sortField, { ascending: sortDir === 'asc' })
      .range((page - 1) * pageSize, page * pageSize - 1);
 
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }
 if (categoryFilter) {
      query = query.ilike('category', `%${categoryFilter}%`);
    }

 
  const { data, count, error } = await query;
 
    if (error) {
      console.error(error);
    } 
    return { data , count }
  };
export async function suggestXJobs(inx:string) {
  
  const supabase =await createClient();
    const { data , error } = await supabase
    .from("jobs")
    .select("*")
    .range(0,3)
    .eq("location", inx)
     
  if (error) return []; 

  return data;
}