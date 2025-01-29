"use client";

import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
      duration: 3000,
    });

    // Reset form
    e.target.reset();
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen pt-32">
      <h1 className="text-3xl font-bold text-cyan-600 mb-6">Contact Us</h1>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
              required
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 transition-colors duration-200"
            >
              Send Message
            </button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-cyan-500 mb-4">
            Other Ways to Reach Us
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Email:</strong> support@fitnessplanner.com
            </p>
            <p>
              <strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
