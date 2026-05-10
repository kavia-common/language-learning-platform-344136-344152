"use client";

import React from "react";
import { Modal } from "@/components/Modal";

type McqOption = { id: string; label: string; correct?: boolean };

type Exercise =
  | {
      id: string;
      kind: "mcq";
      prompt: string;
      options: McqOption[];
      explanation: string;
    }
  | {
      id: string;
      kind: "fill";
      prompt: string;
      answer: string;
      explanation: string;
    };

const sampleExercises: Exercise[] = [
  {
    id: "ex-1",
    kind: "mcq",
    prompt: "Choose the correct translation for “Good morning”.",
    options: [
      { id: "a", label: "Buenas noches" },
      { id: "b", label: "Buenos días", correct: true },
      { id: "c", label: "Gracias" }
    ],
    explanation: "“Buenos días” is commonly used for “Good morning”."
  },
  {
    id: "ex-2",
    kind: "fill",
    prompt: "Fill in the blank: “¿_____ estás?” (How are you?)",
    answer: "Cómo",
    explanation: "“¿Cómo estás?” is the standard phrase for “How are you?”."
  }
];

/**
 * PUBLIC_INTERFACE
 * Interactive exercise panel for a lesson page.
 */
export function LessonExercisePanel() {
  const [current, setCurrent] = React.useState(0);
  const exercise = sampleExercises[current];

  const [mcqChoice, setMcqChoice] = React.useState<string | null>(null);
  const [fillValue, setFillValue] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const [pronModal, setPronModal] = React.useState(false);

  function reset() {
    setMcqChoice(null);
    setFillValue("");
    setSubmitted(false);
  }

  function next() {
    reset();
    setCurrent((i) => Math.min(i + 1, sampleExercises.length - 1));
  }

  function prev() {
    reset();
    setCurrent((i) => Math.max(i - 1, 0));
  }

  const correctness =
    exercise.kind === "mcq"
      ? exercise.options.find((o) => o.id === mcqChoice)?.correct === true
      : fillValue.trim().toLowerCase() === exercise.answer.toLowerCase();

  return (
    <section className="surface bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Exercises</h2>
          <p className="mt-1 text-xs text-gray-500">
            Question {current + 1} of {sampleExercises.length}
          </p>
        </div>

        <button
          type="button"
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          onClick={() => setPronModal(true)}
        >
          Pronunciation check
        </button>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium text-gray-900">{exercise.prompt}</div>

        {exercise.kind === "mcq" ? (
          <div className="mt-3 space-y-2">
            {exercise.options.map((o) => (
              <label
                key={o.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2 hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="mcq"
                  value={o.id}
                  checked={mcqChoice === o.id}
                  onChange={() => setMcqChoice(o.id)}
                />
                <span className="text-sm text-gray-800">{o.label}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="mt-3">
            <input
              value={fillValue}
              onChange={(e) => setFillValue(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-blue-500"
              placeholder="Type your answer…"
            />
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={reset}
          >
            Reset
          </button>
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            onClick={() => setSubmitted(true)}
            disabled={exercise.kind === "mcq" ? !mcqChoice : !fillValue.trim()}
          >
            Submit
          </button>
          <div className="flex-1" />
          <button
            type="button"
            className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            onClick={prev}
            disabled={current === 0}
          >
            Prev
          </button>
          <button
            type="button"
            className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            onClick={next}
            disabled={current === sampleExercises.length - 1}
          >
            Next
          </button>
        </div>

        {submitted ? (
          <div
            className="mt-4 rounded-lg border px-3 py-3 text-sm"
            style={{
              borderColor: correctness ? "rgba(16,185,129,0.6)" : "rgba(239,68,68,0.6)",
              background: correctness ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)"
            }}
            role="status"
            aria-live="polite"
          >
            <div className="font-semibold text-gray-900">{correctness ? "Correct" : "Not quite"}</div>
            <div className="mt-1 text-gray-700">{exercise.explanation}</div>
          </div>
        ) : null}
      </div>

      <Modal
        open={pronModal}
        title="Pronunciation feedback"
        onClose={() => setPronModal(false)}
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setPronModal(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              onClick={() => setPronModal(false)}
            >
              Save
            </button>
          </div>
        }
      >
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            This is a placeholder UI. Once the backend pronunciation endpoint is implemented, this modal will display:
            transcript, score, and actionable feedback.
          </p>
          <div className="surface bg-white p-3">
            <div className="text-xs font-medium text-gray-500">Score</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">82</div>
            <div className="mt-1 text-xs text-gray-500">Tip: Emphasize the stressed syllable.</div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
