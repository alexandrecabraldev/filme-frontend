"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  label: string;
  href: string;
};

export function Tabs({ tabs }: { tabs: Tab[] }) {
  const pathname = usePathname();
  return (
    <div className="border-b border-gray-200 mb-4">
      <nav className="-mb-px flex gap-2" aria-label="Tabs">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`${
                active
                  ? "border-blue-400 text-blue-400"
                  : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
              } whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium`}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
