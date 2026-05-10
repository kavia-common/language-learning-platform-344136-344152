import { LessonExercisePanel } from "@/components/LessonExercisePanel";
import { ProgressWidgetRow } from "@/components/ProgressWidgets";

/**
 * PUBLIC_INTERFACE
 * Static export requires dynamic routes to provide a finite set of params.
 * This is sample data until backend-driven lesson routing is added.
 */
export function generateStaticParams() {
  return [{ lessonId: "1" }, { lessonId: "2" }, { lessonId: "3" }];
}

export default async function LessonDetailPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;

  return (
    <div className="space-y-4">
      <div className="surface bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Lesson {lessonId}</h1>
            <p className="mt-1 text-sm text-gray-600">
              Lesson content area (text/audio placeholders) plus exercises panel.
            </p>
          </div>
          <div className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">Estimated: 6 min</div>
        </div>

        <div className="mt-4 space-y-3">
          <section className="rounded-lg border border-[var(--color-border)] bg-white p-4">
            <h2 className="text-sm font-semibold text-gray-900">Key phrases</h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
              <li>Buenos días — Good morning</li>
              <li>¿Cómo estás? — How are you?</li>
              <li>Mucho gusto — Nice to meet you</li>
            </ul>
          </section>

          <section className="rounded-lg border border-[var(--color-border)] bg-white p-4">
            <h2 className="text-sm font-semibold text-gray-900">Mini dialogue</h2>
            <p className="mt-2 text-sm text-gray-700">
              A: Buenos días. ¿Cómo estás?
              <br />
              B: Muy bien, gracias. ¿Y tú?
            </p>
          </section>
        </div>
      </div>

      <ProgressWidgetRow />

      <LessonExercisePanel />
    </div>
  );
}
