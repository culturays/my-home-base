"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

  export const selectRole = async (formData:FormData) => {
     const supabase = await createClient()
      const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
 
    const role = formData.get('role')
    const address = formData.get('address')   
    if(role)
    try{
     await supabase.from('profiles').update({ role , address }).eq('id', user.id);
   
  }
  catch(err){
    console.log(err)
  }
  if (role === 'admin' ||user?.email=== 'ngene.christina@gmail.com'){ 
    redirect('/dashboard/admin') 
  } 
  const { data: invite } = await supabase
  .from('admin_invites')
  .select('*')
  .eq('email', user.email)
  .single();

if (invite) {
  await supabase.from('profiles').update({ role: 'admin' }).eq('id', user.id);
  await supabase.from('admin_invites').delete().eq('email', user.email);
}

  return redirect('/dashboard')
  };
 