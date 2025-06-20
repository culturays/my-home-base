"use client"
 
import { deleteUser } from "@/app/actions";
import { deleteInvite, sendInvite, updateRole} from "@/app/dashboard/(ultra-admin)/admin/action";
import { MembersProps, PaymentProps, ProfileProps } from "@/app/types"; 
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"; 

const Admin = ({ user, members, invitesX }:{ user:User, members:MembersProps[], invitesX:ProfileProps[] }) => { 
  const router = useRouter();  
  const [filter, setFilter] = useState('');   

const deleteAxn =(email:string)=>{
deleteInvite(email)
router.refresh()
}
const invsAxn =async (formData:FormData )=>{
await sendInvite(formData)
router.refresh()
}
 
const uptAxn =async (id:number|string, role:string)=>{
await updateRole(id, role, user)
router.refresh()
}
 const filteredMembers = members.filter((m) =>
    m.role?.toLowerCase().includes(filter.toLowerCase()) ||
    m.email?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
 
    <div className="">
   <h1 className="text-2xl font-bold mb-6 text-teal-700">Admin Dashboard: Member Management</h1> 
 <form className="mb-6 flex items-center gap-4" action={invsAxn}>
        <input
          type="email" 
          name="email"
          placeholder="Invite new admin email"
          id="invite-email"
          className="border p-2 rounded mr-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition text-lg"
        />
        <button
         type='submit'
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Send Admin Invite
        </button>
      </form>
      <div className="mb-6 flex items-right gap-4 w-full justify-end"> 
        <input
          type="text"
          placeholder="Filter by email or role"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded mr-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition text-lg"
        />
      </div>

      {/* Admin Invites Section */}
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Pending Admin Invites
      </h2>
      <table className="min-w-full mb-8 bg-white border">
        <thead>
          <tr className="bg-purple-100">
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invitesX.map((invite, i) => (
            <tr key={invite.email + ' ' + 2*i} className="text-sm">
              <td className="py-2 px-4 border">{invite.email}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => deleteAxn(invite.email)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {/* Members Table */}
  
   <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-teal-100"> 
            <th className="py-2 px-4 border">...</th>
            <th className="py-2 px-4 border">Full Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Role</th> 
            <th className="py-2 px-4 border">Jobs</th>
            <th className="py-2 px-4 border">Payments</th>            
            <th className="py-2 px-4 border">Actions</th> 
          </tr>
        </thead>
        <tbody>
          {filter.length>0?filteredMembers.map((member) => (
            <tr key={member.id} className="text-sm">
              <td className="py-2 px-4 border">{member.full_name || '—'}</td>
              <td className="py-2 px-4 border">{member.email}</td>
              <td className="py-2 px-4 border capitalize">{member.role|| '——'}</td>
   <td className="py-2 px-4 border">
              {member.role === 'admin' ? '—' : `${member.jobs?.length || 0} job(s)`}
             </td>
              <td className="py-2 px-4 border">
              {member.role === 'admin' ? '—' : `${member.payments?.length || 0} payment(s)`}
              </td>
                <td className="py-2 px-4 border space-x-2">
                <button
                  onClick={() => uptAxn(member.id, 'client')}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Make Client
                </button>
                <button
                  onClick={() => uptAxn(member.id, 'provider')}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Make Provider
                </button>
             {member.role === 'admin' ?  <button
                  onClick={() => uptAxn(member.id, 'none')}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Reverse Admin
                </button> :  <button
                  onClick={() => uptAxn(member.id, 'admin')}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Make Admin
                </button>}
                    <button
               onClick={() => deleteUser(member.id)}
               className="bg-red-600 text-white px-2 py-1 rounded"
             >
                Delete
              </button>
              </td>
            </tr>
          )):members.map((member) => (
            <tr key={member.id} className="text-sm"><td className="py-2 px-4 text-green-600 hover:text-gray-400"><Link href={`/profile/${member.id}`}><FontAwesomeIcon icon={faEye}/></Link></td><td className="py-2 px-4 border">{member.full_name || '—'}</td>
              <td className="py-2 px-4 border">{member.email}</td>
              <td className="py-2 px-4 border capitalize">{member.role|| '——'}</td>
   <td className="py-2 px-4 border">
              {member.role === 'admin' ? '—' : `${member.jobs?.length || 0} job(s)`}
             </td>
              <td className="py-2 px-4 border">
              {member.role === 'admin' ? '—' : `${member.payments?.length || 0} payment(s)`}
              </td>
  <td className="py-2 px-4 border space-x-2">
                <button
                  onClick={() => uptAxn(member.id, 'client')}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Make Client
                </button>
                <button
                  onClick={() => uptAxn(member.id, 'provider')}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Make Provider
                </button>
             {member.role === 'admin' ?  <button
                  onClick={() => uptAxn(member.id, 'none')}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Reverse Admin
                </button> :  <button
                  onClick={() => uptAxn(member.id, 'admin')}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Make Admin
                </button>}
                    <button
               onClick={() => deleteUser(member.id)}
               className="bg-red-600 text-white px-2 py-1 rounded"
             >
                Delete
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>  
    </div> 
  )
}

export default Admin