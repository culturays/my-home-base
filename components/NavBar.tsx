'use client' 
import Link from 'next/link'

const Navbar=()=> { 
  return ( 
  <nav className='shadow-2xl max-w-7xl mx-auto px-4 flex justify-between items-center px-4 py-3 flex-wrap'>
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li><Link href="/" className="hover:text-orange-300">Home</Link></li>
          <li><Link href="/services" className="hover:text-orange-300">Services</Link></li>
          <li><Link href="/dashboard" className="hover:text-orange-300">Dashboard</Link></li>
          <li><Link href="/contact" className="hover:text-orange-300">Contact</Link></li>
        </ul> 
 </nav>  
    )
}
export default Navbar 