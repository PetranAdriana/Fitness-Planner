import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-6">
            Welcome to Fitness Planner
          </h1>
          <p className="relative w-[max-content] mx-auto font-mono text-xl text-neutral-600 dark:text-neutral-300 mb-12
            before:absolute before:inset-0 before:animate-typewriter before:bg-background">
            Your personal fitness companion for tracking workouts and achieving your goals
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Exercise Library Card */}
            <Link href="/exercises" className="block group">
              <div className="h-full bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-border">
                <div className="w-14 h-14 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-7 h-7 text-primary-600 dark:text-primary-300"
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
                <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-300 mb-2">
                  Exercise Library
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                  Browse through our collection of exercises and find the
                  perfect ones for your workout
                </p>
              </div>
            </Link>

            {/* Favorites Card */}
            <Link href="/favorites" className="block group">
              <div className="h-full bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-border">
                <div className="w-14 h-14 mx-auto mb-4 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-7 h-7 text-accent-600 dark:text-accent-300"
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
                <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-300 mb-2">
                  My Favorites
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                  Access your favorite exercises and create personalized workout
                  routines
                </p>
              </div>
            </Link>

            {/* Profile Card */}
            <Link href="/profile" className="block group">
              <div className="h-full bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-border">
                <div className="w-14 h-14 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-7 h-7 text-primary-600 dark:text-primary-300"
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
                <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-300 mb-2">
                  My Profile
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                  View and update your profile settings and track your fitness
                  progress
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
