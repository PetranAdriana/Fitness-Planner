"use client";

export default function ProfileStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white rounded-xl shadow-sm p-6 text-center transform hover:scale-105 transition-transform duration-200"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 mb-4">
            {stat.icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          <p className="text-sm text-gray-600 mt-1">{stat.name}</p>
        </div>
      ))}
    </div>
  );
}
