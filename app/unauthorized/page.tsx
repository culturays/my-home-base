import Link from "next/link"

// pages/unauthorized.js
const Unauthorized=async({searchParams}: {
   searchParams: Promise<{ message: string }>} )=> {
    const {message}= await searchParams
  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold text-orange-600">{message}</h1>
      <p className="text-2xl font-bold text-orange-600">You do not have permission to view this page.</p>
      <Link href='/'className="text-xl font-bold text-teal-600 px-3 hover:bg-gray-500 hover:text-gray-100"><button>Go Home</button></Link>
    </div>
  )
}
export default Unauthorized