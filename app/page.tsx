import TopHero from "../components/TopHero"; 
import Link from "next/link"; 
 function HomePage() {
  return (
    <div className="text-gray-800 my-10"> 
      <section className="bg-teal-800 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Service Marketplace</h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Connect with trusted service providers near you — fast, reliable, and secure.
        </p>
        <div className="space-4 xs:flex justify-center">
         <p className="bg-orange-500 m-2 px-6 py-3 rounded-lg text-white font-semibold shadow hover:bg-orange-600"><Link href="/services/">
            Browse Services
          </Link></p>
        <p className="border border-white m-2 px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600"><Link href="/dashboard/create/">
            Post a Request
          </Link></p> 
        </div>
      </section>
 
      <section className="py-16 px-6 mx-auto">
        <h2 className="text-3xl font-bold text-teal-700 mb-8 text-center dark:text-white">Catalogue</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
           
            { icon: '💻', title: 'Home/Office/Family Chores', desc: 'Juggling work and family is tough. From school pickups to shopping for the kids, free up your time for what matters most.' },
            { icon: '💻', title: 'Groceries, Shopping & Essentials', desc: 'Running out of time to buy groceries, toiletries, or household goods? Let someone handle the store runs and supply pickups for you.' }, 
            { icon: '💻', title: 'Home & Maintenance', desc: 'Busy schedule making home chores impossible? From cleaning to handyman visits, keep your home running smoothly without lifting a finger.' },
             { icon: '🧹', title: 'Cleaning', desc: 'Book trusted cleaners near you.' },
            { icon: '🚚', title: 'Delivery', desc: 'Errand and parcel delivery on demand.' },
            { icon: '💻', title: 'Freelance Tech', desc: 'Web dev, design, IT & more.' },
            { icon: '💻', title: 'Car/Gadget Related', desc: "No time for gadget care? Whether it's an oil change, wash, or registration, let someone else take the wheel on your vehicle tasks."},
            { icon: '💻', title: 'Administrative & Paperwork/Professional Tasks', desc: 'Need help with work-related errands? Get support with document runs, printing, office supply pickups, or remote work setups.\nSkip the long queues at banks and offices. Get help with paperwork, payments, and in-person tasks that take up your workday.' },
            { icon: '💻', title: 'Pick Ups/Drop Offs/Pet care', desc: 'Avoid missing important deliveries or rushing to the pickup point. Let someone handle the wait or fetch items on your behalf.\nYour pets need care too! Book helpers for walks, grooming, vet visits, and supply runs—so your furry friends stay happy.' },
          ].map((service, i) => (
            <div key={i} className="p-6 rounded-xl shadow">
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="text-lg font-bold text-orange-600">{service.title}</h3>
              <p className="my-2 whitespace-pre-line dark:text-white">{service.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="/services" className="text-teal-600 font-medium hover:underline">
            View All Services →
          </a>
        </div>
      </section>
    </div>
  )
}

 const Home= async() =>{ 
  return (
    <>
 <div className="min-h-screen">
   <TopHero /> 
   <HomePage/>    
      <section className="bg-teal-800 py-16 text-white">
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