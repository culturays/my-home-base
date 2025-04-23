 
import Hero from "../components/Hero";
import Image from "next/image";
import Link from "next/link";
 
 const Home= async() =>{
  return (
    <>
 <div className="min-h-screen">   
   
   <Hero /> 
      {/* Featured Sections */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow text-black">
            <h3 className="text-2xl font-bold mb-4">Home/Office/Family Chores</h3>
            <p>
            Juggling work and family is tough. From school pickups to shopping for the kids, free up your time for what matters most.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow text-black">
            <h3 className="text-2xl font-bold mb-4">Pick Ups/Drop Offs/Pet care</h3>
            <p>
            Avoid missing important deliveries or rushing to the pickup point. Let someone handle the wait or fetch items on your behalf.

            Your pets need care too! Book helpers for walks, grooming, vet visits, and supply runs—so your furry friends stay happy.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow text-black">
            <h3 className="text-2xl font-bold mb-4">Groceries, Shopping & Essentials</h3>
            <p>
            Running out of time to buy groceries, toiletries, or household goods? Let someone handle the store runs and supply pickups for you.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow text-black">
            <h3 className="text-2xl font-bold mb-4">Home & Maintenance</h3>
            <p>
            Busy schedule making home chores impossible? From cleaning to handyman visits, keep your home running smoothly without lifting a finger.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow text-black">
            <h3 className="text-2xl font-bold mb-4">Administrative & Paperwork/Professional Tasks</h3>
            <p>
            Need help with work-related errands? Get support with document runs, printing, office supply pickups, or remote work setups.
            </p>
            <p>Skip the long queues at banks and offices. Get help with paperwork, payments, and in-person tasks that take up your workday.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow text-black">
            <h3 className="text-2xl font-bold mb-4">Car/Gadget Related</h3>
            <p>
            No time for gadget care? Whether it&apos;s an oil change, wash, or registration, let someone else take the wheel on your vehicle tasks.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 py-16 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Save Time?</h2>
          <Link href='https://chat.whatsapp.com/KmcOzsBGSW96QS8aGs1FJ9'><button className="bg-white text-gray-900 px-8 py-3 rounded-full hover:bg-gray-100">
            Contact Us on WhatsApp
          </button></Link>
        </div>
      </section>
    </div>
    </>
  );
}
export default Home