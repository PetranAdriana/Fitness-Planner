export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-cyan-600 mb-6">Terms of Service</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-500 mb-3">Agreement to Terms</h2>
          <p className="text-gray-700">
            By accessing and using Fitness Planner, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-500 mb-3">Use License</h2>
          <p className="text-gray-700 mb-4">
            We grant you a personal, non-exclusive, non-transferable license to use Fitness Planner for personal fitness tracking and planning purposes.
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li>You may not copy or modify the application</li>
            <li>You may not use the application for commercial purposes</li>
            <li>You must respect other users&apos; privacy and rights</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-500 mb-3">User Responsibilities</h2>
          <p className="text-gray-700 mb-4">
            As a user of Fitness Planner, you are responsible for:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li>Maintaining the confidentiality of your account</li>
            <li>Providing accurate information</li>
            <li>Using the service in a lawful manner</li>
            <li>Consulting healthcare professionals before starting any exercise program</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-cyan-500 mb-3">Disclaimer</h2>
          <p className="text-gray-700">
            Fitness Planner is provided &quot;as is&quot; without any warranties. We are not responsible for any injuries or health issues that may result from following exercise plans or advice provided through the application.
          </p>
        </section>
      </div>
    </div>
  );
}
