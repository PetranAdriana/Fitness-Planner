import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
            Welcome to Fitness Planner
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Your personal fitness companion for tracking workouts and achieving your goals
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Exercise Library Card */}
            <Link href="/exercises" className="group">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
                <div className="w-16 h-16 mx-auto mb-6 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Exercise Library</h3>
                <p className="text-gray-600">
                  Browse through our collection of exercises and find the perfect ones for your workout
                </p>
              </div>
            </Link>

            {/* Favorites Card */}
            <Link href="/favorites" className="group">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">My Favorites</h3>
                <p className="text-gray-600">
                  Access your favorite exercises and create personalized workout routines
                </p>
              </div>
            </Link>

            {/* Profile Card */}
            <Link href="/profile" className="group">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
                <div className="w-16 h-16 mx-auto mb-6 bg-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-8 h-8 text-pink-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">My Profile</h3>
                <p className="text-gray-600">
                  View and update your profile settings and track your fitness progress
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
