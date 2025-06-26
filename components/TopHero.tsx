'use client'

const TopHero = () => {
  return ( 
    <div>
       <section className="relative"> 
        <video width="320" height="240"  
          className="w-full h-[550px] object-cover"
          controls
          autoPlay={true}
          loop>
  <source src="/nuttis-errands-short.mp4" type="video/mp4"/>
  <source src="/nuttis-errands-short.mp4" type="video/mp4"/>
 </video>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
          <h1 className="text-5xl font-bold">Keep it Going...</h1>
          <p className="mt-4 text-lg">
            Luxury Services for Busy Clients.
          </p>
        </div>
      </section>
    </div>
  )
}

export default TopHero
