import Link from "next/link";

type LessonCard = {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
};

const sampleLessons: LessonCard[] = [
  { id: "1", title: "Greetings & Introductions", level: "Beginner", description: "Meet and greet with confidence." },
  { id: "2", title: "Ordering at a Café", level: "Beginner", description: "Polite phrases and quick responses." },
  { id: "3", title: "Directions in Town", level: "Intermediate", description: "Ask for and understand directions." }
];

/**
 * PUBLIC_INTERFACE
 * LessonList renders the list of lessons (wired to sample data until backend endpoints are added).
 */
export function LessonList() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {sampleLessons.map((l) => (
        <Link key={l.id} href={`/lessons/${l.id}`} className="surface bg-white p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-gray-900">{l.title}</div>
              <div className="mt-1 text-xs text-gray-500">{l.description}</div>
            </div>
            <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">{l.level}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
