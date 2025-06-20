'use client'

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"

const CategoryFilter=() =>{
     const [category, setCategory] = useState('All')
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const fetchListings = async (selectedCategory: string) => {
    setLoading(true)
 const supabase= createClient()
    let query = supabase.from('jobs').select('*').order('created_at', { ascending: false })

    if (selectedCategory !== 'All') {
      query = query.eq('category', selectedCategory)
    }

    const { data, error } = await query 
    if (data) setListings(data)

    setLoading(false)
  }

  useEffect(() => {
    fetchListings(category)
  }, [category])
  const categories = ['All', 'Cleaning', 'Delivery', 'Tech', 'Writing', 'Media']

  return (
    <> 
    <div className="flex flex-wrap gap-3 mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            category === cat
              ? 'bg-teal-600 text-white'
              : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
          }`}
        >
          {cat}
        </button>
      ))}
      
     
    </div>
     {loading ? (
        <p className="text-teal-500">Loading listings...</p>
      ) : listings.length === 0 ? (
        <p className="text-gray-500">No listings found for this category.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 my-11">
          {listings.map((item) => (
            <div key={item.id} className="p-4 bg-white border-l-4 border-orange-500 shadow rounded-xl">
              <h3 className="text-lg font-semibold text-orange-600">{item.title}</h3>
              <p className="text-sm text-gray-600">Category: {item.category}</p>
              <p className="text-sm text-gray-500 mt-1">Status: {item.status}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
export default CategoryFilter 