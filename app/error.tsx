"use client";

import React from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-red-600">Something went wrong!</h1>
      <p className="mt-4">{error.message}</p>
      <button onClick={() => reset()} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
        Try again
      </button>
    </div>
  );
}
