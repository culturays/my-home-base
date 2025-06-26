
import ContactForm from "@/components/ContactForm";

export default async function ContactFormPage() { 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  }; 

 
  return (
    <div className="min-h-screen bg-teal-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 w-[600px] mx-auto">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-extrabold text-teal-800 dark:text-teal-300">Contact Us</h2>
        <p className="mt-4 text-lg text-teal-700 dark:text-teal-400">
          We'd love to hear from you!
        </p>

       <ContactForm/>

        <div className="mt-12 border-t border-teal-200 dark:border-gray-700 pt-6 text-teal-700 dark:text-teal-300 space-y-2">
          <p><strong>📍 Address:</strong> Lagos, Nigeria</p>
          {/* <p><strong>📞 Phone:</strong> +1 (555) 123-4567</p> */}
          <p><strong>✉️ Email:</strong> info@gowork.africareinvented.com</p>
        </div>
      </div>
    </div>
  );
}
