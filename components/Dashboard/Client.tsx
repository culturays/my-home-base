"use client"
import locations from '@/data/locations.json';
import { ErrandProps, ErrandStats, NotifyProps, ProfileProps, ReviewsProps, RolesProps } from "@/app/types"
import Image from "next/image"
import Link from "next/link" 
import PostReview from "./PostReview"
import { useEffect, useState } from "react"
import ChatBox from "./DisplayMessages"
import { sendMessage } from "@/app/dashboard/actions/send-messages" 
import { getMessages } from "@/app/dashboard/actions/get-messages"
import { categoriesJobs, jobsByDate, jobsByState, suggestXProviders } from "@/app/dashboard/actions/suggest"
import { fetchProviderView, inviteProvider } from "@/app/dashboard/actions/invite-providers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { postedByNewBatch } from "@/app/products/return-products"
import { useRouter } from 'next/navigation';
import { deleteData } from '@/app/dashboard/actions/get-listed-items';
const pageSize = 3; 
const Client = ({reviews, recentProviders, user, clientStats, notices, receivedItx, roles}:{reviews:ReviewsProps[], errands:ErrandProps[], recentProviders:ProfileProps[], user:ProfileProps, clientStats:ErrandStats, notices:NotifyProps[], receivedItx:ErrandProps[], roles:RolesProps }) => {
const [open, setOpen] = useState(false);
const [openId, setOpenId] = useState<string|number>(0);
const [input, setInput] = useState("");
const [messageId, setMessageId]=useState<string|number>('')
const [messages, setMessages] = useState<any[]>([]);
const [job,setJobId]= useState(0)
const [inViteTo,setInViteTo]= useState(0)
const[suggestedProviders, setSuggestedProviders]=useState<ProfileProps[]>([])
const [totalCount, setTotalCount] = useState(0);
const [page, setPage] = useState(1);
const [search, setSearch] = useState('');
const [locationFilter, setLocationFilter] = useState('');
const [categoryFilter, setCategoryFilter] = useState('');
const [stateFilter, setStateFilter] = useState('');
const [dateFilter, setDateFilter] = useState('created_at');
const [sortField, setSortField] = useState('created_at');
const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc'); 
const [openSuggestions, setOpenSuggestions]=useState(false)
const [fetchList, setFetchList] = useState<ErrandProps[]>([]); 
const [successMessage, setSuccessMessage]=useState<Record<string|number, 'idle' | 'pending' | 'success'>>({}) 
  
   const openFxn =(id:string|number)=>{
    setOpenId(id)
    setOpen(true)
   } 
 const getSuggestions =(jobId:number )=>{
    setOpenSuggestions(prev=> !prev)
   setInViteTo(jobId)
  // setProviderIdx(i)
   }  

  const handleSend = async (id:string|number) => { 
    if (!input.trim()) return;
    if (!job) return;
    const { data, error } = await sendMessage(user.id, id, input, job);   
   setJobId(0)
   setInput("");
   setMessageId('')
   
  };
   const sendInvite = async (invitationId: string|number, providerId:string|number, jobId:ErrandProps ) =>{ 
    const findIdx = suggestedProviders.find((dy)=> dy.id ===providerId) 
   const {success, error}=  await inviteProvider({invitationId, jobId , providerId, clientId:user.id }); 
    if (success) {
    setSuccessMessage(prev => ({ ...prev, [providerId]: 'success' }) as Record<string|number, 'idle' | 'pending' | 'success'>);
  } else {
    setSuccessMessage(prev => ({ ...prev, [providerId]: 'idle' }) as Record<string|number, 'idle' | 'pending' | 'success'>);
  }
  router.refresh()
   }
    
 const chatFxn =(id:string|number, jobId:number)=>{
   setMessageId(id)
   setJobId(jobId)
    //handleSend 
   }
  const receiversId = recentProviders.map((dy)=> dy.id)
    useEffect(() => {
    async function loadMessages() {       
      const { data , error} = await getMessages(user.id, messageId, receiversId);
      /// setMessages(recentChats || [])
        if(messageId)
      setMessages(data || []);
    }
    loadMessages();
  }, [user, messageId]);

 useEffect(()=> {
const getProviders=async()=>{
const providersByLocation = await suggestXProviders(user.address)
setSuggestedProviders(providersByLocation)
}
getProviders()
 },[user.address]) 

const router = useRouter()
  const jobOnTable=async()=>{
  const { data, count } = await postedByNewBatch(sortField, sortDir, page, search, pageSize, locationFilter );
  setFetchList(data ??[]);
  setTotalCount(count || 0);
   router.refresh()
  }
   useEffect(() => { 
 jobOnTable()
   }, [page, search, locationFilter, sortField, sortDir ]); 

  const categoryTable=async()=>{ 
   if(categoryFilter){
     const { data, count }  = await categoriesJobs(sortField, sortDir, page, search, pageSize, categoryFilter );
    setFetchList(data ??[]);
  setTotalCount(count || 0);
  }  
 
  }
 
   useEffect(() => { 
 categoryTable()
   }, [page, search, categoryFilter, sortField, sortDir ]);

     const stateTable=async()=>{
      if(stateFilter){
    const { data, count } = await jobsByState(sortField, sortDir, page, pageSize, stateFilter );
  setFetchList(data ??[]);
  setTotalCount(count || 0);
  }

  }
   useEffect(() => { 
 stateTable()
   }, [page, search, stateFilter, sortField, sortDir ]);
    const dateTable=async()=>{ 
     if (sortDir === 'asc') {
       setSortDir( 'desc'  )  
  const { data, count } = await jobsByDate(sortField, sortDir, page, pageSize );
  setFetchList(data ??[]);
  setTotalCount(count || 0);
     } else { 
       setSortDir('asc');
     } 
  }
 
   const totalPages = Math.ceil(totalCount / pageSize);
   const toggleSort = (field: string) => {
     if (sortField === field) {
       setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
     } else {
       setSortField(field);
       setSortDir('asc');
     }
   };
 
 const paidStats = fetchList.filter((xy)=> xy.payment_status ==='paid').map(dy=> dy.id) 
const fetchXview=async()=>{
 await fetchProviderView(roles)
  router.push(`/dashboard/`)
}
 const [viewAll, setViewAll]=useState(false)
 
  return (  
    <>  

<div className="flex flex-wrap gap-4 justify-center">
  <div className="bg-orange-100 text-orange-700 px-4 py-6 rounded-xl w-[400px] min-[700px]:w-[300px] md:w-[350px] min-[900px]:w-[400px] h-24 min-[900px]:h-auto">
    <h3 className="text-sm font-semibold">Total Spent</h3>
    <p className="text-2xl font-bold">${clientStats?.total_spent.toLocaleString()}</p>
  </div>

  <div className="bg-teal-100 text-teal-700 px-4 py-6 rounded-xl w-[400px] min-[700px]:w-[300px] md:w-[350px] min-[900px]:w-[400px] h-24 min-[900px]:h-auto">
    <h3 className="text-sm font-semibold">Jobs Completed</h3>
    <p className="text-2xl font-bold">{clientStats?.jobs_completed}</p>
  </div>

  <div className="bg-yellow-100 text-yellow-700 px-4 py-6 rounded-xl w-[400px] h-24 min-[1268px]:h-auto">
    <Link href="/create-payments">
      <h3 className="text-sm font-semibold hover:text-gray-400">Pending Payments</h3>
    </Link>
    <p className="text-2xl font-bold">{clientStats?.pending_payments}</p>
  </div>
</div>
 
 <div className="flex justify-end items-right my-6 mx-24">
        <Link
          href="/dashboard/create"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl shadow-sm transition"
        >
          + Post New Errand
        </Link>      
</div>
<div className='max-w-xl xxs:px-16 px-32 sm:max-w-2xl md:max-w-3xl min-[800px]:max-w-4xl min-[1000px]:max-w-5xl min-[1200px]:max-w-6xl min-[1200px]:px-0 2xl:max-w-full'> 

 <div>
  <h2 className="text-xl font-bold mb-4 text-teal-800 dark:text-gray-300">Your Reviews</h2>
  <div className="space-y-4 flex">
    {reviews.map((review) => (
      <div key={review.id} className="bg-white p-4 border rounded shadow-sm max-w-96">
        <p className="text-gray-700">You rated <strong>{review.providerName}</strong> for <em>{review.job_title?.length>0 &&review.job_title[0]}</em></p>
   
   <div className="flex">  
  {[1, 2, 3, 4, 5].map((star) => (
  <p
    key={star}
    className={`text-2xl  ${
      star <= review.rating ? 'text-yellow-500' : 'text-gray-300'
    }`}
  >
    {star <= review.rating ? '★' : '☆'}
  </p>
))}  </div> 
      <p className="text-sm text-gray-500 mt-1">{review.message}</p>
      </div>
    ))}
  </div> 
</div>

 <div className="flex flex-col min-[1200px]:flex-row gap-2 bg-teal-50 p-4">
    {/* Sidebar Filters */}
 { !viewAll&&
  <aside className="bg-white shadow-lg rounded-xl p-6 w-80 2xl:w-1/4 m-auto">
      <h2 className="text-xl font-bold text-teal-700 mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-6 max-w-md mx-auto mt-10 bg-white">
        <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
          Category:
        </label>
         
        <select
          id="category"
          className="w-full border border-teal-300 rounded px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white" 
         value={categoryFilter}
          onChange={(e) => {
            setPage(1); 
              setCategoryFilter(e.target.value)
              
          }} >  
 <optgroup label="" > 
  <option value=""></option>
<option value="cleaning">Cleaning</option>
<option value="Washing Clothes">Washing clothes</option> 
<option value="Drying and folding laundry">Drying and folding laundry</option>
<option value="Ironing clothes">Ironing clothes</option>
<option value="Changing bed linens">Changing bed linens</option>
<option value="Washing curtains or rugs">Washing curtains or rugs</option>
</optgroup>
 
    <optgroup label="🏠 Household - Indoors">
      <option value="sweeping">Sweeping/Mopping Floors</option>
      <option value="vacuuming">Vacuuming Carpets</option>
      <option value="dusting">Dusting Surfaces</option>
      <option value="cleaning_bathroom">Cleaning Bathrooms</option>
     <option value="cleaning_bathroom">Kitchen/Common Area</option>
      <option value="organizing">Organizing Closets</option>
      <option value="meal_prep">Meal Prep and Cooking</option>
    </optgroup>

    <optgroup label="🏠 Household - Outdoors">
      <option value="mowing_lawn">Mowing the Lawn</option>
      <option value="raking_leaves">Raking Leaves</option>
      <option value="watering_garden">Watering Plants/Garden</option>
      <option value="cleaning_gutters">Cleaning Gutters</option>
      <option value="car_wash">Washing the Car</option>
    </optgroup>
 
    <optgroup label="🏢 Office - Indoors">
      <option value="desk_cleaning">Cleaning Desks/Electronics</option>
      <option value="vacuum_office">Vacuuming Office Floors</option>
      <option value="filing">Filing Documents</option>
      <option value="restocking_supplies">Restocking Supplies</option>
      <option value="breakroom_cleaning">Cleaning Breakroom</option>
      <option value="tech_admin">Tech and Admin</option>
    </optgroup>

    <optgroup label="🏢 Office - Outdoors">
      <option value="sweeping_walkways">Sweeping Walkways</option>
      <option value="cleaning_windows">Cleaning Exterior Windows</option>
      <option value="landscape_care">Trimming Entrance Bushes</option>

    </optgroup>
 
  </select>
      </div>
 <div className="mb-6">
        <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
          Location/State:
        </label>
        <select className="w-full border border-teal-300 rounded px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none p-2 border rounded-md w-full text-gray-700  dark:bg-white"
         value={stateFilter}
          onChange={(e) => {
            setPage(1); 
            setStateFilter(e.target.value);
          }}> 
          {locations.map(loc => (
          <option key={loc.state} value={loc.state}>{loc.state} — {loc.capital}</option>
          ))} 
</select>
 
      </div>
      {/* Sort Filter */}
      <div>
        <label htmlFor="sort" className="block text-sm font-semibold mb-2 text-gray-700">
          Sort By:
        </label>
        <select 
          className="w-full border border-teal-300 rounded px-3 py-2 text-gray-700 focus:ring-2 focus:ring-teal-400 focus:outline-none dark:bg-white" 
           onClick={dateTable} >       
        <option className="py-2 px-4 border cursor-pointer">Newest</option>
        <option className="py-2 px-4 border cursor-pointer">Oldest</option>  
        </select>
      </div>

{/* Notifications */}
   <div className="bg-white p-4 rounded shadow h-max overflow-y-auto">
  <h2 className="text-lg font-bold text-teal-700 mb-2">Notifications</h2>
  <ul className="space-y-2">
    {notices.slice(0,3).map((n) => ( 
      <ul key={n.id}> 
  <li className="p-3 bg-white rounded shadow text-sm text-gray-700 font-bold hover:text-gray-400">
    <Link href={`/create-payments/job/${n.job_id}`}> {n.message} </Link> 
      </li>
    {!paidStats.includes(n.job_id)&& <li className="p-3 bg-white rounded shadow text-sm text-gray-700 font-bold hover:text-gray-400">
    <Link href={`/create-payments/job/${n.job_id}`}> You have pending payments to make - {n.job_id} </Link> 
      </li>}
   </ul> ))}
  </ul>
  <p className='p-3 text-gray-700 hover:text-gray-300 cursor-pointer' onClick={()=> setViewAll(true)}>See All</p> 
</div>

   {messages.length>0 &&<div> 
   <ChatBox userId={user.id} messages={messages} recipientId={messageId} onMessageId={setMessageId} />  
</div>}

    </aside>}
{viewAll&&<aside className="bg-white shadow-lg rounded-xl p-6 w-80 2xl:w-1/4 m-auto">
 <div className="bg-white p-4 rounded shadow h-max overflow-y-auto">
  <h2 className="text-lg font-bold text-teal-700 mb-2">Notifications</h2>
  <ul className="space-y-2">
    {notices.map((n) => ( 
      <ul key={n.id}> 
  <li className="p-3 bg-white rounded shadow text-sm text-gray-700 font-bold hover:text-gray-400">
    <Link href={`/create-payments/job/${n.job_id}`}> {n.message} </Link> 
      </li>
    {!paidStats.includes(n.job_id)&& <li className="p-3 bg-white rounded shadow text-sm text-gray-700 font-bold hover:text-gray-400">
    <Link href={`/create-payments/job/${n.job_id}`}> You have pending payments to make - {n.job_id} </Link> 
      </li>}
   </ul> ))}
  </ul>
  <p className='p-3 text-gray-700 hover:text-gray-300 cursor-pointer' onClick={()=> setViewAll(false)}>Restore View</p> 
</div>
</aside>}
    {/* Main Content */}
    <div className="flex-1 min-[1200px]:max-w-3xl 2xl:max-w-[1200px]">  
<div className="my-6">
  <div className="xs:flex justify-between"> 
    <div className="flex gap-2">
  <h2 className="text-lg font-semibold text-teal-700 mb-4">Providers in the Area</h2>
  {openSuggestions&&<p className="text-gray-500 cursor-pointer" onClick={()=> setOpenSuggestions(false)}><FontAwesomeIcon icon={faAngleUp}/></p> }
    {!openSuggestions&&<p className="text-gray-500 cursor-pointer"onClick={()=> setOpenSuggestions(true)}><FontAwesomeIcon icon={faAngleDown}/></p> }</div> 
  <div onClick={fetchXview} >
<p className="block text-lg hover:bg-teal-800 hover:text-white font-semibold mb-2 text-black opacity-80 cursor-pointer shadow-xl xs:p-4 py-4 px-2 rounded underline w-max"> View as Provider</p>
</div>  
     </div>
{openSuggestions&& <div className="grid grid-cols-1 md:grid-cols-3 gap-2 m-auto w-max">
    {suggestedProviders.length >=1 ? (
      suggestedProviders.map((provider, i) => (
        <div
          key={provider.id}
          className="bg-white w-max border border-gray-200 rounded-xl p-4 shadow-sm"
        >
          <h3 className="text-lg font-bold text-gray-800 my-2">{provider.full_name}</h3>
          <p className="text-sm text-gray-500">{provider.email}</p>
          <div className="w-max"> {provider?.user_img&&  <Image
                    src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/profileimgs/${provider?.user_img}`}
                    width={40}
                    height={40}
                    alt={provider.full_name}
                    className="w-40 h-20 object-cover rounded-t-lg"
                  />
                   }
            {!provider?.user_img&& <Image
                    src='/popcorn.png'
                    width={40}
                    height={40}
                    alt={provider.full_name}
                    className="w-40 h-20 object-cover rounded-t-lg"
                  /> }</div>
          <p className="font-bold text-gray-600 mt-1">
          is at {provider.address || "N/A"}
          </p> 
          <button
          disabled={successMessage[provider.id]  === 'pending' || successMessage[provider.id] === 'success'}
 
  onClick={() => sendInvite(0, provider.id, {}as ErrandProps)}   
  className="mt-3 w-40 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
>
  {
    successMessage[provider.id] === 'pending'
      ? 'Inviting...'
      : successMessage[provider.id] === 'success'
      ? 'Invited'
      : 'Invite to Work'
  }
 
</button>
 </div>
      ))
    ) :suggestedProviders.length ===0 ? (
      <p className="text-sm text-gray-500">No Providers in the Area</p>
    ):(
      <p className="text-sm text-gray-500">Searching for providers...</p>
    )} 
  </div>}

</div>  
 
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
     <div className="mb-4 flex gap-4">
        <input
          placeholder="Search"
          className="p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-200 dark:text-gray-700"
          value={search}
          onChange={(e) => {
            setPage(1); 
            setSearch(e.target.value);
          }}
        />
        <select
          value={locationFilter}
          onChange={(e) => {
            setPage(1); 
            setLocationFilter(e.target.value);
          }}
          className="p-2 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-200 dark:text-gray-700"
        >
          <option value="">All Jobs</option>
          <option value={user.address}>Location</option> 
        </select>
      </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">      
       <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
              <tr className="text-left text-sm">
            {['Title', 'Description', 'Photo', 'At', 'Options', 'Status', 'Assigned', '$Cost', 'Action'].map((label, i) => {
              const keys = ['title', 'description', 'photo', 'at', 'options', 'status' ,  'assigned', 'cost', 'action'];
              return (
                <th
                  key={i}
                  className="px-6 py-3 border cursor-pointer"
                  onClick={() => toggleSort(keys[i])}
                >
                  {label} {sortField === keys[i] ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </th>
              );
            })}
          </tr></thead> 
       
        <tbody>
 {fetchList.map((p: any) => (
            <tr key={p.id} className="odd:bg-teal-100 odd:dark:bg-orange-100 even:bg-gray-50 even:dark:bg-gray-100 border-b dark:border-gray-700 border-gray-200 text-gray-900"><td scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                   {p.title}
                </td>
                <td className="p-4">
                  {p.description}
                </td>
                <td className="py-2">
                  {p?.images?.length>0&& <Image
                    src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/files/${p?.images[0]}`}
                    width={100}
                    height={20}
                    alt={p.title}
                    className="rounded h-[80px] w-[120px]"
                  /> }
                   {p?.images?.length===0&& <Image
                    src={'/popcorn.png'} 
                    width={100}
                    height={20}
                    alt={p.title}
                    className="rounded h-[80px] w-[120px]"
                  /> }
                </td>
                 <td className="p-4 cursor-pointer" title="Search for Providers" onClick={()=>getSuggestions(p.id)}>
               {p.location}
                </td>
                  <td className="p-4">
                  <Link href={`/create-payments/job/${p.id}/`} className="text-teal-600 underline">View</Link>
                </td><td className="px-6 py-4 font-bold hover:bg-white">
               <Link href={`/create-payments/job/${p.id}/`}>{p.status ==='pending'? p.status + ' ' + ' Payment': p.status}</Link></td>
                 <td className="p-4 font-bold cursor-pointer">
              {p.assigned ?'Yes':'None'}
                </td> 
                <td className="p-4">
                  {p.amount} 
                </td>
                <td className="text-right m-1">
              { p.status==='completed'&&<button className="text-orange-500 hover:underline m-1" onClick={()=>openFxn(p.accepted_by)}>Write Review</button>  }
              {  p.status!=='completed'&&<Link href={{
        pathname: '/dashboard/create/',
        query: { id: p.id },
      }} className="text-orange-500 hover:underline m-1">Edit </Link>}
                  <button className="text-red-500 hover:underline" onClick={()=>deleteData(p.id)}>Delete</button>  
                </td>
             <td><button disabled={!p.assigned} onClick={()=> chatFxn(p.accepted_by, p.id)}className="text-teal-600 p-3 rounded-full shadow-lg mx-3">
                 💬
       </button></td></tr>
            ))}
        </tbody>
    </table>

      <div className="flex justify-between m-2 text-lg font-semibold text-teal-700 ">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="bg-gray-300 px-3 py-1 rounded"
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="bg-gray-300 px-3 py-1 rounded"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
</div>
   
  <div className="relative overflow-x-auto rounded-xl shadow-md my-8">        
 <div className="my-4"><h2 className="text-lg font-semibold text-teal-700 mb-4 p-4">Jobs that Received Interests</h2></div>
     <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-300">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
              <tr className="text-left text-sm">
             <th scope="col"className="px-6 py-3 border cursor-pointer">Title </th>
                <th scope="col"className="px-6 py-3 border cursor-pointer">Description </th>
                <th scope="col"className="px-6 py-3 border cursor-pointer">Photo </th>
                <th scope="col"className="px-6 py-3 border cursor-pointer">Location </th>
                <th scope="col"className="px-6 py-3 border cursor-pointer">Option </th> 
                <th scope="col"className="px-6 py-3 border cursor-pointer">Cost </th>
                <th scope="col"className="px-6 py-3 border cursor-pointer">Interested Providers</th>
                <th scope="col"className="px-6 py-3 border cursor-pointer">Action </th>
          </tr>  
        </thead>
      <tbody>
 {receivedItx.map((p: any) => (
            <tr key={p.id} className="odd:bg-teal-100 odd:dark:bg-orange-100 even:bg-gray-50 even:dark:bg-gray-100 border-b dark:border-gray-700 border-gray-200 text-gray-900">             
                <td scope="row" className="px-6 py-4 font-medium">
                   {p.clientIs.title}
                </td>
                <td className="p-3">
                  {p.clientIs.description}
                </td>
                <td className='py-2'>
                  {p?.clientIs.images?.length>0&& <Image
                    src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/files/${p?.clientIs.images[0]}`}
                    width={100}
                    height={20}
                    alt={p.clientIs.title}
                    className="rounded h-[80px] w-[120px]"
                  /> }
                   {p?.clientIs.images?.length===0&& <Image
                    src={'/popcorn.png'}
                    width={100}
                    height={20}
                    alt={p.clientIs.title}
                    className="rounded h-[80px] w-[120px]"
                  /> }
                </td>
                 <td className="px-6 py-4 cursor-pointer" title="Search for Providers" onClick={()=>getSuggestions(p.clientIs.id)}>
               {p.clientIs.location}
                </td>
                  <td className="px-6 py-4">
                  <Link href={`/create-payments/job/${p.clientIs.id}/`} className="text-teal-600 underline">View</Link>
                </td>
              
                 <td className="px-6 py-4 font-bold cursor-pointer hover:bg-white">
                  <Link href={`/create-payments/job/${p.clientIs.id}/`}>{p.clientIs.amount}</Link>  
                </td> 
                 <td className="px-6 py-4 font-bold cursor-pointer hover:bg-white">
                  <Link href={`/profile/${p.interestedParty.id}/`}>{p.interestedParty.full_name}</Link>  
                </td>  
                <td className="px-6 py-4 text-right flex">
                 <button 
                 onClick={() => sendInvite(p.id, p.interest_id, p.clientIs)}
                // disabled={isPending}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50" >Invite </button>  
                  <button className="text-red-500 hover:underline px-4 py-2"onClick={() => sendInvite(p.id, 0, p.clientIs)}>Remove</button>  
                </td></tr>
            ))}
        </tbody>
        </table>
       
      </div>
    </div>  
  </div>
 <div className="flex"> 
 {recentProviders.map((dy)=>
 <div className="bg-white dark:bg-gray-700 rounded-lg shadow m-8 w-56"key={dy.id} >
 {dy?.user_img&& <Image
 src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/profileimgs/${dy?.user_img}`}
 width={80}
 height={80}
 alt={dy.full_name}
 className="w-56 h-36 object-cover rounded-t-lg"
 /> }
 {!dy?.user_img&& <Image
 src='/popcorn.png'
 width={80}
 height={80}
 alt={dy.full_name}
 className="w-56 h-36 object-cover rounded-t-lg"
 /> }
 <h3 className="text-2xl font-bold mb-2 p-2 w-56">{dy.full_name} </h3>
 <div className="flex px-1 py-4 justify-between">
 <button
 onClick={()=>openFxn(dy.id)}
 className="bg-teal-600 text-white p-2 rounded hover:opacity-70"
 >
 Write a Review
 </button>
 <Link href={`/profile/${dy.id}`}><button className="py-2 text-white rounded hover:opacity-70 px-4 bg-orange-500">
 View
 </button></Link> 
 {openId===dy.id&&
 <PostReview role="provider" identity={openId} isOpen={open} onClose={() => setOpen(false)} full_name={dy.full_name} />  }
 </div>   
 
 {messageId=== dy.id&&job && 
 <div className="p-6 fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
 <div className="relative bg-white p-4 rounded shadow overflow-y-auto w-72">      
 <h2 className="text-lg font-bold text-teal-700 mb-2">Messages</h2>
 
 <input
 value={input}
 onChange={(e) => setInput(e.target.value)}
 placeholder="Type your message..."
 className="flex-1 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-full"
 />
 <button onClick={()=>handleSend(dy.id)} className="my-2 bg-teal-500 text-white px-4 py-1 rounded">
 Send
 </button>
 <button
 onClick={() =>( setMessageId(''), setJobId(0))}
 type="button"
 className="absolute top-2 right-2 text-gray-500 text-2xl"
 >
 &times;
 </button> 
 <div className="my-4">
 {messages.map((msg) => (
 <div
 key={msg.id}
 className={`p-2 rounded max-w-sm ${
 msg.sender_id === user.id ? "bg-teal-100 ml-auto" : "bg-orange-100 mr-auto"
 }`}
 >
 
 <p className="text-sm text-gray-700">{msg.message}</p>
 <p className="text-xs text-gray-500 text-right">
 {new Date(msg.created_at).toLocaleTimeString()}
 </p>  
 </div>
 ))}
 </div> 
 </div> 
 </div> 
 }
 
 {messageId=== dy.id&&!job &&
 <div className="p-6 fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
 <div className="relative bg-white p-4 rounded shadow overflow-y-auto w-72">      
 <h2 className="text-lg font-bold text-teal-700 mb-2">Messages</h2>
 <div className="space-y-2 mb-4">
 {messages.map((msg) => (
 <div
 key={msg.id}
 className={`p-2 rounded max-w-sm ${
 msg.sender_id === user.id ? "bg-teal-100 ml-auto" : "bg-orange-100 mr-auto"
 }`}
 > 
 <p className="text-sm text-gray-700">{msg.message}</p>
 <p className="text-xs text-gray-500 text-right">
 {new Date(msg.created_at).toLocaleTimeString()}
 </p> 
 
 </div>
 ))}
 </div> <button
 onClick={() => setMessageId('')}
 type="button"
 className="absolute top-2 right-2 text-gray-500 text-2xl"
 >
 &times;
 </button> </div>
 </div>
 } 
 
 </div>)} 
 </div>

  </div>
  </>  )
}

export default Client
