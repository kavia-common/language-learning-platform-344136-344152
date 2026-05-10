import { LessonList } from "@/components/LessonList";

export default function LessonsPage() {
  return (
    <div className="space-y-4">
      <div className="surface bg-white p-5">
        <h1 className="text-lg font-semibold text-gray-900">Lessons</h1>
        <p className="mt-1 text-sm text-gray-600">Choose a lesson and start practicing.</p>
      </div>

      <LessonList />
    </div>
  );
}
