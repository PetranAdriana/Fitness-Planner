"use client";

export default function ProfileStats({ stats }) {
  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-full">
          <svg
            className="w-6 h-6 text-primary-500 dark:text-primary-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Favorite Exercises
          </h3>
          <p className="text-3xl font-semibold text-primary-600 dark:text-primary-400">
            {stats?.favoriteExercises || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
