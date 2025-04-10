export default function ContactPage() {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            We&apos;re here to help. Reach out with any questions, concerns, or feedback.
          </p>
        </div>
  
        {/* Contact Form */}
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
  
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Your message..."
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
  
          <div className="text-center">
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Send Message
            </button>
          </div>
        </form>
  
        {/* Additional Contact Info */}
        <div className="mt-16 text-center text-gray-600 text-sm">
          <p>Email: support@shoply.com</p>
          <p>Phone: +1 (800) 123-4567</p>
          <p>Address: 123 Commerce St, Los Angeles, CA 90001</p>
        </div>
      </section>
    );
  }
  