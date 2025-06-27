"use client"
import { ProfileProps } from "@/app/types"
import Image from "next/image"
import { ChevronDown, Menu, X } from 'lucide-react'; 
import { useEffect, useState } from "react";
import Link from "next/link"; 
import { userProfileData, userXObj } from "@/app/profile/actions";
import { signOutAction } from "@/app/actions"; 

const HeaderDrop = () => { 
const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userIdentity, setUserId]= useState<ProfileProps>()
  const userItem = async()=>{ 
     const userId = await userProfileData()
     if(userId){
     setUserId(userId)
    }
   
  }
  useEffect(()=>{
userItem()
  },[])

  return userIdentity?( 
  <div className="relative flex items-center gap-4">          
           <button
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button> 
<div className="absolute right-0 top-10 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg z-50 transition-all duration-200 ease-out origin-top">
 {mobileOpen && (
        <div className="md:hidden bg-teal-600 text-white px-4 pb-4 space-y-3 text-sm font-medium transition-all duration-300 ease-in-out py-4">
          <Link href="/" className="block hover:text-orange-">Home</Link>
          <Link href="/services/" className="block hover:text-orange-300">Services</Link>
          <Link href="/dashboard/" className="block hover:text-orange-300">Dashboard</Link>
          <Link href="/contact/" className="block hover:text-orange-300">Contact</Link>
          <Link href={`/profile/${userIdentity?.id}`} className="block hover:text-orange-300">My Profile</Link>            
             <form action={signOutAction}>
                 <button className="w-full text-left py-2 hover:bg-red-100 text-red-600"> Logout </button>
             </form> 
         
        </div>
      )}</div> 

  <div className="relative hidden md:block">
                <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-14 gap-2 text-sm font-medium hover:text-orange-300"
                >
                 <Image
                src={userIdentity?.avatar_url || 'https://api.dicebear.com/7.x/identicon/svg?seed=user'}
                alt="avatar"
                width={32}
                  height={32}
                  className="rounded-full border-2 border-orange-300"
                /> 
                <ChevronDown size={16} />
              </button> 
              <div
                className={`absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg z-50 transition-all duration-200 ease-out origin-top ${
                  dropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                }`}
              >
                <ul className="py-2 text-sm">
                  <li>
                    <Link href={`/profile/${userIdentity?.id}`} className="block px-4 py-2 hover:bg-teal-100">
                      My Profile
                    </Link>
                  </li>
                  </ul>
                   <form action={signOutAction}>
                 <button className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"> Logout </button>
             </form> 
      </div>  
    </div> 
      </div>       
 
):  <div className="relative flex items-center gap-4">          
           <button
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button> 
<div className="absolute right-0 top-10 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg z-50 transition-all duration-200 ease-out origin-top">
 {mobileOpen && (
        <div className="md:hidden bg-teal-600 text-white px-4 pb-4 space-y-3 text-sm font-medium transition-all duration-300 ease-in-out py-4">
          <Link href="/" className="block hover:text-orange-">Home</Link>
          <Link href="/services/" className="block hover:text-orange-300">Services</Link>
          <Link href="/dashboard/" className="block hover:text-orange-300">Dashboard</Link>
          <Link href="/contact/" className="block hover:text-orange-300">Contact</Link>      
        </div>
      )}</div>  
      </div>  }

export default HeaderDrop
