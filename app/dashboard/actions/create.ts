"use server" 

import { createClient } from "@/utils/supabase/server";
import { type User } from "@supabase/supabase-js";
import { redirect } from "next/navigation"; 
 
export const userObjX =async()=>{
    const supabase =await createClient();
    const { 
      data: { user }, 
      } = await supabase.auth.getUser();
  
      return user as User
  }
 export const handleSubmit = async (prevState: {}, formData: FormData) => {
  const user = await userObjX();
      const supabase=await createClient()

    if(!user){
   redirect('/dashboard/create?message=You need to Log in or Sign Up First') 
}
  const title= formData.get('title') as string
    const description= formData.get('description') as string
    const location= formData.get('location') as string
    const state= formData.get('state') as string
     const deadline=formData.get('deadline')as string
     const date=formData.get('date') as string
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
       
const dateX = new Date(date);
const deadlineX = new Date(deadline);
    if ( deadlineX < dateX ) { 
      return {errors:'Deadline cannot be earlier than the start date.'};
    }
    const data = {
      title ,
      description,
     user_id:user?.id,
     email:user?.email,
images:allFiles,
slug:title.replace(/ /g,"-").trim().toLowerCase(),
related:[location.concat(state)],
location:location + ',' + state,
contact ,
deadline,
category,
status,
assigned,
accepted_by:null,
amount,
date ,
    }; 
    if(!amount){ 
      return {  message:'Amount is Empty', errors: 'Empty Amount' };
     // redirect('/dashboard/create?message=please enter an amount');
    }
    const { data:prods, error } = await supabase
    .from('jobs')
    .insert(data)
    .select()
    if(prods){
     const { data:prof, error:e } = await supabase
    .from('profiles')
    .update([{jobs_posted:prods[0]?.id}])
    .select()}
    if (error){ 
        console.error(error)
    //  console.error(error.message)
        return { errors: error.message, message:'' };
   // redirect('/dashboard/create?message=Not sent. Try Again Later')
    }
    //     await new Promise(resolve => {
    //   setTimeout(resolve, 2000);
    // });
 
 
redirect(`/dashboard/`)
 // res.status(400).send({ message: 'You are not valid for this website.' });
// if(client_id){return redirect(`/dashboard?client_id=${}`)}
// if(provider_id){return redirect(`/dashboard?provider_id=${}`)}
  };