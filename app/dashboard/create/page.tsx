import { createClient } from '@/utils/supabase/server';
import { type User } from '@supabase/supabase-js' 
import Create from '@/components/Dashboard/Create';
import { returnProduct } from '@/app/products/return-products';
 
const userObj =async()=>{
    const supabase =await createClient();
    const { 
      data: { user }, 
      } = await supabase.auth.getUser();
  
      return user as User
  }
const CreateProduct= async ({searchParams}: {
searchParams: Promise<{ message: string, id: string }>})=> { 
const {message}=await searchParams || ''
const {id}= await searchParams || ''
const user = await userObj();
const jobEdit=await returnProduct(id)
  return (
<><Create message={message} user={user} id={id}jobEdit={jobEdit?.listedX} /> </>
  );
}
export default CreateProduct