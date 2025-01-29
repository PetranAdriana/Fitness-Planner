export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen pt-32">
      <h1 className="text-3xl font-bold text-cyan-600 mb-6">Privacy Policy</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-500 mb-3">
            Information We Collect
          </h2>
          <p className="text-gray-700 mb-4">
            We collect information that you provide directly to us when using
            the Fitness Planner application, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li>Personal information (name, email address)</li>
            <li>Fitness-related data (workout plans, exercise records)</li>
            <li>User preferences and settings</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-500 mb-3">
            How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-4">
            We use the collected information to:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li>Provide and improve our services</li>
            <li>Personalize your experience</li>
            <li>Send important notifications about your account</li>
            <li>Analyze app usage to improve functionality</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-500 mb-3">
            Data Security
          </h2>
          <p className="text-gray-700">
            We implement appropriate security measures to protect your personal
            information. However, no method of transmission over the internet is
            100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-cyan-500 mb-3">
            Contact Us
          </h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact
            us through our Contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
