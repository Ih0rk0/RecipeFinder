import React, { Suspense } from 'react';
import RecipeDetailsContent from '@/components/RecipeDetailsContent';

export default function RecipeDetailsPage({ params }) {
  return (
    <div className="container mx-auto p-4">
      <Suspense
        fallback={
          <p className="text-gray-500 text-center">Loading a recipe...</p>
        }
      >
        <RecipeDetailsContent params={params} />
      </Suspense>
    </div>
  );
}
