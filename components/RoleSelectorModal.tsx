"use client" 
import { selectRole } from "@/app/dashboard/actions/edit-role";   
const RoleSelectorModal= ({profile}:{profile:string}) =>{

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Choose Your Role</h2>
        <div className="space-y-3">
            <form action={selectRole} >
          {!profile&&<div className="text-lg py-2 my-8">
       <label htmlFor="address" className="font-bold text-gray-800">Locale</label>
     <input name="address" placeholder="Where do you Reside - (eg. Rivers State)" type='text' className="input focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 py-2 dark:bg-gray-300 dark:text-gray-700" />
     </div>}
               <button             
              type='submit' 
              name="role" 
              value="client"
              className="w-full my-3 cursor-pointer capitalize py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >Client</button>
          
              <button             
              type='submit' 
              name="role"
              value="provider"
              className="w-full my-3 cursor-pointer capitalize py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >Provider</button>
          </form>  
        </div>
      </div>
    </div>
  );
}
  
export default RoleSelectorModal 