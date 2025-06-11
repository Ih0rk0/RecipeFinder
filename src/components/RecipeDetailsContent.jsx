import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default async function RecipeDetailsContent({ params }) {
  const { id } = params;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
    { next: { revalidate: 60 } }
  );
  const recipe = await res.json();

  return (
    <>
      <Link href="/" className="text-blue-600 hover:underline">
        Back to search
      </Link>
      <div className="mt-4">
        <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
        <div className="w-full max-w-md rounded overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={600}
            height={400}
            className="object-cover"
          />
        </div>
        <p className="mt-4">
          Ready in {recipe.readyInMinutes} minutes | Servings: {recipe.servings}
        </p>
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        />
        <h2 className="text-2xl font-semibold mt-6 mb-2">Ingredients</h2>
        <ul className="list-disc list-inside mb-6">
          {recipe.extendedIngredients.map((ing) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Instructions</h2>
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      </div>
    </>
  );
}
