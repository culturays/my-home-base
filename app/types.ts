export type ProfileProps = {
stripe_customer_id:string 
id:string|number
full_name:string
email:string
last_payment_amount:number
last_payment_date:Date
jobs_posted:number
total_paid: number
created_at:Date
banned:boolean
active:boolean
user_img:string
address:string
avatar_url:string
bio:string
location:string
pending_payments:string
reviews:string[]
role:string
profileItems:RolesProps
};
export type RolesProps={
  id:number
role:string
active:boolean
user_id:string|number
profileByRole:ProfileProps
}
export type NotifyProps={
  id:string|number
  message:string  
  user_id: string;
  created_at: string;
  job_id: number
}
export type InviteProps={
 status: 'pending' | 'accepted' | 'rejected' | 'interest'; 
  invited_at: string; 
id:number|string
user_id:string|number
interest_id:string|number
client_id:string|number
   job: {
    title: string;
    description: string;
  };
  client: {
    full_name: string;
  };
}
export type JobsProps = {
 status: string
};
export type ErrandStats={
  total_spent:number
  jobs_completed:number
pending_payments:number
}
export type ReviewsProps = {
providerName:string
job_title:string
rating:number
message:string
  id:number|string
};
export type MembersProps = {
  role:string
  email:string
  id:number|string
  full_name:string
  jobs: []
 payments: []
};
export type PaymentProps = {  
  id:number|string
  amount:number
  total:number 
 created_at:Date
 email:string
 job_id:string|number
 status:string
  last_payment_amount:number
  last_payment_date:Date
   user_id:number|string
};
export type ErrandProps={
email:string
title: string
description: string
images:string[]
id:number|string
related:string[]
location:string
slug:string
user_id:string
accepted_by: number
assigned:string
status: string
date:Date
deadline:Date
category:string
contact:number
cost:number
amount:number
errandType:string
clientIs:{id:string|number, interest_id:string|number}
interestedParty:{id:string|number }
providerJobs:{id:string|number}
payment_status:string 
}