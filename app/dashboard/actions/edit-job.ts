"use server"
import { createClient } from "@/utils/supabase/server";
import { type User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const userObj =async()=>{
    const supabase =await createClient();
    const { 
      data: { user }, 
      } = await supabase.auth.getUser();
  
      return user as User
  } 
 
 export const handleEdit = async (prevState: {}, formData: FormData, id:string) => {
  const user = await userObj();
    if(!user){
   redirect('/dashboard/create?message=You need to Log in or Sign Up First') 
}
    const supabase=await createClient()
 
    const title= formData.get('title') as string
    const description= formData.get('description') as string
    const location= formData.get('location') as string
     const deadline=formData.get('deadline')
     const date=formData.get('date')
    const contact= formData.get('contact') as string
    const amount= formData.get('amount') as string 
    const files = formData.getAll("files");
    const category =formData.get('errandType') as string
    const status= 'open'
    const assigned=false
    
    const allFiles=[]
    for (let i = 0; i < files.length; i++) {
        const file =files[i]as File ;
      
        if (file) {
          const filePath = `${Date.now()}-${file.name}`;        
          if (file.name && !file.name.includes('undefined')) {
            allFiles.push(filePath.replace(/ /g, "-").trim());
            const { error: uploadError } = await supabase.storage
              .from('files')
              .upload(filePath.replace(/ /g, "-").trim(), file, { upsert: true });
      
            if (uploadError) {
              throw new Error('An error has occurred');
            }
          }  
       
        }
       
        };
const data = {
title ,
description,
user_id:user?.id,
email:user?.email,
images:allFiles,
slug:title.replace(/ /g,"-").trim().toLowerCase(),
related:[location],
location ,
contact ,
deadline,
category,
status,
assigned,
accepted_by:null,
amount,
date 
}; 
if(!amount){ 
return {  message:'Amount is Empty', errors: 'Empty Amount' };
// redirect('/dashboard/create?message=please enter an amount');
}
const { data:prods, error } = await supabase
.from('jobs')
.update(data)
.eq('id', id)
.select()

if (error){ 
console.error(error) 
return { errors: error.message, message:'' }; 
}
  
return redirect('/dashboard');
  };