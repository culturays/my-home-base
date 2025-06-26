import Link from 'next/link'
import { headers } from 'next/headers'
 
export default async function NotFound() {
  const headersList = await headers()
  const domain = headersList.get('host')
 // const data = await getSiteData(domain)
  return (
    <div className='text-center'>
    {/* //  <h2>Not Found: {data.name}</h2> */}
      <p className="text-2xl font-bold text-orange-600">Could not find requested resource</p>
      <p className="text-xl font-bold text-teal-600 px-3 hover:bg-gray-500 hover:text-gray-100">
       Go <Link href="/">Home</Link>
      </p>
    </div>
  )
}


 