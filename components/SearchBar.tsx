'use client'
import { useState } from 'react' 
import { SearchErrandsPage } from '@/app/dashboard/actions/listed-errands'
type SearchProps={

}[]
 const SearchBar=() =>{
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchProps>([])

  const handleSearch = async () => {
    const results =await SearchErrandsPage(query); 
    setResults(results)
  }

  return (
    <div className="p-4">
      <form action={handleSearch}> 
      <input value={query} onChange={e => setQuery(e.target.value)} className="input" />
      <button className="btn" type='submit'>Search</button></form>
       <div>
        {results.map((x: any) =>
        x.title.map((p:any)=>
        (

          <div key={p.id}>{x.title} - {p.desc}</div>
        )))}
      </div>
    </div>
  )
}
export default SearchBar