import { createClient } from '@/utils/supabase/server';
import { type User } from '@supabase/supabase-js' 
import Create from '@/components/Dashboard/Create';
import { returnProduct } from '@/app/products/return-products';
import { redirect } from 'next/navigation';
 
const userObj =async()=>{
    const supabase =await createClient();
    const { 
      data: { user }, 
      } = await supabase.auth.getUser();
  if(!user)redirect('/sign-in')
      return user as User
  }
const CreateProduct= async ({searchParams}: {
searchParams: Promise<{ message: string, id: string }>})=> { 
const {message}=await searchParams || ''
const {id}= await searchParams || ''
const user = await userObj();
const jobEdit=await returnProduct(id)
  return user? (
<><Create message={message} user={user} id={id}jobEdit={jobEdit?.listedX} /> </>
  ):<></>;
}
export default CreateProduct