import Link from "next/link";

export default function Home() {
  return (
    <div className="surface bg-white p-6">
      <h1 className="text-xl font-semibold text-gray-900">Welcome to Linguaspeak</h1>
      <p className="mt-2 text-sm text-gray-600">
        Start with your dashboard to view progress, pick a lesson, and practice pronunciation.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/dashboard" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Go to Dashboard
        </Link>
        <Link
          href="/lessons"
          className="rounded-lg border border-[var(--color-border)] bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Browse Lessons
        </Link>
      </div>
    </div>
  );
}
