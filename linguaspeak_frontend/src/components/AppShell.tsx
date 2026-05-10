"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BookOpen, Gauge, Trophy, Mic, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const learnerNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: <Gauge className="h-4 w-4" /> },
  { href: "/lessons", label: "Lessons", icon: <BookOpen className="h-4 w-4" /> },
  { href: "/practice", label: "Practice", icon: <Mic className="h-4 w-4" /> },
  { href: "/achievements", label: "Achievements", icon: <Trophy className="h-4 w-4" /> },
];

const adminNav: NavItem[] = [{ href: "/admin", label: "Admin", icon: <Settings className="h-4 w-4" /> }];

function getIsAdmin() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("linguaspeak_role") === "admin";
}

/**
 * PUBLIC_INTERFACE
 * AppShell provides the responsive layout: sidebar + top navbar + content area.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    setIsAdmin(getIsAdmin());
  }, []);

  const items = isAdmin ? [...learnerNav, ...adminNav] : learnerNav;

  const Nav = (
    <nav className="flex flex-col gap-1 px-2 py-3">
      {items.map((item) => {
        const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href + "/"));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              active ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            )}
            onClick={() => setMobileOpen(false)}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-primary)]">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-[var(--color-border)] bg-white p-2 text-gray-700 md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>

            <Link href="/dashboard" className="font-semibold tracking-tight text-gray-900">
              Linguaspeak
            </Link>
            <span className="hidden text-xs text-gray-500 sm:inline">Learn. Practice. Improve.</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/account"
              className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Account
            </Link>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[240px_1fr]">
        {/* Sidebar (desktop) */}
        <aside className="surface hidden h-fit md:block">{Nav}</aside>

        {/* Sidebar (mobile overlay) */}
        {mobileOpen ? (
          <div className="fixed inset-0 z-30 md:hidden" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl">
              <div className="border-b border-[var(--color-border)] px-4 py-3 font-semibold">Menu</div>
              {Nav}
            </div>
          </div>
        ) : null}

        {/* Content */}
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
