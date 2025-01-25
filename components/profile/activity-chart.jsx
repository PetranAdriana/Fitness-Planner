"use client";

export default function ActivityChart() {
  // This is a placeholder for a future chart implementation
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Overview</h3>
      <div className="h-64 flex items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <svg
              className="w-full h-full text-indigo-600/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <p className="text-gray-600">Activity chart coming soon!</p>
          <p className="text-sm text-gray-500 mt-2">
            Track your workout progress and achievements
          </p>
        </div>
      </div>
    </div>
  );
}
