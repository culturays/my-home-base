import Link from "next/link"

const ServicesPage=() =>{
  return (
    <div className="bg-white text-gray-800">
      {/* Hero */}
      <section className="bg-teal-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">What We Offer</h1>
        <p className="max-w-xl mx-auto text-lg">
          Our online marketplace connects clients with trusted service providers — fast and easy.
        </p>
      </section>

      {/* Service Categories */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-700 mb-10 text-center">Our Core Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '🧹',
              title: 'Home & Cleaning',
              desc: 'Book trusted cleaners, repair experts, or home help near you.',
            },
            {
              icon: '🚚',
              title: 'Errand & Delivery',
              desc: 'Need something picked up or delivered? Our errand runners got you.',
            },
            {
              icon: '💻',
              title: 'Tech Support',
              desc: 'Hire freelancers for design, websites, and tech support services.',
            },
            {
              icon: '📝',
              title: 'Content & Writing',
              desc: 'Writers, bloggers, and editors ready to assist with your content needs.',
            },
            {
              icon: '📸',
              title: 'Photography & Media',
              desc: 'Book local photographers, videographers, or editors.',
            },
            {
              icon: '👷‍♂️',
              title: 'Specialized Services',
              desc: 'Plumbers, electricians, tutors, stylists, and more — just a click away.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-orange-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-orange-600 mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-teal-50 py-16 px-6">
        <h2 className="text-3xl font-bold text-teal-700 mb-10 text-center">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
          {[
            { step: '1. Post a Task', desc: 'Describe the service you need in a few steps.' },
            { step: '2. Get Matched', desc: 'We connect you with trusted providers nearby.' },
            { step: '3. Chat & Agree', desc: 'Discuss terms, pricing, and confirm the job.' },
            { step: '4. Complete & Pay', desc: 'Service is delivered, payment is processed.' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 border-t-4 border-teal-500">
              <h3 className="text-xl font-semibold text-orange-600">{item.step}</h3>
              <p className="mt-2 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 px-6">
        <h2 className="text-3xl font-bold text-teal-700 mb-4">Ready to get started?</h2>
        <p className="mb-6 text-gray-700">Sign up now to post a task or offer your services.</p>
        <Link
          href="/sign-up"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow"
        >
          Join the Marketplace
        </Link>
      </section>
    </div>
  )
}
export default ServicesPage 