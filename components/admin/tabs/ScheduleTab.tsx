"use client";

import { useState, useTransition } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Plus, Trash2 } from "lucide-react";
import {
  blockDate,
  unblockDate,
  updateWorkingDay,
  addTimeSlot,
  removeTimeSlot,
  toggleTimeSlot,
} from "@/app/actions/availability";
import { cn } from "@/lib/utils";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface ScheduleTabProps {
  blockedDates: string[];
  workingDays: { dayOfWeek: number; isActive: boolean }[];
  timeSlots: { time: string; isActive: boolean }[];
}

export default function ScheduleTab({ blockedDates: initialBlocked, workingDays: initialDays, timeSlots: initialSlots }: ScheduleTabProps) {
  const [isPending, startTransition] = useTransition();
  const [blocked, setBlocked] = useState<Date[]>(initialBlocked.map((d) => new Date(d)));
  const [days, setDays] = useState(initialDays);
  const [slots, setSlots] = useState(initialSlots);
  const [newTime, setNewTime] = useState("");
  const [newTimeError, setNewTimeError] = useState("");

  function handleDayClick(date: Date | undefined) {
    if (!date) return;
    const normalized = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const isBlocked = blocked.some((b) => b.toISOString() === normalized.toISOString());

    startTransition(async () => {
      if (isBlocked) {
        await unblockDate(date);
        setBlocked((prev) => prev.filter((b) => b.toISOString() !== normalized.toISOString()));
      } else {
        await blockDate(date);
        setBlocked((prev) => [...prev, normalized]);
      }
    });
  }

  function handleToggleDay(dayOfWeek: number, isActive: boolean) {
    startTransition(async () => {
      await updateWorkingDay(dayOfWeek, isActive);
      setDays((prev) => prev.map((d) => d.dayOfWeek === dayOfWeek ? { ...d, isActive } : d));
    });
  }

  function handleToggleSlot(time: string, isActive: boolean) {
    startTransition(async () => {
      await toggleTimeSlot(time, isActive);
      setSlots((prev) => prev.map((s) => s.time === time ? { ...s, isActive } : s));
    });
  }

  function handleRemoveSlot(time: string) {
    startTransition(async () => {
      await removeTimeSlot(time);
      setSlots((prev) => prev.filter((s) => s.time !== time));
    });
  }

  function handleAddSlot() {
    const trimmed = newTime.trim();
    if (!trimmed) { setNewTimeError("Enter a time."); return; }
    if (slots.some((s) => s.time === trimmed)) { setNewTimeError("Already exists."); return; }
    setNewTimeError("");
    startTransition(async () => {
      await addTimeSlot(trimmed);
      setSlots((prev) => [...prev, { time: trimmed, isActive: true }]);
      setNewTime("");
    });
  }

  return (
    <div>
      <h2 className="text-3xl font-serif mb-3">Manage Availability</h2>
      <p className="text-sm font-light text-neutral-500 mb-10">
        Block specific dates, set working days, and manage available time slots.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar — block/unblock dates */}
        <div className="bg-white border border-neutral-200 p-6">
          <h3 className="text-sm uppercase tracking-widest font-medium mb-1">Blocked Dates</h3>
          <p className="text-xs text-neutral-400 font-light mb-4">Click a date to block or unblock it. Blocked dates won&apos;t appear as available to clients.</p>
          <DayPicker
            mode="multiple"
            selected={blocked}
            onDayClick={handleDayClick}
            disabled={{ before: new Date() }}
            modifiersClassNames={{ selected: "!bg-black !text-white rounded-none" }}
            className="font-sans font-light text-sm"
          />
          {blocked.length > 0 && (
            <div className="mt-4 border-t border-neutral-100 pt-4">
              <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2">Blocked</p>
              <div className="flex flex-wrap gap-2">
                {blocked.map((d) => (
                  <span key={d.toISOString()} className="text-xs bg-neutral-100 px-2 py-1 flex items-center gap-1.5">
                    {d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}
                    <button onClick={() => handleDayClick(new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))} className="text-neutral-400 hover:text-black">×</button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {/* Working days */}
          <div className="bg-white border border-neutral-200 p-6">
            <h3 className="text-sm uppercase tracking-widest font-medium mb-1">Working Days</h3>
            <p className="text-xs text-neutral-400 font-light mb-4">Select which days of the week you accept bookings.</p>
            <div className="grid grid-cols-2 gap-2">
              {days.map((d) => (
                <button
                  key={d.dayOfWeek}
                  onClick={() => handleToggleDay(d.dayOfWeek, !d.isActive)}
                  disabled={isPending}
                  className={cn(
                    "py-2.5 px-4 text-sm font-light border transition-colors text-left",
                    d.isActive
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-400 border-neutral-200 hover:border-neutral-400"
                  )}
                >
                  {DAY_NAMES[d.dayOfWeek]}
                </button>
              ))}
            </div>
          </div>

          {/* Time slots */}
          <div className="bg-white border border-neutral-200 p-6">
            <h3 className="text-sm uppercase tracking-widest font-medium mb-1">Time Slots</h3>
            <p className="text-xs text-neutral-400 font-light mb-4">Toggle or remove slots. Add custom times in 12-hour format (e.g. 10:00 AM).</p>
            <div className="flex flex-col gap-2 mb-4">
              {slots.map((s) => (
                <div key={s.time} className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleSlot(s.time, !s.isActive)}
                    disabled={isPending}
                    className={cn(
                      "flex-1 py-2.5 px-4 text-sm font-light border transition-colors text-left",
                      s.isActive
                        ? "bg-black text-white border-black"
                        : "bg-white text-neutral-400 border-neutral-200 hover:border-neutral-400 line-through"
                    )}
                  >
                    {s.time}
                  </button>
                  <button
                    onClick={() => handleRemoveSlot(s.time)}
                    disabled={isPending}
                    className="p-2.5 border border-neutral-200 text-neutral-300 hover:text-red-500 hover:border-red-200 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-neutral-100 pt-4">
              <input
                type="text"
                value={newTime}
                onChange={(e) => { setNewTime(e.target.value); setNewTimeError(""); }}
                placeholder="e.g. 10:00 AM"
                className="flex-1 border-b border-neutral-300 bg-transparent py-1.5 text-sm font-light focus:outline-none focus:border-black transition-colors"
              />
              <button
                onClick={handleAddSlot}
                disabled={isPending}
                className="flex items-center gap-1.5 text-xs uppercase tracking-widest px-3 py-1.5 bg-black text-white hover:bg-neutral-800 transition-colors disabled:opacity-50"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
            {newTimeError && <p className="text-xs text-red-500 mt-1">{newTimeError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
