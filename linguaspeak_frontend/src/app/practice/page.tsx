"use client";

import React from "react";
import { WsClient } from "@/lib/ws";
import { Modal } from "@/components/Modal";

export default function PracticePage() {
  const [connected, setConnected] = React.useState(false);
  const [latest, setLatest] = React.useState<string>("(none)");
  const [achModal, setAchModal] = React.useState(false);

  React.useEffect(() => {
    const ws = new WsClient();
    ws.connect("/ws"); // backend WS path to be implemented in backend step

    const off = ws.onMessage((data) => {
      setLatest(typeof data === "string" ? data : JSON.stringify(data));
      // Example: achievement event
      setAchModal(true);
    });

    // We can't reliably detect open without attaching handlers to internal ws, so show "attempting".
    setConnected(true);

    return () => {
      off();
      ws.disconnect();
      setConnected(false);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="surface bg-white p-5">
        <h1 className="text-lg font-semibold text-gray-900">Practice</h1>
        <p className="mt-1 text-sm text-gray-600">Pronunciation practice and real-time feedback (wired via WebSocket).</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-blue-50 px-2 py-1 font-medium text-blue-700">
            WS: {connected ? "connected (client)" : "disconnected"}
          </span>
          <span className="text-gray-500">Latest message: {latest}</span>
        </div>
      </div>

      <div className="surface bg-white p-5">
        <h2 className="text-sm font-semibold text-gray-900">Say it out loud</h2>
        <p className="mt-1 text-sm text-gray-600">
          Try: <span className="font-medium text-gray-900">“Buenos días”</span>
        </p>
        <div className="mt-4 rounded-lg border border-dashed border-[var(--color-border)] bg-gray-50 p-6 text-sm text-gray-700">
          Recording UI placeholder. In the next backend step, this will POST audio/text for scoring and show results.
        </div>
      </div>

      <Modal
        open={achModal}
        title="Achievement unlocked"
        onClose={() => setAchModal(false)}
        footer={
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              onClick={() => setAchModal(false)}
            >
              Nice!
            </button>
          </div>
        }
      >
        <p className="text-sm text-gray-700">
          You earned <span className="font-semibold text-gray-900">“First Practice”</span>. Keep practicing to unlock more.
        </p>
      </Modal>
    </div>
  );
}
