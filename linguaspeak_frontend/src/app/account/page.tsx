"use client";

import React from "react";
import { setAuthToken } from "@/lib/api";

export default function AccountPage() {
  const [role, setRole] = React.useState<"learner" | "admin">("learner");

  React.useEffect(() => {
    const existing = window.localStorage.getItem("linguaspeak_role");
    if (existing === "admin") setRole("admin");
  }, []);

  function applyRole(nextRole: "learner" | "admin") {
    setRole(nextRole);
    window.localStorage.setItem("linguaspeak_role", nextRole);

    // Placeholder token management until backend auth is implemented.
    if (nextRole === "admin") setAuthToken("dev-admin-token");
    else setAuthToken(null);
  }

  return (
    <div className="space-y-4">
      <div className="surface bg-white p-5">
        <h1 className="text-lg font-semibold text-gray-900">Account</h1>
        <p className="mt-1 text-sm text-gray-600">Basic local-only account controls (dev scaffold).</p>
      </div>

      <div className="surface bg-white p-5">
        <h2 className="text-sm font-semibold text-gray-900">Role</h2>
        <p className="mt-1 text-sm text-gray-600">
          Toggle role to reveal the Admin route. This will be replaced with real auth/roles from the backend.
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              role === "learner"
                ? "bg-blue-600 text-white"
                : "border border-[var(--color-border)] bg-white text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => applyRole("learner")}
          >
            Learner
          </button>
          <button
            type="button"
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              role === "admin"
                ? "bg-blue-600 text-white"
                : "border border-[var(--color-border)] bg-white text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => applyRole("admin")}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}
