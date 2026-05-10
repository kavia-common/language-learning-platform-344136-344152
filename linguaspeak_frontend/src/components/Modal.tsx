"use client";

import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

type ModalProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
  className?: string;
};

/**
 * PUBLIC_INTERFACE
 * Accessible modal dialog with overlay.
 */
export function Modal({ open, title, children, onClose, footer, className }: ModalProps) {
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2">
        <div className={cn("surface bg-white", className)}>
          <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] px-4 py-3">
            <div>
              <div className="text-sm font-semibold text-gray-900">{title}</div>
            </div>
            <button
              type="button"
              className="rounded-md border border-[var(--color-border)] bg-white p-2 text-gray-700 hover:bg-gray-50"
              aria-label="Close dialog"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="px-4 py-4">{children}</div>

          {footer ? (
            <div className="border-t border-[var(--color-border)] px-4 py-3">{footer}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
