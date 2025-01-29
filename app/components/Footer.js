export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-cyan-500 text-white py-4 shadow-lg z-50">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <p className="text-sm">
              &copy; 2025 Fitness Planner. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6 mt-2">
            <a href="/privacy-policy" className="text-white hover:text-gray-200 text-sm">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-white hover:text-gray-200 text-sm">
              Terms of Service
            </a>
            <a href="/contact" className="text-white hover:text-gray-200 text-sm">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
