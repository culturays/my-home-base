"use client"
import locations from '@/data/locations.json';
import { categoriesJobs, jobsByDate, jobsByState, suggestXJobs } from "@/app/dashboard/actions/suggest"
import { ErrandProps, ErrandStats, InviteProps, NotifyProps, ProfileProps, ReviewsProps, RolesProps } from "@/app/types" 
import { type User } from "@supabase/supabase-js"
import Image from "next/image"
import Link from "next/link" 
import { useEffect, useState, useTransition } from "react"
import ChatBox from "./DisplayMessages" 
import { getMessages } from "@/app/dashboard/actions/get-messages"
import PostReview from "./PostReview"
import { sendMessage } from "@/app/dashboard/actions/send-messages"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { respondToJobs } from "@/app/dashboard/actions/respond-invite" 
import { fetchNewBatch, postedByNewBatch, providersBrowseAll } from "@/app/products/return-products"
import { fetchProviderView } from '@/app/dashboard/actions/invite-providers';
import { useRouter } from 'next/navigation';
const pageSize =  3;
const Provider = ({ products, user, clientStats, reviews, recentCli ,notices ,userLocation, roles, jobs}:{ products:ErrandProps[], user:User, jobs: ErrandProps[], clientStats:ErrandStats, reviews:ReviewsProps[], recentCli:ProfileProps[], notices:NotifyProps[], userLocation:string, roles:RolesProps}) => {  
const [messages, setMessages] = useState<any[]>([]); 
const [messageId, setMessageId]=useState<string|number>('')
const [open, setOpen] = useState(false);
const [openId, setOpenId] = useState<string|number>(0);
const [job,setJobId]= useState(0) 
const [input, setInput] = useState(""); 
const [totalCount, setTotalCount] = useState(0);
const [page, setPage] = useState(1);
const [search, setSearch] = useState('');
const [locationFilter, setLocationFilter] = useState('');
const [sortField, setSortField] = useState('created_at');
const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
const [isPending, startTransition] = useTransition(); 
const [categoryFilter, setCategoryFilter] = useState('');
const [stateFilter, setStateFilter] = useState('');
const [viewAll, setViewAll]=useState(false)
const [successMessage, setSuccessMessage]=useState<Record<string|number, 'idle' | 'pending' | 'success'>>({})
const [fetchList, setFetchList] = useState<ErrandProps[]>([]);
const removeRow = products.map((xy:ErrandProps)=> xy.providerJobs.id)

   const openFxn =(id:string|number)=>{
    setOpenId(id)
    setOpen(true)
   }  

  const handleSend = async (id:string|number) => { 
    if (!input.trim()) return;
    if (!job) return; 
  const { data, error } = await sendMessage(user.id, id, input, job);   
   setJobId(0)
   setInput("");
   setMessageId('') 
   
  };
      const handleResponse = async(invitingId: string|number, response: 'accepted' | 'rejected' |'interest' | 'completed' | 'cancelled', job: ErrandProps) => {
        const {success, error}=await respondToJobs({ invitingId, response, job});
        if (success) {
    setSuccessMessage(prev => ({ ...prev, [job.user_id]: 'success' }) as Record<string|number, 'idle' | 'pending' | 'success'>);
  } else {
    setSuccessMessage(prev => ({ ...prev, [job.user_id]: 'idle' }) as Record<string|number, 'idle' | 'pending' | 'success'>);
  }
  router.refresh()
      };
  
 const chatFxn =(id:string|number, jobId:number)=>{
   setMessageId(id)
   setJobId(jobId)
    //handleSend 
   }  
     const receiversId = recentCli.map((dy)=> dy.id)
    useEffect(() => {
      
    async function loadMessages() {       
      const { data , error} = await getMessages(user.id, messageId, receiversId);
        // setMessages(recentChats || [])
        if(messageId)
      setMessages(data || []);
    }
    loadMessages();
  }, [user, messageId]);
 
  
//   useEffect(() => {
//   const supabase = createClient();
//   const channel = supabase
//     .channel('notifications')
//     .on(
//       'postgres_changes',
//       {
//         event: 'INSERT',
//         schema: 'public',
//         table: 'notifications',
//         filter: `user_id=eq.${user.id}`,
//       },
//       (payload) => {
//         const newNotif = payload.new as NotifyProps;
//         setNotifications((prev) => [newNotif, ...prev]);
//       }
//     )
//     .subscribe();

//   return () => {
//     supabase.removeChannel(channel);
//   };
// }, []); 
    
  const jobOnTable=async()=>{
  const { data, count }  = await providersBrowseAll(sortField, sortDir, page, search, pageSize, locationFilter );
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

// Update Availability	Indicate whether the provider is currently available or not.
const router= useRouter()
const fetchXview=async()=>{
 await fetchProviderView(roles)
  router.push(`/dashboard/`)
}
 const paidStats = fetchList.filter((xy)=> xy.payment_status ==='paid').map(dy=> dy.id)
return (
<div>
<div className="flex flex-wrap gap-1 justify-center">
<div className="bg-orange-100 text-orange-700 px-4 py-6 rounded-xl w-[400px] min-[700px]:w-[300px] md:w-[350px] min-[900px]:w-[400px] h-24 min-[900px]:h-auto">
<h3 className="text-sm font-semibold">Total Spent</h3>
<p className="text-2xl font-bold">${clientStats?.total_spent.toLocaleString()}</p>
</div>

<div className="bg-teal-100 text-teal-700 px-4 py-6 rounded-xl w-[400px] min-[700px]:w-[300px] md:w-[350px] min-[900px]:w-[400px] h-24 min-[900px]:h-auto">
<h3 className="text-sm font-semibold">Jobs Completed</h3>
<p className="text-2xl font-bold">{clientStats?.jobs_completed}</p>
</div> 
<div className="bg-yellow-100 text-yellow-700 p-4 rounded-xl bg-teal-100 text-teal-700 px-4 py-6 rounded-xl w-[400px] min-[700px]:w-[300px] md:w-[350px] min-[900px]:w-[400px] h-24 min-[1268px]:h-auto">
<Link
href="/create-payments/" 
>
<h3 className="text-sm font-semibold hover:text-gray-400">Payout History</h3>
</Link> 
{/* <p className="text-2xl font-bold">{clientStats?.pending_payments}</p>last ten total payments  */}
</div>
</div>
<div className="flex justify-end items-right my-6">
<Link
href="/dashboard/create/"
className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl shadow-sm transition"
>
+ Post New Errand
</Link>      
</div>

<div className="max-w-xl sm:max-w-2xl md:max-w-3xl min-[800px]:max-w-4xl min-[1000px]:max-w-5xl min-[1200px]:max-w-6xl min-[1200px]:px-0 xl:max-w-[1400px] mx-auto overflow-hidden">
  
<div>
<h2 className="text-xl font-bold mb-4 text-teal-800 dark:text-gray-300">Your Reviews</h2>
<div className="space-y-4 flex">
{reviews.map((review) => (
<div key={review.id} className="bg-white p-4 border rounded shadow-sm max-w-96">
<p className="text-gray-700">You were rated by <strong>{review.providerName}</strong> for <em>{review.job_title?.length>0 &&review.job_title[0]}</em></p>
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

<div className="flex flex-col min-[1200px]:flex-row gap-2 bg-teal-50 p-4 overflow-x-auto">
{ !viewAll&&
  <aside className="bg-white shadow-lg rounded-xl p-6 w-5/6 xs:w-80 m-auto">
      <h2 className="text-xl font-bold text-teal-700 mb-4">Filters</h2>

      {/* Category Filter*/}
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

{viewAll&&<aside className="bg-white shadow-lg rounded-xl p-6 w-5/6 xs:w-80 m-auto">
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

<div className="min-[1200px]:max-w-4xl xl:max-w-[1200px] mx-auto">
 <div className='xs:flex gap-2 justify-between'>
<p className=" font-semibold text-teal-700 m-3"> <a href="#div_id">Browse Jobs in the Area</a>.</p>
  <div onClick={fetchXview} >
<p className="block text-lg hover:bg-teal-800 hover:text-white font-semibold mb-2 text-black opacity-80 cursor-pointer shadow-xl p-4 rounded underline w-max"> View as Client</p>
</div> 
</div>
 

<div className="relative shadow-md sm:rounded-lg z xl:w-[900px] 2xl:w-[1000px]">
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-teal-700 dark:text-gray-200">
              <tr className="text-left text-sm">
             <th scope="col"className="px-6 py-3 cursor-pointer">Title </th>
                <th scope="col"className="px-6 py-3 cursor-pointer">Description </th>
                <th scope="col"className="px-6 py-3 cursor-pointer">Photo </th> 
                <th scope="col"className="px-6 py-3 cursor-pointer">At</th>
                <th scope="col"className="px-6 py-3 cursor-pointer">Options </th>
                <th scope="col"className="px-6 py-3 cursor-pointer">Status </th> 
                <th scope="col"className="px-6 py-3 cursor-pointer">$Cost</th><th scope="col"className="px-6 py-3 cursor-pointer">Action </th>
          </tr>  
   </thead> 

 <tbody>
{products.map((p: any) => (
<tr key={p.providerJobs.id} className="odd:bg-teal-100 odd:dark:bg-orange-100 even:bg-gray-50 even:dark:bg-gray-100 border-b dark:border-gray-700 border-gray-200 text-gray-900"><td className="p-3 h-24">{p.providerJobs.title}</td><td className="p-3 h-24">{p.providerJobs.description}</td><td className="p-3 h-24">
{p?.providerJobs.images?.length>0&& <Image
src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/files/${p?.providerJobs.images[0]}`}
width={80}
height={80}
alt={p.providerJobs.title}
className="rounded h-20 w-28"
/> }
{p?.providerJobs.images?.length===0&& <Image
src={'/popcorn.png'}
width={80}
height={80}
alt={p.providerJobs.title}
className="rounded"
/>}
</td><td className="p-3 h-24 cursor-pointer">
{p.providerJobs.location}  
</td><td className="p-3 h-24">
<Link href={`/create-payments/job/${p.providerJobs.slug}`} className="text-teal-600 underline">View</Link>
</td><td className="p-3 h-24">
{p.providerJobs.status}  
</td><td className="p-3 h-24">
{p.providerJobs.amount} 
</td><td className="p-3 h-24 text-right">  
{ p.provider_id===p.providerJobs.accepted_by&&<button
onClick={() => handleResponse(p.id, 'completed', p.providerJobs)}
disabled={isPending}
className="p-3 my-0.5 block bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
>Inprogress</button>}{p.providerJobs.status==='in progress' && p.provider_id!==p.providerJobs.accepted_by&&<button
onClick={() => handleResponse(p.id, 'accepted', p.providerJobs)}
disabled={isPending||p.providerJobs.payment_status !=='paid'}
className="p-3 my-0.5 block bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"title='Waiting for Payment'
>Accept</button>}
{p.status ==='accepted' && <button
onClick={() => handleResponse(p.id, 'rejected', p.providerJobs)}
disabled={isPending}
className="p-3 my-0.5 block bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
>Reject</button>}
{(!p.providerJobs.assigned||p.status === 'interest' )&&<button className="text-red-500 hover:underline my-2 my-0.5 block"onClick={() => handleResponse(p.id, 'cancelled', p.providerJobs)}>Remove</button>} </td><td><button disabled={!p.providerJobs.assigned} onClick={()=> chatFxn(p.providerJobs.accepted_by, p.providerJobs.id)}className="text-teal-600 block p-3 rounded-full shadow-lg mx-4">
💬</button></td></tr>
))}
</tbody></table>
</div>

</div>
</div>

</div> 

<div className="relative overflow-x-auto rounded-xl shadow-md my-8 max-w-md m-auto sm:max-w-xl md:max-w-3xl lg:max-w-full">  
<div id="div_id"className="text-xl font-semibold text-teal-700 p-4 dark:text-gray-300"><h2>Browse More Jobs</h2></div>
 
<div className="mx-2 xs:flex gap-3">
<input
placeholder="Search"
className="p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-200 dark:text-gray-700 my-1"
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
className="p-2 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-200 dark:text-gray-700 my-1"
>
<option value="">All Jobs</option>
<option value={userLocation}>Location</option> 
</select>
 
</div>

<table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-300 my-4">
 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
<tr className="">{['Title', 'Description', 'Photo', 'At', 'Options',  'Cost', 'Action'].map((label, i) => {
const keys = ['title', 'description', 'photo', 'at', 'options',  'cost', 'action'];
return (
<th
key={i}
className="py-2 px-4 border cursor-pointer px-6 py-4 font-medium"
onClick={() => toggleSort(keys[i])}
>
{label} {sortField === keys[i] ? (sortDir === 'asc' ? '▲' : '▼') : ''}
</th>
);
})}
</tr>
</thead> 

<tbody>
{fetchList.filter((xy)=> !removeRow.includes(xy.id)).map((p: any) => (
<tr key={p.id} className="border-b dark:border-gray-700 border-gray-200"><td className="p-3 h-24 font-medium">{p.title}</td>
<td className="p-3 h-24">{p.description}</td><td className="p-3 h-24">{p.images?.length>0&& <Image
src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/files/${p?.images[0]}`}
width={80}
height={80}
alt={p.title}
className="rounded"
/> }
{p?.images?.length===0&& <Image
src={'/popcorn.png'}
width={80}
height={80}
alt={p.title}
className="rounded h-20 w-28"
/> } 
</td><td className="p-3 h-24 cursor-pointer hover:text-red-800 hover:font-bold" title="Search for Similar Jobs">
{p.location}  
</td><td className="p-3">
<Link href={`/create-payments/job/${p.slug}`} className="text-teal-600 underline">View</Link>
</td><td className="p-3 h-24">
{p.amount} 
</td><td className="p-3 h-24 text-right"> 
<div className="flex gap-2">
<button
onClick={() => handleResponse('', 'interest', p )}
className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
>
Send Interest
</button>              
</div>  
</td>
</tr>
))}
</tbody>
</table> 
 
<div className="flex justify-center text-lg font-semibold text-teal-700 m-4 p-4 ">
<button
onClick={() => setPage((p) => Math.max(p - 1, 1))}
className="bg-gray-300 mx-3 px-3 py-1 rounded"
disabled={page === 1}
>
Prev
</button>
<span>
Page {page} of {totalPages}
</span>
<button
onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
className="bg-gray-300 mx-3 px-3 py-1 rounded"
disabled={page === totalPages}
>
Next
</button>
</div>
</div>

<div className="flex"> 
{recentCli.map((dy)=>
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
)
}

export default Provider