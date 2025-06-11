import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default async function RecipeGrid({ query, cuisine, time }) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const params = new URLSearchParams({
    apiKey,
    query,
    cuisine,
    maxReadyTime: time,
    number: 6,
  });

  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?${params}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) {
    throw new Error(`Помилка запиту: ${res.status}`);
  }

  const data = await res.json();
  const recipes = data.results || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {recipes.map((r) => (
        <Link
          key={r.id}
          href={`/recipes/${r.id}`}
          className="block border rounded overflow-hidden hover:shadow-lg"
        >
          <div className="w-full h-48 relative">
            <Image
              src={r.image}
              alt={r.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <h2 className="p-2 font-semibold">{r.title}</h2>
        </Link>
      ))}
    </div>
  );
}
