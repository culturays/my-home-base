"use client"
import { markTransaction } from '@/app/dashboard/(ultra-admin)/admin/action';
import { ErrandProps, JobsProps, ProfileProps } from '@/app/types';
import { useEffect, useState } from 'react'; 
 import { saveAs } from 'file-saver'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { postedByNewBatch } from '@/app/products/return-products';
import { useRouter } from 'next/navigation';
const pageSize = 10;
const formatted = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format('40225');

  // {new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  // }).format(total)} 

const JobsTable=({jobsPosted, paymentsT, clientX, providersX, jobsCompleted}:{jobsPosted:number, paymentsT:number ,clientX:number,providersX:number, jobsCompleted:number})=> {
  
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(''); 
  const [sortField, setSortField] = useState('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [darkMode, setDarkMode] = useState(false);
 const [fetchList, setFetchList] = useState<ErrandProps[]>([]); 
 const [locationFilter, setLocationFilter] = useState(''); 
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
  const totalPages = Math.ceil(totalCount / pageSize);
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };
 
 
  const exportCSV = () => {
    const csvContent = [
      ['Title', 'Email', 'Amount'],
       ...fetchList.map((m) => [m.title, m.email, m.amount]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'jobs_export.csv');
  };
  
  return (
<>  
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
  <div className="bg-teal-600 text-white rounded-2xl shadow-md p-4">
    <h3 className="text-sm font-medium">👥 Total Users</h3>
    <p className="text-2xl font-semibold mt-2">{fetchList.length || 0} </p>
  </div>

  <div className="bg-orange-500 text-white rounded-2xl shadow-md p-4">
    <h3 className="text-sm font-medium">💼 Total Jobs Posted</h3>
    <p className="text-2xl font-semibold mt-2">{jobsPosted} </p>  
  </div>

  <div className="bg-teal-500 text-white rounded-2xl shadow-md p-4">
    <h3 className="text-sm font-medium">✅ Jobs Completed</h3>
   <p className="text-2xl font-semibold mt-2">{jobsCompleted} </p>
  </div>

  <div className="bg-orange-400 text-white rounded-2xl shadow-md p-4">
    <h3 className="text-sm font-medium">💰 Total Revenue</h3>
    <p className="text-2xl font-semibold mt-2">${ paymentsT}K+</p>
  </div>

  <div className="bg-teal-700 text-white rounded-2xl shadow-md p-4">
    <h3 className="text-sm font-medium">🧑‍💻 Active Providers</h3>
    <p className="text-2xl font-semibold mt-2">{providersX}</p>
  </div>

     <div className="bg-teal-700 text-white rounded-2xl shadow-md p-4">
    <h3 className="text-sm font-medium">🧑‍💻 Active Clients</h3>
    <p className="text-2xl font-semibold mt-2">{clientX}</p>
  </div>
</div>

   <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}> 
       <div className="px-4 py-8">
          <div className="flex justify-between items-center mb-6">
           <h1 className={`${darkMode ?"text-2xl font-bold text-teal-700 dark:text-teal-200":"text-2xl font-bold text-teal-700 dark:text-teal-600"}`}>
             Admin Dashboard: Member Management
            </h1>
           <button
           onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 border rounded text-sm"
          >
            Toggle Dark Mode
          </button>
        </div>

        <div className="mb-6">        
          <button
           onClick={exportCSV}
            className="ml-4 bg-gray-700 text-white px-4 py-2 rounded"
          >
            Export CSV
          </button>
        </div>      
      </div>

        <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-teal-700">Jobs Overview</h2>

      <div className="mb-4 xs:flex gap-4 space-y-1">
        <input
          placeholder="Search email"
          className="text-gray-500 border p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
          className="border text-gray-500 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        >
          <option value="">All Roles</option>
          <option value="client">Client</option>
          <option value="provider">Provider</option>
          <option value="admin">Admin</option>
        </select>
      </div>
 
        <div className="w-full overflow-x-auto py-8">
      <table className={`${darkMode ?"min-w-[1300px] border dark:bg-gray-800":"min-w-[1300px] border dark:bg-gray-100"}`}>
        <thead>
          <tr className="bg-teal-600 text-white text-left text-sm">
            {['Id', 'Title', 'Email', 'Description', 'Date', 'Deadline', 'Amount', 'Status', "Payment Status", "Accepted By", 'Action'].map((label, i) => {
              const keys = ['title', 'email', 'description', 'date', 'deadline', 'amount', 'status', "payment_status", "accepted_by", 'action'];
              return (
                <th
                  key={i}
                  className="py-2 px-4 border cursor-pointer"
                  onClick={() => toggleSort(keys[i])}
                >
                  {label} {sortField === keys[i] ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {fetchList.map((u) => (
            <tr key={u.id} className={"text-sm border-t"}>
              <td className="py-2 px-4">{u.id}</td>
              <td className="py-2 px-4">{u.title}</td>
              <td className="py-2 px-4">{u.email}</td>
               <td className="py-2 px-4 capitalize">{u.description}</td>
                <td className="py-2 px-4">{new Date(u.date).toLocaleDateString()}</td>
                <td className="py-2 px-4">{new Date(u.deadline).toLocaleDateString()}</td>
             <td className="py-2 px-4">${u.amount}</td>
             <td className="py-2 px-4">{u.status}</td>
             <td className="py-2 px-4 text-center">{u.payment_status||'——'}</td>   
              <td className="py-2 px-4">{u.accepted_by}</td>  
              <td className="py-2 px-4 border space-y-1 space-x-1"> 
             <form> 
                <button  
                disabled={u.payment_status==='paid'}
                formAction={()=> markTransaction(u)}
                className="bg-red-600 text-white px-2 py-1 rounded">    
              Mark As Paid
                 </button>
               
                </form>
                </td> 
             <td className="py-2 px-4 text-green-600 hover:text-gray-400"> <Link href={`/create-payments/job/${u.id}`}><FontAwesomeIcon icon={faEye}/></Link> </td> 
            </tr>
          ))} 
        </tbody>
      </table>
</div>
      <div className="flex justify-center mt-4">
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
    </div>  
</>  );
}
export default JobsTable