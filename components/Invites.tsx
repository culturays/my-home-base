"use client"
import { inviteProvider } from "@/app/dashboard/actions/invite-providers";
import { ErrandProps, InviteProps, ProfileProps } from "@/app/types"; 
import Image from "next/image";
import Link from "next/link";

const Invites = ({ product, invitedX, job}:{ product:ProfileProps[], invitedX:InviteProps[], job:ErrandProps}) => { 
   const respondInterests=async(providerId:string|number
)=>{ 
  invitedX?.filter((vx:InviteProps)=> vx.interest_id === providerId).map(async(xy, i)=> {  
  const {success, error}= await inviteProvider({invitationId:xy.id, jobId:job, providerId, clientId:xy?.client_id }); 
 
  }
  ) 
 
}
  
  return (
      <div>
       <h2 className='text-2xl underline dark:text-gray-300 font-bold'>This task has gotten {product?.length} interest(s)</h2>
      {product?.map((xy, ix)=>       
         <div key={xy.id} className='flex'> 
          {xy?.user_img&&xy?.user_img[0]&&<div className="overflow-hidden shadow-lg">
       <Image
       src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/files/${xy?.user_img[0]}`}
       alt={xy.full_name}
       width={100}
       height={80}
       className="rounded-xl py-3"
       />
     </div> 
     }
     <ul className='mx-8'>
         <Link href={`/profile/${xy.id}`}><li className='list-disc text-xl text-teal-600 font-bold py-8'>{xy.full_name} </li></Link></ul>  
   <button type="button" disabled={job.status==='pending'||job.status==='in progress'} onClick={()=>respondInterests(xy.id)} className='mx-2 text-sm font-bold cursor-pointer hover:text-gray-300 text-green-600 disabled:opacity-60'>
    { job.status==='in progress'?'In Progress':'Approve' }</button> 
       <button type="button" disabled={ job.status!=='pending'} onClick={()=>respondInterests(0)} className='mx-2 text-sm text-red-600 font-bold cursor-pointer hover:text-gray-300 disabled:opacity-60'>
       Remove</button>
     
     </div> )}
     </div>
   
  )
}

export default Invites
