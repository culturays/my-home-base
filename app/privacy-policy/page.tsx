"use client"
const Privacy = () => {
  return (
   <div className="bg-white px-6 py-12 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-teal-600">Privacy Policy</h1>
      
      <p className="mb-4">
        This Privacy Policy describes how we collect, use, and share information when you use our online marketplace (“Service”). By using our Service, you agree to the terms outlined in this policy.
      </p>

      <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Personal Information: Name, email, phone, address.</li>
        <li>Payment Information: Collected and processed securely by third-party providers.</li>
        <li>Usage Data: Pages visited, clicks, device type, and IP address (via cookies or analytics tools).</li>
      </ul>

      <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use your information to:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Provide, operate, and maintain the marketplace.</li>
        <li>Process transactions and customer support.</li>
        <li>Improve our services and personalize user experience.</li>
        <li>Send updates, marketing, or promotional content (you may opt out).</li>
      </ul>

      <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-2">3. Sharing with Third Parties</h2>
      <p className="mb-4">
        We may share data with:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Google (e.g. for analytics or ads).</li>
        <li>Payment providers.</li>
        <li>Shipping or logistics partners (for delivery).</li>
        <li>Government or legal authorities if required.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-2">4. Cookies and Tracking</h2>
      <p className="mb-4">
        We use cookies and similar technologies (including Google Analytics) to track user activity and enhance your experience. You may disable cookies in your browser settings.
      </p>

      <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-2">5. Your Data Rights</h2>
      <p className="mb-4">
        You can:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Request access, correction, or deletion of your data.</li>
        <li>Withdraw consent at any time.</li>
        <li>Opt-out of promotional communications.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-2">6. Children's Privacy</h2>
      <p className="mb-4">
        Our marketplace is not intended for children under 13. We do not knowingly collect personal information from children.
      </p>

      <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-2">7. Updates to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy periodically. Changes will be posted here, with a new effective date.
      </p>

      <h2 className="text-2xl font-semibold text-orange-500 mt-8 mb-2">8. Contact Us</h2>
      <p className="mb-4">
        If you have questions, contact us at: <span className="text-teal-700 font-medium">info@gowork.africareinvented.com</span>
      </p>

      <p className="text-sm text-gray-500 mt-6">Effective Date: June 20, 2025</p>
    </div>
  )
}

 

const PrivacyPage = () => {
  return (
  <Privacy/> 
  )
}
 
export default PrivacyPage
 