// app/page.jsx
'use client'; // якщо цей файл теж клієнтський
import React, { Suspense, lazy } from 'react';

// динамічний імпорт
const SearchPage = lazy(() => import('@/components/Search'));

export default function HomePage() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <SearchPage />
    </Suspense>
  );
}
