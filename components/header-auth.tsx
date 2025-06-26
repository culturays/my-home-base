 
import Link from "next/link";  
import HeaderDrop from "./HeaderDrop"; 
import { signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { Button } from "./ui/button";
export default async function AuthButton() { 
 const supabase = await createClient() 
         const { 
            data: { user }, 
     } = await supabase.auth.getUser(); 
 
  return user ? (
    <div className="flex gap-4"> 
        <h2 className="w-20 xs:w-full text-ellipsis overflow-hidden">Hey, {user?.email}!</h2> 
      <HeaderDrop/> 
       
   </div>
  ) 
  
  : (
    <div className="flex gap-2">
              <Button asChild size="sm" variant={"outline"} className="dark:text-white text-teal-300 font-medium">
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm"className="bg-orange-400 dark:text-white">
        <Link href="/sign-up">Sign up</Link>
      </Button> 
    </div>
  );
 }
