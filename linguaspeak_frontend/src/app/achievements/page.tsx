export default function AchievementsPage() {
  return (
    <div className="space-y-4">
      <div className="surface bg-white p-5">
        <h1 className="text-lg font-semibold text-gray-900">Achievements</h1>
        <p className="mt-1 text-sm text-gray-600">Badges earned through consistent learning.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="surface bg-white p-4">
          <div className="text-sm font-semibold text-gray-900">First Lesson</div>
          <div className="mt-1 text-xs text-gray-500">Complete your first lesson.</div>
        </div>
        <div className="surface bg-white p-4">
          <div className="text-sm font-semibold text-gray-900">First Practice</div>
          <div className="mt-1 text-xs text-gray-500">Start a pronunciation practice session.</div>
        </div>
      </div>
    </div>
  );
}
