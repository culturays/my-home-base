"use client"
import { banUser, deleteUser, fetchUsers } from '@/app/dashboard/(ultra-admin)/admin/action';
import { JobsProps, ProfileProps } from '@/app/types';
import { useEffect, useState } from 'react'; 
 import { saveAs } from 'file-saver'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
const pageSize = 10;
const formatted = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format('40225');

  // {new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  // }).format(total)} 

const AdminUserTable=({jobsPosted, paymentsT, clientX, providersX, jobsCompleted}:{jobsPosted:number, paymentsT:number ,clientX:number,providersX:number, jobsCompleted:number})=> {
  const [users, setUsers] = useState<ProfileProps[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortField, setSortField] = useState('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [darkMode, setDarkMode] = useState(false);
 
   const banXUser = async (user: ProfileProps) => {
  await banUser(user)
     if(user.banned=== null||user.banned=== false){
  setUsers((prev) =>
      prev.map((m) => (m.id === user.id ? { ...m,  banned:true, active: false } : m))
    )}else{
  setUsers((prev) =>
      prev.map((m) => (m.id === user.id ? { ...m,  banned:false, active:true  } : m))
    );
    }
  
  };

  const deleteXUser = async (id: string|number) => {
 await deleteUser(id); 
  setUsers((prev) =>
      prev.filter((m) => m.id!==  id )
    );
  };
 const userOnTable=async()=>{
const { data, count }  = await fetchUsers(sortField, sortDir, page, search, pageSize, roleFilter );
   setUsers(data ??[]);
 setTotalCount(count || 0);

 }
  useEffect(() => { 
 userOnTable()
  }, [page, search, roleFilter, sortField, sortDir]); 
 
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
    const headers = ['Full Name', 'Email', 'Role', 'Jobs Posted', 'Total Paid', 'Joined'];
    const rows = users.map(u => [
      u.full_name,
      u.email,
      u.role,
      u.jobs_posted,
      u.total_paid,
      new Date(u.created_at).toLocaleDateString()
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'users_export.csv');
  };

  const exportCSV = () => {
    const csvContent = [
      ['Full Name', 'Email', 'Role'],
       ...users.map((m) => [m.full_name, m.email, m.role]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'members_export.csv');
  };
 
  
  return (
<>  
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
  <div className="bg-teal-600 text-white rounded-2xl shadow-md p-4">
    <h3 className="text-sm font-medium">👥 Total Users</h3>
    <p className="text-2xl font-semibold mt-2">{users.length || 0} </p>
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
           onClick={exportCSV}
            className="ml-4 bg-gray-700 text-white px-4 py-2 rounded"
          >
            Export CSV
          </button>
        </div>      
      </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-teal-700">Admin – Users Overview</h2>

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
          <option value="client">Client</option>
          <option value="provider">Provider</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-teal-100 text-left text-sm">
            {['Full Name', 'Email', 'Role', 'Jobs Posted', 'Total Paid', 'Joined', 'Status', "Suspended", 'Action'].map((label, i) => {
              const keys = ['full_name', 'email', 'role', 'jobs_posted', 'total_paid', 'created_at', 'status', "suspended", 'action'];
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
          {users.map((u) => (
            <tr key={u.id} className="text-sm border-t">
              <td className="py-2 px-4">{u.full_name || '—'}</td>
              <td className="py-2 px-4">{u.email}</td>
              <td className="py-2 px-4 capitalize">{u.role}</td>
             <td className="py-2 px-4">{u.jobs_posted}</td>
             <td className="py-2 px-4">${u.total_paid?.toFixed(2)}</td>  
              <td className="py-2 px-4">{new Date(u.created_at).toLocaleDateString()}</td> 
             { u.active===true?<td className="py-2 px-4 text-green-600">Active</td>:<td className="py-2 px-4 text-red-600">Inactive</td>}
               { u.banned===true?<td className="py-2 px-4 text-red-600">Suspended</td>:<td className="py-2 px-4 text-green-600">None</td>} 
               <td className="py-2 px-4 border space-x-2">   
              
                  <button
                    onClick={() => banXUser(u)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                   { u.banned===true?'Reactivate':'Ban'} 
                  </button>
                  <button
                    onClick={() => deleteXUser(u.id)}
                    className="bg-red-800 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
             <td className="py-2 px-4 text-green-600 hover:text-gray-400"> <Link href={`/profile/${u.id}`}><FontAwesomeIcon icon={faEye}/></Link> </td> 
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

    </div>
    </div>  
</>  );
}
export default AdminUserTable