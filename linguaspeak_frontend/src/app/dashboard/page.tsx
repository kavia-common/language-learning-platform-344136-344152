"use client";

import React from "react";
import Link from "next/link";
import { ProgressWidgetRow } from "@/components/ProgressWidgets";
import { getBackendHealth } from "@/lib/api";

export default function DashboardPage() {
  const [health, setHealth] = React.useState<"unknown" | "ok" | "error">("unknown");

  React.useEffect(() => {
    let mounted = true;
    getBackendHealth()
      .then(() => mounted && setHealth("ok"))
      .catch(() => mounted && setHealth("error"));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="surface bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">Your progress at a glance.</p>
          </div>
          <div className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs text-gray-700">
            Backend:{" "}
            <span className={health === "ok" ? "text-green-700" : health === "error" ? "text-red-700" : "text-gray-500"}>
              {health}
            </span>
          </div>
        </div>
      </div>

      <ProgressWidgetRow />

      <div className="surface bg-white p-5">
        <h2 className="text-sm font-semibold text-gray-900">Continue learning</h2>
        <p className="mt-1 text-sm text-gray-600">Pick up where you left off.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href="/lessons/1" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Resume Lesson 1
          </Link>
          <Link
            href="/practice"
            className="rounded-lg border border-[var(--color-border)] bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Practice pronunciation
          </Link>
        </div>
      </div>
    </div>
  );
}
