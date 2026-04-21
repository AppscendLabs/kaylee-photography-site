"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AVAILABLE_TIMES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BookingCalendarProps {
  selectedDate: Date | undefined;
  selectedTime: string | null;
  canAdvance: boolean;
  onSelectDate: (date: Date | undefined) => void;
  onSelectTime: (time: string) => void;
  onNext: () => void;
}

export default function BookingCalendar({
  selectedDate,
  selectedTime,
  canAdvance,
  onSelectDate,
  onSelectTime,
  onNext,
}: BookingCalendarProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col md:flex-row gap-12"
    >
      <div>
        <h3 className="text-xl font-serif mb-6">Select a Date</h3>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          disabled={{ before: new Date() }}
          className="font-sans font-light text-sm"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-serif mb-6">Available Times</h3>
        {!selectedDate ? (
          <p className="text-neutral-400 font-light text-sm italic">Please select a date first.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {AVAILABLE_TIMES.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => onSelectTime(time)}
                className={cn(
                  "w-full py-3 px-4 text-sm tracking-wider border transition-colors flex justify-between items-center",
                  selectedTime === time
                    ? "border-black bg-black text-white"
                    : "border-neutral-200 hover:border-neutral-400"
                )}
              >
                {time}
                {selectedTime === time && <CheckCircle2 className="w-4 h-4" />}
              </button>
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-end">
          <button
            type="button"
            onClick={onNext}
            disabled={!canAdvance}
            className={cn(
              "flex items-center gap-3 uppercase tracking-widest text-xs pb-1 border-b",
              !canAdvance
                ? "opacity-50 cursor-not-allowed border-transparent"
                : "border-black hover:pr-2 transition-all duration-300"
            )}
          >
            Next Step <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
