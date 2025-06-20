import { createClient } from "@/utils/supabase/server";
import Image from "next/image"
import { ProfileProps } from "../types";

const AboutPage = async () => {
  const roleData = async ()=>{
  const supabase =await createClient();
  const { data: userRole } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'admin')
    .single()

    return userRole
}
const userAdminRoles= await roleData()
  return (
    <> 
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">About Us</h1>

      <p className="text-gray-700 mb-6">
        Our platform connects people in Nigeria with trusted providers who can handle their everyday errands — from deliveries and cleaning to outdoor tasks and miscellaneous jobs. In a country where many struggle to find employment due to lack of formal education, this service opens a path for individuals to earn income by offering simple but essential help within their communities.
      </p>

      <p className="text-gray-700 mb-6">
        By bridging the gap between those in need of assistance and those available to assist, we foster community, independence, and income generation. Our mission is to empower the unskilled workforce with digital tools that make their services accessible, visible, and valued.
      </p>

      <div className="my-10">
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">Our Mission</h2>
        <p className="text-gray-700">
          To create sustainable job opportunities for everyday Nigerians by making local errand tasks visible and accessible online. We aim to reduce unemployment and promote dignity in work — regardless of educational background.
        </p>
      </div>

      <div className="my-12">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Meet the Team</h2>
     
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <Image src="/popcorn.png" alt="Team Member 1" width={150} height={150} className="mx-auto rounded-full" />
            <p className="font-bold mt-2">{userAdminRoles?.full_name}</p>
            <p className="text-sm text-gray-500">Operations Lead</p>
          </div>    
       
        </div> 
      </div>

      <div className="my-12">
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">Testimonials</h2>
        <div className="space-y-6">
          <blockquote className="bg-gray-100 p-4 rounded shadow">
            <p className="italic">text</p>
            <footer className="mt-2 text-right font-semibold">— </footer>
          </blockquote>
          <blockquote className="bg-gray-100 p-4 rounded shadow">
            <p className="italic">text </p>
            <footer className="mt-2 text-right font-semibold">— </footer>
          </blockquote>
        </div>
      </div>
    </div> 
 </> )
}

export default AboutPage
