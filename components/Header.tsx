 
import Link from "next/link"
import Navbar from "./NavBar"  
const Header = () => { 
  return (
 <header className="flex px-2 py-3 w-full">  
  <h1><Link href="/" className="text-4xl font-bold text-orange-400">
 GoWork
 </Link></h1> 
  <Navbar />       
 
</header>
  )
}

export default Header
