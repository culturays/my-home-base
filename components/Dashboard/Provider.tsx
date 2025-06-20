"use client"
import locations from '@/data/locations.json';
import { categoriesJobs, jobsByDate, jobsByState, suggestXJobs } from "@/app/dashboard/actions/suggest"
import { ErrandProps, ErrandStats, InviteProps, NotifyProps, ProfileProps, ReviewsProps } from "@/app/types" 
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
import { respondToInvite } from "@/app/dashboard/actions/respond-invite" 
import { fetchNewBatch, postedByNewBatch, providersBrowseAll } from "@/app/products/return-products"
const pageSize =  3;
const Provider = ({ products, user, jobs , clientStats, reviews, recentCli ,notices ,userLocation
}:{ products:ErrandProps[], user:User, jobs: ErrandProps[], clientStats:ErrandStats, reviews:ReviewsProps[], recentCli:ProfileProps[], notices:NotifyProps[], userLocation:string }) => {
const [notifications, setNotifications]=useState<NotifyProps[]>([])
const[suggestedJobs, setSuggestedJobs]=useState<ErrandProps[]>([])
const [interestTo,setInterestTo]= useState('')
const [messages, setMessages] = useState<any[]>([]); 
const [messageId, setMessageId]=useState<string|number>('')
const [open, setOpen] = useState(false);
const [openId, setOpenId] = useState<string|number>(0);
const [job,setJobId]= useState(0)
const [openSuggestions, setOpenSuggestions]=useState(false)
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
const [successMessage, setSuccessMessage]=useState<Record<string|number, 'idle' | 'pending' | 'success'>>({})
const [fetchList, setFetchList] = useState<ErrandProps[]>([]);
const removeRow = products.map((xy:ErrandProps)=> xy.providerJobs.id)

   const openFxn =(id:string|number)=>{
    setOpenId(id)
    setOpen(true)
   } 
 const getSuggestions =(lc:string )=>{
    setOpenSuggestions(prev=> !prev)
   setInterestTo(lc)
  // setProviderIdx(i)
   }  

  const handleSend = async (id:string|number) => { 
    if (!input.trim()) return;
    if (!job) return;
    
  //  const { data, error } = await sendMessage(user.id, id, input, job);   
   setJobId(0)
   setInput("");
   setMessageId('') 
   
  };
      const handleResponse = async(invitingId: string|number, response: 'accepted' | 'rejected' |'interest' | 'completed' | 'cancelled', jobid: string|number, jobTitle:string ) => {
        const {success, error}=await respondToInvite({ invitingId, response, jobid, jobTitle });
 
      };
  
 const chatFxn =(id:string|number, jobId:number)=>{
   setMessageId(id)
   setJobId(jobId)
    //handleSend 
   }  
     const receiversId = recentCli.map((dy)=> dy.id)
    useEffect(() => {
      
    async function loadMessages() {       
      const { data , error, recentChats} = await getMessages(user.id, messageId, receiversId);
        setMessages(recentChats || [])
        if(messageId)
      setMessages(data || []);
    }
    loadMessages();
  }, [user, messageId]);
 
 useEffect(()=> {
const getProviders=async()=>{
const providersByLocation = await suggestXJobs(interestTo)
setSuggestedJobs(providersByLocation)
}
getProviders()
 },[interestTo])  
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

// //  clean up since not async
//   return () => {
//     supabase.removeChannel(channel);
//   };
// }, []); 
    
  const jobOnTable=async()=>{
  const { data, count }  = await providersBrowseAll(sortField, sortDir, page, search, pageSize, locationFilter );
  setFetchList(data ??[]);
  setTotalCount(count || 0);
 
  }
   useEffect(() => { 
 jobOnTable()
   }, [page, search, locationFilter, sortField, sortDir ]); 

  const categoryTable=async()=>{
  // const { data, count }  = await categoriesJobs(sortField, sortDir, page, search, pageSize, categoryFilter );
  // setFetchList(data ??[]);
  // setTotalCount(count || 0);
 
  }
   useEffect(() => { 
 categoryTable()
   }, [page, search, categoryFilter, sortField, sortDir ]);
     const stateTable=async()=>{
  // const { data, count } = await jobsByState(sortField, sortDir, page, pageSize, stateFilter );
  // setFetchList(data ??[]);
  // setTotalCount(count || 0);
 
  }
   useEffect(() => { 
 stateTable()
   }, [page, search, stateFilter, sortField, sortDir ]);
    const dateTable=async()=>{ 
  //    if (sortDir === 'asc') {
  //      setSortDir( 'desc'  )  
  // const { data, count } = await jobsByDate(sortField, sortDir, page, pageSize );
  // setFetchList(data ??[]);
  // setTotalCount(count || 0);
  //    } else { 
  //      setSortDir('asc');
  //    } 
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
 
// ------button to accept and add accepter id to db--------------
  
// ------------------------------------------
// My Applications / Offers	Show pending and accepted offers.
// Jobs In Progress	Tasks the provider is currently working on.
// Completed Jobs History	View past completed errands.
// Messages/Chat Talk to clients about jobs. 
 
// Update Availability	Indicate whether the provider is currently available or not.
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
href="/create-payments" 
>
<h3 className="text-sm font-semibold hover:text-gray-400">Payout History</h3>
</Link> 
{/* <p className="text-2xl font-bold">{clientStats?.pending_payments}</p>last ten total payments  */}
</div>
</div>
<div className="flex justify-end items-right my-6 ">
<Link
href="/dashboard/create"
className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl shadow-sm transition"
>
+ Post New Errand
</Link>      
</div>
<div>
<div className="mt-8">
<h2 className="text-xl font-bold mb-4 text-teal-800">Your Reviews</h2>
<div className="space-y-4">
{reviews.map((review) => (
<div key={review.id} className="bg-white p-4 border rounded shadow-sm">
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

<div className="flex flex-col min-[1200px]:flex-row gap-2 bg-teal-50 p-8">
<aside className="bg-white shadow-lg rounded-xl p-6 w-80 xl:w-1/4 m-auto">
<h2 className="text-xl font-bold text-teal-700 mb-4">Filters</h2>

{/* Category Filter */}
<div className="mb-6 max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
<label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
Category:
</label>

<select
id="category"
className="w-full border border-teal-300 rounded px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
value={categoryFilter}
onChange={(e) => {
setPage(1); 
setCategoryFilter(e.target.value)

}} >  
<optgroup label="All"> 
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
<select className="w-full border border-teal-300 rounded px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none p-2 border rounded-md w-full text-gray-700"
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
<label htmlFor="sort" className="block text-sm font-semibold text-gray-700 mb-2">
Sort By:
</label>

<select 
className="w-full border border-teal-300 rounded px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none" 
onClick={dateTable} >       
<option className="py-2 px-4 border cursor-pointer">Newest</option>
<option className="py-2 px-4 border cursor-pointer">Oldest</option>  
</select>
</div>
<div  className="bg-white p-4 rounded shadow h-max overflow-y-auto">
<h2 className="text-lg font-bold text-teal-700 mb-2">Notifications</h2>
<ul className="space-y-2">
{notices.map((n) => ( 
<li key={n.id} className="p-3 bg-white rounded shadow text-sm text-gray-700 font-bold hover:text-gray-400">
<Link href={`/create-payments/job/${n.job_id}`}> { n.message }</Link> 
</li>
))}
</ul>
</div>

{messages.length>0 &&<div> 
<ChatBox userId={user.id} messages={messages} recipientId={messageId} onMessageId={setMessageId} />  
</div>}
</aside>

<div className="flex-1 max-w-xl px-20 sm:px-16 sm:max-w-2xl md:max-w-3xl min-[800px]:max-w-4xl min-[1000px]:max-w-5xl min-[1200px]:w-[700px] min-[1200px]:px-0 xl:w-[1000px]">
<div className="my-6">
<h2 className="text-lg font-semibold text-teal-700 mb-4">Suggested Jobs</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{suggestedJobs.length > 0 ? (
suggestedJobs.map(job => (
<div
key={job.id}
className="bg-white w-max border border-gray-200 rounded-xl p-4 shadow-sm"
>
<h3 className="text-lg font-bold text-gray-800 my-2">{job.title}</h3>
<p className="text-sm text-gray-500">{job.description}</p>
<div className="w-max"> {job?.images.length>0&&  <Image
src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/files/${job?.images[0]}`}
width={40}
height={40}
alt={job.title}
className="w-40 h-20 object-cover rounded-t-lg"
/>  }
{job?.images.length<1&&  <Image
src='/popcorn.png'
width={40}
height={40}
alt={job.title}
className="w-40 h-20 object-cover rounded-t-lg"
/>  }
</div>
<p className="font-bold text-gray-600 mt-1">
is at {job.location || "N/A"}
</p> 

<button
disabled={successMessage[job.id]  === 'pending' || successMessage[job.id] === 'success'}
onClick={() => handleResponse('', 'interest' , job?.id, job.title )}

className="mt-3 w-40 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
>
{
successMessage[job.id] === 'pending'
? 'Inviting...'
: successMessage[job.id] === 'success'
? 'Invited'
: 'Send Interest'
}

</button>
</div>

))
) : (
<p className="text-sm text-gray-500">No Jobs in the Area. <a href="#div_id">Browse</a>.</p>
)}
</div>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
<div className="mb-4 flex gap-4">
<input
placeholder="Search"
className="border p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
className="border p-2 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
>
<option value="">All Jobs</option>
<option value={userLocation}>Location</option> 
</select>
</div>
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-left text-sm">
             <th scope="col"className="px-6 py-3 border cursor-pointer">Title </th>
                <th scope="col"className="px-6 py-3 border cursor-pointer">Description </th>
                <th scope="col"className="px-6 py-3 border cursor-pointer">Photo </th> 
                <th scope="col"className="px-6 py-3 border cursor-pointer">At </th>
                <th scope="col"className="px-6 py-3 border cursor-pointer">Options </th>
                <th scope="col"className="px-6 py-3 border cursor-pointer">Status </th> 
                <th scope="col"className="px-6 py-3 border cursor-pointer">Cost </th><th scope="col"className="px-6 py-3 border cursor-pointer">Action </th>
          </tr>  
        </thead> 

  <tbody>
{products.map((p: any) => (
<tr key={p.providerJobs.id} className="border-t hover:bg-teal-200"><td className="p-3">{p.providerJobs.title}</td><td className="p-3">{p.providerJobs.description}</td><td className="p-3">
{p?.providerJobs.images?.length>0&& <Image
src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/files/${p?.providerJobs.images[0]}`}
width={80}
height={80}
alt={p.providerJobs.title}
className="rounded"
/> }
{p?.providerJobs.images?.length===0&& <Image
src={'/popcorn.png'}
width={80}
height={80}
alt={p.providerJobs.title}
className="rounded"
/> }
</td><td className="p-3 cursor-pointer" title="Search for Providers" onClick={()=>getSuggestions(p.providerJobs.id)}>
{p.providerJobs.location}  
</td><td className="p-3">
<Link href={`/create-payments/job/${p.providerJobs.slug}`} className="text-teal-600 underline">View</Link>
</td><td className="p-3">
{p.providerJobs.status}  
</td><td className="p-3">
{p.providerJobs.amount} 
</td><td className="p-3 text-right space-x-3">  
{ p.provider_id===p.providerJobs.accepted_by&&<button
onClick={() => handleResponse(p.id, 'completed', p.providerJobs.id, p.providerJobs.title)}
disabled={isPending}
className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
>Inprogress</button>}
{p.status !=='interest'&& p.provider_id!==p.providerJobs.accepted_by&&<button
onClick={() => handleResponse(p.id, 'accepted', p.providerJobs.id, p.providerJobs.title)}
disabled={isPending}
className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
>Accept</button>}
{p.status ==='accepted'&&<button
onClick={() => handleResponse(p.id, 'rejected', p.providerJobs.id, p.providerJobs.title)}
disabled={isPending}
className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
>Reject</button>}
{p.status ==='interest'&&<button className="text-red-500 hover:underline my-2"onClick={() => handleResponse(p.id, 'cancelled', p.providerJobs.id, p.providerJobs.title)}>Remove</button>}</td>{p.providerJobs.assigned&&<td><button onClick={()=> chatFxn(p.providerJobs.accepted_by, p.providerJobs.id)}className="text-teal-600 p-3 rounded-full shadow-lg mx-4">
💬</button></td>}
</tr>
))}
</tbody></table>
</div>
</div></div>
</div>

</div> 

<div className="relative overflow-x-auto rounded-xl shadow-md m-8 max-w-md m-auto sm:max-w-lg md:max-w-2xl lg:max-w-full px-11">  
<div id="div_id"className="text-lg font-semibold text-teal-700 mb-4 p-4"><h2>Browse More Jobs</h2></div>
<div className="m-4 flex gap-4">
<input
placeholder="Search"
className="border p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
>
<option value="">All Jobs</option>
<option value={userLocation}>Location</option> 
</select>
</div>

<table className="w-full text-left mx-4">
 <thead className="bg-teal-600 text-white">
<tr className="">{['Title', 'Description', 'Photo', 'At', 'Options',  'Cost', 'Action'].map((label, i) => {
const keys = ['title', 'description', 'photo', 'at', 'options',  'cost', 'action'];
return (
<th
key={i}
className="py-2 px-4 border cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap  text-white"
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
<tr key={p.id} className="border-t hover:bg-teal-200"><td className="p-3">{p.title}</td>
<td className="p-3">{p.description}</td><td className="p-3">{p.images?.length>0&& <Image
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
className="rounded"
/> } 
</td><td className="p-3 cursor-pointer hover:text-red-800 hover:font-bold" title="Search for Similar Jobs" onClick={()=>getSuggestions(p.id)}>
{p.location}  
</td><td className="p-3">
<Link href={`/create-payments/job/${p.slug}`} className="text-teal-600 underline">View</Link>
</td><td className="p-3">
{p.amount} 
</td><td className="p-3 text-right space-x-3"> 
<div className="flex gap-2">
<button
//(p.id, 'rejected', p.providerJobs.id, p.providerJobs.title )
onClick={() => handleResponse(p.user_id, 'interest', p.id, p.title )}
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
<div className="bg-white rounded-lg shadow m-8 w-56"key={dy.id} >
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
<div className="p-2 w-56">
<h3 className="text-2xl font-bold mb-2">{dy.full_name} </h3>
<Link href={`/profile/${dy.id}`}><button className="mt-4 bg-blue-500 text-white px-3 py-2 rounded-full hover:bg-blue-700">
View
</button></Link> 
</div> 

<div className="p-2">
<button
onClick={()=>openFxn(dy.id)}
className="bg-teal-600 text-white px-4 py-2 rounded"
>
Write a Review
</button>
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