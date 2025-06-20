"use client"

import { fetchPayments, handleUpdateStatus } from "@/app/dashboard/(ultra-admin)/admin/action";
import { PaymentProps } from "@/app/types";
import { useEffect, useState } from "react";
import { saveAs } from 'file-saver'; 
const pageSize = 10;
const Payments = ({jobsPosted, paymentsT, clientX, providersX, jobsCompleted}:{jobsPosted:number, paymentsT:number ,clientX:number,providersX:number, jobsCompleted:number}) => {
     const [paymentsX, setPaymentsX] = useState<PaymentProps[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortField, setSortField] = useState('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [darkMode, setDarkMode] = useState(false);
      const userOnTable=async()=>{
     const { data, count }  = await fetchPayments(sortField, sortDir, page, search, pageSize, roleFilter );
        setPaymentsX(data ??[]);
      setTotalCount(count || 0);
     
      }
       useEffect(() => { 
      userOnTable()
       }, [page, search, roleFilter, sortField, sortDir ,  ]); 
      
       const totalPages = Math.ceil(totalCount / pageSize);
       const toggleSort = (field: string) => {
         if (sortField === field) {
           setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
         } else {
           setSortField(field);
           setSortDir('asc');
         }
       };
      
      const downloadCSV = () => {
         const headers = [ 'Email', 'Job ID', 'Status', 'Date'];
         const rows = paymentsX.map(u => [
           u.job_id,
           u.email,
           u.amount,
           u.status,
           u.last_payment_amount,
           u.last_payment_date,
           u.user_id,
           new Date(u.created_at).toLocaleDateString()
         ]);
     
         const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
         saveAs(blob, 'users_export.csv');
       };
   
     const uptAxn =async (id:number|string,currentStatus:string, status:string)=>{
     await handleUpdateStatus(id, status)
        if(currentStatus=== ''||!currentStatus){
  setPaymentsX((prev) =>
      prev.map((m) => (m.id === id ? { ...m,  status } : m))
    )}else{
  setPaymentsX((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status:'' } : m))
    );
    }
     }
  return (
    <> 
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
 
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
       <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
           <h1 className="text-2xl font-bold text-teal-700 dark:text-teal-200">
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
           onClick={downloadCSV}
            className="ml-4 bg-gray-700 text-white px-4 py-2 rounded"
          >
            Export CSV
          </button>
        </div>      
      </div>

   <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-4 flex gap-4">
        <input
          placeholder="Search email"
          className="border p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <select
          value={roleFilter}
          onChange={(e) => {
            setPage(1);
            setRoleFilter(e.target.value);
          }}
          className="border p-2 rounded"
        >
          <option value="">All Roles</option>
          <option value="client">Status</option>
          <option value="provider">Amount</option>
          <option value="admin">Email</option>
          <option value="admin">Date</option>
        </select>
      </div>
      <table className="min-w-full bg-white border">
          <thead>
          <tr className="bg-teal-100 text-left text-sm">
            {['Email', 'Jobs Id', "Amount", 'Status', "Date", 'Action'].map((label, i) => {
              const keys = [ 'email', 'jobs_id', "amount", 'created_at', 'status', "date", 'action'];
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
        {paymentsX.map((p) => (
            <tr key={p.id} className="text-sm">
              <td className="py-2 px-4 border">{p.email}</td>
              <td className="py-2 px-4 border">{p.job_id || '—'}</td>
              <td className="py-2 px-4 border">${p.amount}</td>
              <td className="py-2 px-4 border capitalize">{p.status}</td>
              <td className="py-2 px-4 border">{new Date(p.created_at).toLocaleString()}</td>
                 <td className="p-2 border space-x-2">
                      <button
                    onClick={() => uptAxn(p.id, p.status, 'paid')}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Mark Paid
                      </button>
                      <button
                       onClick={() => uptAxn(p.id, p.status, 'refunded')}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Refund
                      </button>
                    </td>
            </tr>
          ))} 
        </tbody>
      </table>
<div className="flex justify-between mt-4">
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

    </div> </div>
  </>)
}

export default Payments
