 
import RoleSelectorModal from "@/components/RoleSelectorModal";
import { createClient } from "@/utils/supabase/server"; 
import { redirect } from "next/navigation"; 
import { fetchProviderView } from "../dashboard/actions/invite-providers";

export default async function ProtectedPage() {
  const userSession= async ()=>{
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in/");
  }
  return user
}

const user = await userSession() 
 const checkRole = async () => {
     if (!user) {
      return
    }
    const supabase =await createClient() 
  const { data: profile } = await supabase
        .from('profiles') 
        .select('role, address')
        .eq('id', user?.id)
        .single();      

 if (profile?.role === 'provider'|| profile?.role === 'client'){
    const {error:xe} = await supabase.from('roles').update({ active:true }).eq('user_id', user?.id)
    redirect('/dashboard/')
  }  
  
  if (!profile?.role&&profile?.role==='none'||!profile?.role&&user?.email=== 'ngene.christina@gmail.com' ){ 
    redirect('/dashboard/admin/')
  }  
   if (profile?.role === 'admin'){ 
    redirect('/dashboard/admin/')
  } 

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        email: user.email,
        full_name: user.user_metadata.full_name || user.user_metadata.name,
        avatar_url: user.user_metadata.avatar_url,
        
      });
    return profile
    };

const profile = await checkRole() 
 if (!user.id) return <p className="p-4">Loading...</p>;
  
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
    Protected Route
   <div>
      {!profile?.role&&user?.email!== 'ngene.christina@gmail.com'?<RoleSelectorModal profile={profile?.address} /> :<></> }
    </div> 
    </div>
  );
}

 
 
