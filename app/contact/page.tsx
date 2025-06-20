// components/ContactForm.tsx 

import { siteContacts } from "./actions/contact";

export default async function ContactForm() { 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  }; 

  return (
    <div className="min-h-screen bg-teal-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-teal-800 dark:text-teal-300">Contact Us</h2>
        <p className="mt-4 text-lg text-teal-700 dark:text-teal-400">
          We'd love to hear from you!
        </p>

        <form action={siteContacts} className="mt-10 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-teal-700 dark:text-teal-200">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required 
              // onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-teal-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
              className="mt-1 block w-full rounded-lg border-teal-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
              className="mt-1 block w-full rounded-lg border-teal-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Send Message
            </button>
            {/* {status && <p className="mt-4 text-sm text-teal-700 dark:text-teal-300">{status}</p>} */}
          </div>
        </form>

        <div className="mt-12 border-t border-teal-200 dark:border-gray-700 pt-6 text-teal-700 dark:text-teal-300 space-y-2">
          <p><strong>📍 Address:</strong> 123 Teal Street, Orange City</p>
          <p><strong>📞 Phone:</strong> +1 (555) 123-4567</p>
          <p><strong>✉️ Email:</strong> contact@yourcompany.com</p>
        </div>
      </div>
    </div>
  );
}
