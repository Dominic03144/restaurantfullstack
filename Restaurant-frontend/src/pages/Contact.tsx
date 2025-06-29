import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-white via-purple-50 to-white shadow-xl rounded-2xl p-8 border border-purple-200 text-black">
        <h2 className="text-3xl font-bold text-center mb-6">
          📬 Contact Us
        </h2>

        {submitted ? (
          <p className="text-black text-center text-lg font-semibold">
            ✅ Thanks! We’ll get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80 text-black"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80 text-black"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-1 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80 text-black"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        )}

        <div className="mt-8 text-sm text-center text-black space-y-1">
          <p>📍 Nairobi, Kenya</p>
          <p>📞 +254 712 345 678</p>
          <p>✉️ dominic.kosgei22@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
