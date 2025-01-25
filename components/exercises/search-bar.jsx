import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl 
                   bg-white bg-opacity-80 backdrop-blur-sm
                   text-gray-900 placeholder:text-gray-400
                   focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                   transition duration-200
                   shadow-sm hover:shadow-md"
          placeholder="Search exercises by name, target muscle, or equipment..."
        />
      </div>
    </form>
  );
}
