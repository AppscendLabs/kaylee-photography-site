"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import RequestsTab from "./tabs/RequestsTab";
import ScheduleTab from "./tabs/ScheduleTab";
import SettingsTab from "./tabs/SettingsTab";
import PackageSettingsTab from "./tabs/PackageSettingsTab";
import type { AdminTab, AvailabilityData, BookingRequest, PackageSetting } from "@/types";

interface AdminDashboardProps {
  bookings: BookingRequest[];
  packageSettings: PackageSetting[];
  availability: AvailabilityData;
  adminName: string;
}

export default function AdminDashboard({
  bookings,
  packageSettings,
  availability,
  adminName,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("requests");

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex flex-col md:flex-row">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} adminName={adminName} />

      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl"
        >
          {activeTab === "requests" && <RequestsTab bookings={bookings} />}
          {activeTab === "schedule" && (
            <ScheduleTab
              blockedDates={availability.blockedDates}
              workingDays={availability.workingDays}
              timeSlots={availability.timeSlots}
            />
          )}
          {activeTab === "settings" && <SettingsTab />}
          {activeTab === "packages" && <PackageSettingsTab settings={packageSettings} />}
        </motion.div>
      </main>
    </div>
  );
}
