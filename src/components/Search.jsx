// components/SearchPage.jsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(false);
  const isValid = query.trim() !== '' || cuisine !== '' || time !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (cuisine) params.set('cuisine', cuisine);
    if (time) params.set('time', time);
    if (query && cuisine && time) {
      router.push(`/recipes?${params.toString()}`);
    } else {
      setError(true);
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Recipe Finder</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="query">
              Search query
            </label>
            <input
              id="query"
              name="query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. pasta"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="cuisine">
              Cuisine
            </label>
            <select
              id="cuisine"
              name="cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            >
              <option value="">— Choose one —</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Chinese">Chinese</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="time">
              Max preparation time (min)
            </label>
            <input
              id="time"
              name="time"
              type="number"
              min="1"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 30"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-2 rounded font-semibold ${
              isValid
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Next
          </button>
          {error ? <div className="text-red-500">Fill all fields</div> : null}
        </form>
      </div>
    </div>
  );
}
