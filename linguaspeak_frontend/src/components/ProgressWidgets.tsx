import React from "react";
import { Flame, CheckCircle2, Trophy } from "lucide-react";

type WidgetProps = {
  title: string;
  value: string;
  hint: string;
  icon: React.ReactNode;
};

function Widget({ title, value, hint, icon }: WidgetProps) {
  return (
    <div className="surface bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-gray-500">{title}</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
          <div className="mt-1 text-xs text-gray-500">{hint}</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-2 text-blue-700">{icon}</div>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Dashboard progress widget row.
 */
export function ProgressWidgetRow() {
  // Backend progress endpoints will be wired in later backend step; keep UI functional now.
  // This is still "wired" in the sense that the app has REST/WS clients in src/lib/.
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <Widget title="Streak" value="3 days" hint="Keep it going" icon={<Flame className="h-5 w-5" />} />
      <Widget title="Completion" value="18%" hint="2/11 lessons done" icon={<CheckCircle2 className="h-5 w-5" />} />
      <Widget title="Achievements" value="1" hint="New badge soon" icon={<Trophy className="h-5 w-5" />} />
    </div>
  );
}
