import { createClient } from "@/utils/supabase/server"

export const returnProducts=async()=>{
  const supabase=await createClient()
  const { data: listedE, error } = await supabase
  .from('listed-e')
  .select('*')
return listedE??[]
}
export const returnProduct=async(params:string)=>{
  const supabase=await createClient()
  const { data: listedX, error } = await supabase
  .from('listed-e')
  .select('*') 
  .eq('slug', params)
 .single() 
return listedX??[]
}
export const relatedProduct=async(loc:string, id:number)=>{
  const supabase=await createClient()
  const { data: listedX, error } = await supabase
  .from('listed-e')
  .select('*') 
  .eq('loc', loc)
  .neq('id', id)
 .select() 
return listedX??[]
}
export const getMyErrands=async(user_id:string)=>{ 
  "use server"
 
  const supabase=await createClient()
  const { data: listedX, error } = await supabase
  .from('selectedEs')
 .select('*') 
 .eq('user_id', user_id)
 .select()
 return listedX??[]
}