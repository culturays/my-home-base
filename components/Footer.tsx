'use client'

import Link from 'next/link' 
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { ThemeSwitcher } from './theme-switcher'

export default function Footer() {
  return (
    <footer className="w-full bg-teal-700 text-white border-t py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Column 1 */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/privacy-policy" className="text-orange-300 hover:text-orange-400">
            Privacy Policy
          </Link>
         
        </div>

        {/* Column 2 */}
        <div className="text-center flex flex-col items-center justify-center">
          <p className="text-xs">&copy; {new Date().getFullYear()} E Market. All rights reserved.</p>
          <ThemeSwitcher />
        </div>

        {/* Column 3 */}
        <div className="flex flex-col items-center md:items-end">
          <p className="mb-2 text-orange-300 font-medium">Follow us</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-400" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-orange-400" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-orange-400" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
     
    </footer>
  )
}

 