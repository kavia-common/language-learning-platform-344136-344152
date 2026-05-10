"use client";

import Link from "next/link";
import React from "react";

function isAdmin() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("linguaspeak_role") === "admin";
}

export default function AdminPage() {
  const [allowed, setAllowed] = React.useState(false);

  React.useEffect(() => {
    setAllowed(isAdmin());
  }, []);

  if (!allowed) {
    return (
      <div className="surface bg-white p-5">
        <h1 className="text-lg font-semibold text-gray-900">Admin</h1>
        <p className="mt-2 text-sm text-gray-600">
          You don’t have access. Switch role to <span className="font-medium">Admin</span> on the Account page.
        </p>
        <div className="mt-3">
          <Link
            href="/account"
            className="rounded-lg border border-[var(--color-border)] bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Go to Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="surface bg-white p-5">
        <h1 className="text-lg font-semibold text-gray-900">Admin</h1>
        <p className="mt-1 text-sm text-gray-600">Content management and oversight (scaffold).</p>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <section className="surface bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-900">Lessons</h2>
          <p className="mt-1 text-sm text-gray-600">Create and update lesson content.</p>
          <div className="mt-3 rounded-lg border border-[var(--color-border)] bg-gray-50 p-4 text-sm text-gray-700">
            CRUD UI placeholder. Will be wired to backend admin endpoints once implemented.
          </div>
        </section>

        <section className="surface bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-900">Users</h2>
          <p className="mt-1 text-sm text-gray-600">View learners and progress signals.</p>
          <div className="mt-3 rounded-lg border border-[var(--color-border)] bg-gray-50 p-4 text-sm text-gray-700">
            User overview placeholder.
          </div>
        </section>
      </div>
    </div>
  );
}
