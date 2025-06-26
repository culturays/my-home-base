 
import { createClient } from "@/utils/supabase/server";
import Image from "next/image"
import { userObjX } from "../dashboard/actions/create";

const AboutPage = async () => {
  const roleData = async ()=>{
  const supabase =await createClient();
  const user = await userObjX()
  const { data: userRole } = await supabase
    .from('roles')
    .select('*, profileItems:profiles!roles_user_id_fkey(*)')
    .eq('user_id', user.id)
    .single()

    return userRole
}
const userAdminRoles= await roleData()
const [full_name]= userAdminRoles
  return (
    <> 
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>

      <p className="mb-6">
        Our platform connects people with trusted providers who can handle their everyday errands — from deliveries and cleaning to outdoor tasks and miscellaneous jobs. In a country where many struggle to find employment due to lack of formal education, this service opens a path for individuals to earn income by offering simple but essential help within their communities.
      </p>

      <p className="mb-6">
        By bridging the gap between those in need of assistance and those available to assist, we foster community, independence, and income generation. Our mission is to empower the unskilled workforce with digital tools that make their services accessible, visible, and valued.
      </p>

      <div className="my-10">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p>
          To create sustainable job opportunities for everyday Nigerians by making local errand tasks visible and accessible online. We aim to reduce unemployment and promote dignity in work — regardless of educational background.
        </p>
      </div>

      <div className="my-12">
        <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
     
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <Image src="/popcorn.png" alt="Team Member 1" width={150} height={150} className="mx-auto rounded-full" />
            <p className="font-bold mt-2">{full_name}</p>
            <p className="text-sm ">Operations Lead</p>
          </div>    
       
        </div> 
      </div>

      <div className="my-12">
        <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
        <div className="space-y-6">
          <blockquote className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <p className="italic"></p>
            <footer className="mt-2 text-right font-semibold dark:bg-gray-700">— </footer>
          </blockquote>
          <blockquote className="bg-gray-100 p-4 rounded shadow dark:bg-gray-700">
            <p className="italic"> </p>
            <footer className="mt-2 text-right font-semibold dark:bg-gray-700">— </footer>
          </blockquote>
        </div>
      </div>
    </div> 
 </> )
}

export default AboutPage
