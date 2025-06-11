import React, { Suspense } from 'react';
import RecipeGrid from '@/components/RecipeGrid';

export default function RecipesPage({ searchParams }) {
  const { query = '', cuisine = '', time = '' } = searchParams;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search results</h1>
      <Suspense fallback={<p className="text-gray-500">Loading recipes...</p>}>
        <RecipeGrid query={query} cuisine={cuisine} time={time} />
      </Suspense>
    </div>
  );
}
