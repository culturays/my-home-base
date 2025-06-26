'use client'  
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='text-center'>
      <h2 className="text-2xl font-bold text-orange-600">Something went wrong!</h2>
      <button
       className="text-xl font-bold text-teal-600 px-3 hover:bg-gray-500 hover:text-gray-100" onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}