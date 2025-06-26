"use client"
import { siteContacts } from "@/app/contact/actions/contact"
import { useState } from "react"; 

const ContactForm = () => {
    const [status, setStatus]=useState<string | null>('') 
    const sendCreate =async () => {
      const { message }= await siteContacts({} as FormData)
      setStatus(message)
  }; 
    
  return (
    <div>
       <form action={sendCreate} className="mt-10 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-teal-700 dark:text-teal-200">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required 
              // onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-teal-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-teal-700 dark:text-teal-200">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              // value={formData.email}
              // onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-teal-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-teal-700 dark:text-teal-200">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              // value={formData.message}
              // onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-teal-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Send Message
            </button>
             {status && <p className="mt-4 text-sm text-teal-700 dark:text-teal-300">{status}</p>}  
          </div>
        </form>
    </div>
  )
}

export default ContactForm
