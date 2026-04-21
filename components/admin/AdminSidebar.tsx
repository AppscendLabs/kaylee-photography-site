"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Calendar, DollarSign, Inbox, LogOut, Settings } from "lucide-react";
import { logoutAdmin } from "@/app/actions/auth";
import type { AdminTab } from "@/types";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  adminName: string;
}

const TABS: { label: string; value: AdminTab; Icon: React.ElementType }[] = [
  { label: "Client Requests", value: "requests", Icon: Inbox },
  { label: "Availability", value: "schedule", Icon: Calendar },
  { label: "Package Deposits", value: "packages", Icon: DollarSign },
  { label: "Settings & Stripe", value: "settings", Icon: Settings },
];

export default function AdminSidebar({ activeTab, onTabChange, adminName }: AdminSidebarProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleLogout() {
    startTransition(async () => {
      await logoutAdmin();
      router.refresh();
    });
  }

  return (
    <aside className="w-full md:w-64 bg-white border-r border-neutral-200 p-6 flex flex-col h-auto md:h-[calc(100vh-80px)] md:sticky md:top-20">
      <div className="mb-12 hidden md:block">
        <h2 className="text-xl font-serif">Welcome, {adminName.split(" ")[0]}</h2>
        <p className="text-xs text-neutral-500 mt-1">Manage your bookings</p>
      </div>

      <nav className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
        {TABS.map(({ label, value, Icon }) => (
          <button
            key={value}
            onClick={() => onTabChange(value)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-sm transition-colors whitespace-nowrap",
              activeTab === value
                ? "bg-neutral-100 text-black font-medium"
                : "text-neutral-500 hover:text-black hover:bg-neutral-50"
            )}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto hidden md:block pt-8 border-t border-neutral-200">
        <button
          onClick={handleLogout}
          disabled={isPending}
          className="flex items-center gap-3 text-sm text-neutral-500 hover:text-black transition-colors w-full px-4 py-2 disabled:opacity-50"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
