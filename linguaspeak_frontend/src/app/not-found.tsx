import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="surface bg-white p-6" role="alert" aria-live="assertive">
      <h1 className="text-lg font-semibold text-gray-900">404 – Page Not Found</h1>
      <p className="mt-2 text-sm text-gray-600">The page you’re looking for doesn’t exist.</p>
      <div className="mt-4">
        <Link href="/dashboard" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
