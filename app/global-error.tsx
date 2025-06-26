'use client' // Error boundaries must be Client Components
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error must include html and body tags
    <html> 
      <body>
        <h2 className="text-2xl font-bold text-orange-600 text-center">Something went wrong!</h2>
        <button className="text-xl font-bold text-teal-600 px-3 hover:bg-gray-500 hover:text-gray-100  text-center" onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}

 