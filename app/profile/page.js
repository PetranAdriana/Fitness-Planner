"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProfileStats from "@/components/profile/profile-stats";
import ActivityChart from "@/components/profile/activity-chart";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    stats: [
      {
        name: "Favorite Exercises",
        value: "0",
        icon: (
          <svg
            className="w-6 h-6 text-red-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ),
      },
      {
        name: "Workouts Completed",
        value: "0",
        icon: (
          <svg
            className="w-6 h-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      },
      {
        name: "Minutes Exercised",
        value: "0",
        icon: (
          <svg
            className="w-6 h-6 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      },
    ],
  });

  useEffect(() => {
    // Fetch favorites count
    const fetchFavoritesCount = async () => {
      try {
        const res = await fetch("/api/favorites");
        if (res.ok) {
          const favorites = await res.json();
          setProfile(prev => ({
            ...prev,
            stats: prev.stats.map(stat =>
              stat.name === "Favorite Exercises"
                ? { ...stat, value: favorites.length.toString() }
                : stat
            ),
          }));
        }
      } catch (error) {
        console.error("Error fetching favorites count:", error);
      }
    };

    fetchFavoritesCount();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {profile.name}
          </h1>
          <p className="text-gray-600 mt-2">{profile.email}</p>
        </div>

        {/* Stats Section */}
        <div className="mb-12">
          <ProfileStats stats={profile.stats} />
        </div>

        {/* Activity Chart */}
        <div className="mb-12">
          <ActivityChart />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Create Workout
                </h3>
                <p className="text-gray-600 text-sm">
                  Design your custom workout routine
                </p>
              </div>
            </div>
          </button>

          <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  View History
                </h3>
                <p className="text-gray-600 text-sm">
                  Check your workout history and progress
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
